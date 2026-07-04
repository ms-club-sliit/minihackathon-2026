'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Steps, Spin, Row } from 'antd';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import TeamTicket from '@/components/TeamTicket';
import TicketPopup from '@/components/TicketPopup';
import EmailTemplate from '../EmailTemplate/EmailTemplate';
import { supabase } from '@/app/supabase';
import ReactDOMServer from 'react-dom/server';
import { useRouter } from 'next/navigation';
import HackathonImage from "../../../public/images/2025-images/hero-image-up.png";
import img1 from "../../../public/images/2025-images/register/Vector 1.png";
import img2 from "../../../public/images/2025-images/register/Orange Ricky.png";
import img3 from "../../../public/images/2025-images/register/Orange.png";
import Image from "next/image";

function jsx2html(element) {
  return ReactDOMServer.renderToString(element);
}

let stepData = {
  step1: { teamName: null, link: null },
  step2: {
    name: null,
    email: null,
    contact: null,
    uniID: null,
    academicYear: null,
    faculty: null,
    img: null,
    imgUrl: null,
  },
  step3: {
    name: null,
    email: null,
    contact: null,
    uniID: null,
    academicYear: null,
    faculty: null,
    img: null,
    imgUrl: null,
  },
  step4: {
    name: null,
    email: null,
    contact: null,
    uniID: null,
    academicYear: null,
    faculty: null,
    img: null,
    imgUrl: null,
  },
  step5: {
    name: null,
    email: null,
    contact: null,
    uniID: null,
    academicYear: null,
    faculty: null,
    img: null,
    imgUrl: null,
  },
};

const stepItems = [
  { title: 'Team Information' },
  { title: 'Member 1 (Leader)' },
  { title: 'Member 2' },
  { title: 'Member 3' },
  { title: 'Member 4 (Optional)' },
  { title: 'Complete' },
];

