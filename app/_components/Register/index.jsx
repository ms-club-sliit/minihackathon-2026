'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Steps, Spin, Row } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import TicketPopup from '@/components/TicketPopup';
import EmailTemplate from '../EmailTemplate/EmailTemplate';
import { supabase } from '@/app/supabase';
import ReactDOMServer from 'react-dom/server';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

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
  { title: 'Complete', icon: <CheckOutlined style={{ fontSize: '14px' }} /> },
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

    if (response.status === 429) {
      if (retryCount < maxRetries) {
        const data = await response.json();
        const retryAfter = data.retryAfter || 5000;

        console.log(
          `Rate limit hit for ${to}, retrying in ${retryAfter}ms (attempt ${
            retryCount + 1
          }/${maxRetries})`
        );

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
  const [showSpinner, setShowSpinner] = useState(true);
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

  useEffect(() => {
    if (showTicket && ticketRef.current && !isTicketLoading) {
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
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const saveTicketToSupabase = async popupRef => {
    if (saveTicketToSupabase.lastSavedTicket) {
      console.log(
        'Reusing existing ticket URL:',
        saveTicketToSupabase.lastSavedTicket
      );
      return saveTicketToSupabase.lastSavedTicket;
    }

    try {
      const dataURL = await popupRef.current.renderTicket();
      let fileName = generateFileName();
      const filePath = `ticket-images-2026/${fileName}`;
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

      saveTicketToSupabase.lastSavedTicket = publicUrl;
      console.log('Uploaded successfully to:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading ticket:', error);
      throw error;
    }
  };

  const saveTicket = async image_string => {
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

      saveTicket.lastSavedTicket = publicUrl;
      console.log('Uploaded successfully to:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading ticket:', error);
      throw error;
    }
  };

  const handleTicketGeneration = async popupRef => {
    if (isTicketLoading || ticketData.display) {
      return;
    }

    setIsTicketLoading(true);
    try {
      let url = await saveTicketToSupabase(popupRef);
      const teamInfo = { ...addedDoc.current };
      let str = jsx2html(<EmailTemplate image={url} team={teamInfo} />);

      const teamMembers = [];
      for (let i = 1; i <= 4; i++) {
        if (`member0${i}` in teamInfo) {
          teamMembers.push({ index: i, member: teamInfo[`member0${i}`] });
        }
      }

      setEmailProgress({
        current: 0,
        total: teamMembers.length,
        message: 'Starting email delivery...',
      });

      const emailResults = [];
      for (let i = 0; i < teamMembers.length; i++) {
        const { index, member } = teamMembers[i];
        const subject = `Mini Hackathon 2026 Registration`;

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

          setEmailProgress({
            current: i + 1,
            total: teamMembers.length,
            message: `Email sent to ${member.name}`,
          });

          if (i < teamMembers.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
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

          setEmailProgress({
            current: i + 1,
            total: teamMembers.length,
            message: `Failed to send email to ${member.name}`,
          });
        }
      }

      setEmailProgress({
        current: teamMembers.length,
        total: teamMembers.length,
        message: 'Email delivery complete!',
      });

      const failedEmails = emailResults.filter(result => !result.success);
      if (failedEmails.length > 0) {
        console.error('Some emails failed to send:', failedEmails);
      } else {
        console.log('All emails sent successfully');
      }

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
      setEmailProgress({ current: 0, total: 0, message: '' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function generateTicketID() {
    const prefix = 'MS25';
    const randomComponent = Math.floor(Math.random() * 1000000);
    const paddedNumber = randomComponent.toString().padStart(5, '0');
    return `${prefix}${paddedNumber}`;
  }

  return (
    <main className="register-page">
      {/* ================= REGISTER HERO ================= */}
      <div className="register-section-wrapper">
  <section className="register-glass-hero">
    <svg
      className="register-glass-svg"
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="register-glass-shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="4"
            dy="10"
            stdDeviation="10"
            floodColor="#53698f"
            floodOpacity="0.25"
          />

          <feDropShadow
            dx="1"
            dy="3"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity="0.15"
          />
        </filter>
      </defs>

      <path
        className="register-glass-background"
        d="
          M 35 150
          Q 35 120 65 120
          H 180
          Q 210 120 210 90
          V 80
          Q 210 50 240 50
          H 935
          Q 965 50 965 80
          V 620
          Q 965 650 935 650
          H 65
          Q 35 650 35 620
          Z
        "
      />

      <path
        className="register-glass-border"
        d="
          M 35 150
          Q 35 120 65 120
          H 180
          Q 210 120 210 90
          V 80
          Q 210 50 240 50
          H 935
          Q 965 50 965 80
          V 620
          Q 965 650 935 650
          H 65
          Q 35 650 35 620
          Z
        "
        filter="url(#register-glass-shadow)"
      />
    </svg>

      <div className="register-notch-logo">
  <img
    src="/images/2026-images/logo-main-2026.png"
    alt="Mini Hackathon 26"
  />
</div>

<div className="register-navigation">
  <Header active="" hideLogo />
</div>

   <div className="register-hero-content">
  <img
    src="/images/2026-images/logo-main-2026.png"
    alt="Mini Hackathon 26"
    className="register-center-logo-image"
  />

  <h1 className="register-hero-heading">
    Register Your Team
  </h1>

  <p className="register-hero-description">
    A Great Idea Becomes A Winning Solution When Minds Come Together.
  </p>
</div>
</section>
</div>

      {/* ================= STEPS SECTION ================= */}
      {showSpinner ? (
        <div className="flex h-screen items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {isTicketLoading && (
            <div className="flex h-screen items-center justify-center">
              <Row>
                <div className="text-center">
                  <div>Generating Ticket...</div>

                  {emailProgress.total > 0 && (
                    <div className="mt-4">
                      <div>
                        Sending Emails ({emailProgress.current}/
                        {emailProgress.total})
                      </div>

                      <div className="mt-2 text-sm text-gray-600">
                        {emailProgress.message}
                      </div>

                      <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                          style={{
                            width: `${
                              (emailProgress.current / emailProgress.total) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                &nbsp;
                <Spin size="large" />
              </Row>
            </div>
          )}

          {showTicket && (
            <TicketPopup
              onClose={onClose}
              onRender={null}
              ref={ticketRef}
              {...ticketData}
            />
          )}

          <div className="mx-2 my-2 px-2 lg:mx-20 lg:my-20 lg:px-20">
            <div className="custom-steps-container rounded-[32px] border border-white/60 bg-gradient-to-br from-[#f0f4ff] via-[#f7f3ff] to-[#fff0f6] p-8 shadow-sm sm:p-12 lg:p-16">
              <div className="mb-6 p-2 lg:mb-10">
                <Steps
                  current={current}
                  size="small"
                  items={stepItems}
                  className="custom-steps"
                  labelPlacement="vertical"
                />
              </div>

              <div className="step-body my-6 lg:my-10">
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
              </div>
            </div>
          </div>
          </>
      )}
    </main>
  );
};

export default Register;
