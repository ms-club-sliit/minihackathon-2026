import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting queue to handle 2 requests per second limit
class EmailQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.lastRequestTime = 0;
    this.minInterval = 500; // 500ms = 2 requests per second
  }

  async add(emailRequest) {
    return new Promise((resolve, reject) => {
      this.queue.push({ ...emailRequest, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.minInterval) {
        const waitTime = this.minInterval - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }

      const emailRequest = this.queue.shift();
      this.lastRequestTime = Date.now();

      try {
        const result = await this.sendEmailWithRetry(emailRequest);
        emailRequest.resolve(result);
      } catch (error) {
        emailRequest.reject(error);
      }
    }

    this.processing = false;
  }

  async sendEmailWithRetry(emailRequest, maxRetries = 3) {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Mini Hackathon <no-reply@msclubsliit.org>',
          to: [emailRequest.email],
          subject: emailRequest.subject,
          html: emailRequest.body,
        });

        if (error) {
          // If it's a rate limit error, wait and retry
          if (error.statusCode === 429) {
            retries++;
            if (retries < maxRetries) {
              console.log(
                `Rate limit hit, retrying in ${
                  retries * 1000
                }ms (attempt ${retries}/${maxRetries})`
              );
              await new Promise(resolve => setTimeout(resolve, retries * 1000));
              continue;
            }
          }
          throw error;
        }

        return data;
      } catch (error) {
        if (error.statusCode === 429 && retries < maxRetries - 1) {
          retries++;
          const waitTime = Math.min(retries * 1000, 5000); // Max 5 second wait
          console.log(
            `Rate limit error, waiting ${waitTime}ms before retry ${retries}/${maxRetries}`
          );
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          throw error;
        }
      }
    }
  }
}

const emailQueue = new EmailQueue();

export async function POST(request) {
  try {
    // Log the received request
    console.log('Received email request');

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Parse the request body
    const { email, subject, body } = await request.json();

    // Validate inputs
    if (!email || !subject || !body) {
      console.error('Missing required fields:', {
        email,
        subject,
        hasBody: !!body,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Sending email to:', email);

    // Use the queue to handle rate limiting
    const data = await emailQueue.add({ email, subject, body });

    console.log('Email sent successfully to:', email);
    return NextResponse.json({
      success: true,
      data,
      message: `Email sent successfully to ${email}`,
    });
  } catch (error) {
    console.error('Email sending error:', error);

    // Handle specific rate limit errors
    if (error.statusCode === 429) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again in a moment.',
          retryAfter: 5000, // Suggest retry after 5 seconds
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