async function sendEmail(to, subject, body, retryCount = 0) {
  const maxRetries = 3;

  try {
    let response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: to, subject: subject, body: body }),
    });

    if (response.ok) {
      return await response.json();
    }

    // Handle rate limiting specifically
    if (response.status === 429) {
      if (retryCount < maxRetries) {
        const data = await response.json();
        const retryAfter = data.retryAfter || 5000; // Default to 5 seconds

        console.log(
          `Rate limit hit for ${to}, retrying in ${retryAfter}ms (attempt ${
            retryCount + 1
          }/${maxRetries})`
        );

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryAfter));
        return sendEmail(to, subject, body, retryCount + 1);
      } else {
        throw new Error(`Rate limit exceeded after ${maxRetries} retries`);
      }
    }

    console.error('Email sending failed:', await response.text());
    throw new Error(`Email sending failed with code ${response.status}`);
  } catch (error) {
    if (
      retryCount < maxRetries &&
      (error.message.includes('fetch') || error.message.includes('network'))
    ) {
      console.log(
        `Network error for ${to}, retrying in 2 seconds (attempt ${
          retryCount + 1
        }/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, 2000));
      return sendEmail(to, subject, body, retryCount + 1);
    }
    throw error;
  }
}

const Register = () => {
  const [current, setCurrent] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true); // State to show spinner initially
  const router = useRouter();

  const setStepData = (step, data) => {
    stepData[step] = data;
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const [showTicket, setShowTicket] = useState(false);
  const [isTicketLoading, setIsTicketLoading] = useState(false);
  const ticketRef = useRef(null);

  // Effect to handle ticket generation when ticket popup is shown
  useEffect(() => {
    if (showTicket && ticketRef.current && !isTicketLoading) {
      // Small delay to ensure the ticket component is fully rendered
      setTimeout(async () => {
        try {
          await handleTicketGeneration(ticketRef);
        } catch (error) {
          console.error('Error generating ticket:', error);
          setIsTicketLoading(false);
        }
      }, 1000);
    }
  }, [showTicket, isTicketLoading]);
  const [emailProgress, setEmailProgress] = useState({
    current: 0,
    total: 0,
    message: '',
  });
  const [ticketData, setTicketData] = useState({});
  const addedDoc = useRef();

  const onSubmitComplete = ([finalData, docRef]) => {
    setTicketData({
      team: finalData,
      display: false,
      isTeam: true,
      ticketNo: generateTicketID(),
    });
    setShowTicket(true);
    addedDoc.current = { ref: docRef, ...finalData };
  };

  const onClose = () => {
    setTicketData(prev => ({ ...prev, display: false }));
    stepData = {
      step1: { teamName: null, link: null },
      step2: {
        name: null,
        email: null,
        contact: null,
        uniID: null,
        academicYear: null,
        faculty: null,
        img: null,
        imgUrl: null,
      },
      step3: {
        name: null,
        email: null,
        contact: null,
        uniID: null,
        academicYear: null,
        faculty: null,
        img: null,
        imgUrl: null,
      },
      step4: {
        name: null,
        email: null,
        contact: null,
        uniID: null,
        academicYear: null,
        faculty: null,
        img: null,
        imgUrl: null,
      },
      step5: {
        name: null,
        email: null,
        contact: null,
        uniID: null,
        academicYear: null,
        faculty: null,
        img: null,
        imgUrl: null,
      },
    };
    router.push('/');
  };

  const generateFileName = () => {
    return (
      new Date().getTime() +
      '-' +
      Math.floor(Math.random() * 1000000 + 1) +
      '.jpg'
    );
  };

  const updateTicket = async (ref, ticket_url) => {
    await updateDoc(ref, { ticket_url });
  };

  const dataURItoBlob = dataURI => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    let ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const saveTicketToSupabase = async popupRef => {
    // Check if we already saved this ticket
    if (saveTicketToSupabase.lastSavedTicket) {
      console.log(
        'Reusing existing ticket URL:',
        saveTicketToSupabase.lastSavedTicket
      );
      return saveTicketToSupabase.lastSavedTicket;
    }

    try {
      // Use renderTicket method through the popup ref instead of onRender
      const dataURL = await popupRef.current.renderTicket();

      let fileName = generateFileName();
      const filePath = `ticket-images-2025/${fileName}`;
      const blob = dataURItoBlob(dataURL);

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg',
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('uploads').getPublicUrl(filePath);

      // Save the URL for reuse
      saveTicketToSupabase.lastSavedTicket = publicUrl;
      console.log('Uploaded successfully to:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading ticket:', error);
      throw error;
    }
  };

  const saveTicket = async image_string => {
    // Add a static variable to track if we've already saved this ticket
    if (saveTicket.lastSavedTicket) {
      console.log('Reusing existing ticket URL:', saveTicket.lastSavedTicket);
      return saveTicket.lastSavedTicket;
    }

    try {
      let fileName = generateFileName();
      const filePath = `ticket-images-2025/${fileName}`;
      const blob = dataURItoBlob(image_string);

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg',
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('uploads').getPublicUrl(filePath);

      // Save the URL for reuse
      saveTicket.lastSavedTicket = publicUrl;
      console.log('Uploaded successfully to:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading ticket:', error);
      throw error;
    }
  };

  const handleTicketGeneration = async popupRef => {
    // If already loading or ticket is already displayed, don't proceed
    if (isTicketLoading || ticketData.display) {
      return;
    }

    setIsTicketLoading(true);
    try {
      // Use renderTicket method through the popup ref to get image and upload to Supabase
      let url = await saveTicketToSupabase(popupRef);
      const teamInfo = { ...addedDoc.current };
      let str = jsx2html(<EmailTemplate image={url} team={teamInfo} />);

      // Count team members for progress tracking
      const teamMembers = [];
      for (let i = 1; i <= 4; i++) {
        if (`member0${i}` in teamInfo) {
          teamMembers.push({ index: i, member: teamInfo[`member0${i}`] });
        }
      }

      // Initialize email progress
      setEmailProgress({
        current: 0,
        total: teamMembers.length,
        message: 'Starting email delivery...',
      });

      // Send emails to team members sequentially to avoid rate limiting
      const emailResults = [];
      for (let i = 0; i < teamMembers.length; i++) {
        const { index, member } = teamMembers[i];
        const subject = `Mini Hackathon 2025 Registration`;

        setEmailProgress({
          current: i,
          total: teamMembers.length,
          message: `Sending email to ${member.name} (${member.email})...`,
        });

        try {
          console.log(`Sending email to member ${index}: ${member.email}`);
          const result = await sendEmail(member.email, subject, str);
          emailResults.push({
            success: true,
            member: index,
            email: member.email,
            result,
          });
          console.log(`Successfully sent email to member ${index}`);

          // Update progress
          setEmailProgress({
            current: i + 1,
            total: teamMembers.length,
            message: `Email sent to ${member.name}`,
          });

          // Add a small delay between emails to be extra safe with rate limits
          if (i < teamMembers.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
          }
        } catch (error) {
          console.error(
            `Failed to send email to member ${index} (${member.email}):`,
            error
          );
          emailResults.push({
            success: false,
            member: index,
            email: member.email,
            error: error.message,
          });

          // Update progress even on failure
          setEmailProgress({
            current: i + 1,
            total: teamMembers.length,
            message: `Failed to send email to ${member.name}`,
          });
        }
      }

      // Final progress update
      setEmailProgress({
        current: teamMembers.length,
        total: teamMembers.length,
        message: 'Email delivery complete!',
      });

      // Check for any email sending failures
      const failedEmails = emailResults.filter(result => !result.success);
      if (failedEmails.length > 0) {
        console.error('Some emails failed to send:', failedEmails);
        // You might want to show a notification to the user here
      } else {
        console.log('All emails sent successfully');
      }

      // Update ticket data only once
      setTicketData(prev => ({
        ...prev,
        display: true,
        ticketUrl: url,
        onRender: null,
      }));

      setShowTicket(true);
    } catch (e) {
      console.error('Error in ticket generation:', e);
    } finally {
      setIsTicketLoading(false);
      setEmailProgress({ current: 0, total: 0, message: '' }); // Reset email progress
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false); // Hide spinner after 2 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  function generateTicketID() {
    const prefix = 'MS25';
    const randomComponent = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    const paddedNumber = randomComponent.toString().padStart(5, '0'); // Ensure it is always 5 digits
    return `${prefix}${paddedNumber}`;
  }

  return (
    <main className="relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute bottom-0 left-0 z-0 opacity-70">
        <Image
          src={img1}
          alt="Decorative Element Left"
          className="w-40 h-auto"
        />
      </div>

      <div className="absolute top-0 left-0 z-0 opacity-70 pointer-events-none">
        <Image
          src={img2}
          alt="Decorative Element Top Left"
          className="w-40 h-auto object-contain"
        />
      </div>

      <div className="absolute bottom-0 right-0 z-0 opacity-70">
        <Image
          src={img3}
          alt="Decorative Element Right Bottom"
          className="w-48 h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between min-h-[600px] rounded-[40px] py-12 px-8 lg:px-16 overflow-hidden my-12 lg:my-20 bg-[#222222]">
          {/* Left Section */}
          <div className="relative z-20 text-left max-w-2xl flex flex-col gap-5">
            {/* Badge */}
            <div className="inline-block">
              <span className="px-4 py-1 bg-gray-600 text-white text-sm font-semibold rounded-lg">
                MINIHACKATHON 2025
              </span>
            </div>

            {/* Headlines */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Register!
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight">
              Your Team
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
              A Great Idea Becomes A Winning Solution When Minds Come Together.
            </p>
          </div>

          {/* Right Side Image */}
          <div className="absolute -bottom-8 lg:-bottom-12 right-0 lg:right-12 w-[50%] lg:w-[38%] opacity-80 transform hover:scale-105 transition-transform duration-700 ease-out">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent blur-3xl"></div>
              <div className="flex justify-end">
                <Image
                  src={HackathonImage}
                  alt="Hackathon Elements"
                  className="w-3/4 h-auto object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      {showSpinner ? (
        <div className='flex justify-center items-center h-screen'>
          <Spin size='large' />
        </div>
      ) : (
        <>
          {isTicketLoading && (
            <div className='flex justify-center items-center h-screen'>
              <Row>
                <div className='text-center'>
                  <div>Generating Ticket...</div>
                  {emailProgress.total > 0 && (
                    <div className='mt-4'>
                      <div>
                        Sending Emails ({emailProgress.current}/
                        {emailProgress.total})
                      </div>
                      <div className='text-sm text-gray-600 mt-2'>
                        {emailProgress.message}
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2.5 mt-2'>
                        <div
                          className='bg-blue-600 h-2.5 rounded-full transition-all duration-300'
                          style={{
                            width: `${
                              (emailProgress.current / emailProgress.total) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                &nbsp; <Spin size='large' />
              </Row>
            </div>
          )}
          {showTicket && (
            <TicketPopup
              onClose={onClose}
              onRender={null} // Remove onRender, we'll use renderTicket instead
              ref={ticketRef}
              {...ticketData}
            />
          )}
          <div className='mx-2 my-2 px-2 lg:mx-20 lg:my-20 lg:px-20'>
            <h2 className='text-lg sm:text-xl lg:text-2xl my-6 lg:my-10 p-2'>
              Register Your Team
            </h2>
            <div className='mb-6 lg:mb-10 p-2'>
              <Steps current={current} size='small' items={stepItems} />
            </div>
            <div className='my-6 lg:my-10 step-body'>
              {showSpinner ? (
                <div className='flex justify-center items-center h-64'>
                  <Spin size='large' />
                </div>
              ) : (
                <>
                  {current === 0 && (
                    <Step1
                      stepData={stepData.step1}
                      next={next}
                      setHook={setStepData}
                    />
                  )}
                  {current === 1 && (
                    <Step2
                      stepData={stepData.step2}
                      next={next}
                      setHook={setStepData}
                      BackHook={prev}
                    />
                  )}
                  {current === 2 && (
                    <Step3
                      stepData={stepData.step3}
                      next={next}
                      setHook={setStepData}
                      BackHook={prev}
                    />
                  )}
                  {current === 3 && (
                    <Step4
                      stepData={stepData.step4}
                      next={next}
                      setHook={setStepData}
                      BackHook={prev}
                    />
                  )}
                  {current === 4 && (
                    <Step5
                      stepData={stepData.step5}
                      next={next}
                      setHook={setStepData}
                      BackHook={prev}
                    />
                  )}
                  {current === 5 && (
                    <Step6
                      teamData={stepData}
                      next={next}
                      onSubmitComplete={onSubmitComplete}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Register;
