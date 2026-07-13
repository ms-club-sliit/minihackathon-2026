'use client';

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import moment from 'moment';
import Ticket from '../Ticket';
import TeamTicket from '../TeamTicket';
import Share from '../Share';
// import { getShareURL } from "../../api";

/**T
 * @param {Object} param
 * @param {number} param.ticketNo
 * @param {number} param.isTeam
 * @param {Object} param.student
 * @param {string} param.student.studentItNo
 * @param {string} param.student.studentName
 * @param {Object} param.team
 * @param {string} param.team.studentNames
 * @param {boolean} param.display
 */

const TicketPopup = forwardRef(function TicketPopup(
  {
    ticketNo,
    isTeam,
    student,
    team,
    display,
    onRender,
    onClose,
    ticketURL,
    minimal,
  },
  ref
) {
  const [opacity, setOpacity] = useState(0);
  const ticketRef = useRef(null);

  // Expose the ticketRef to parent components
  useImperativeHandle(ref, () => ({
    getTicketRef: () => ticketRef,
    renderTicket: () => ticketRef.current?.renderTicket(),
  }));

  const getShareURL = (ticketNo, isTeam, title) => {};

  useEffect(() => {
    if (display) {
      setTimeout(() => {
        setOpacity(1);
      }, 350);
    } else {
      setOpacity(0);
    }
  }, [display]);

  const saveTicket = async () => {
    if (!ticketRef.current) return;
    try {
      const dataURL = await ticketRef.current.renderTicket();
      const link = document.createElement('a');
      link.download = 'ticket.png';
      link.href = dataURL;
      link.click();
    } catch (e) {}
  };

  /* ── Minimal mode ── */
  if (minimal) {
    return (
      <div style={{ opacity, transition: 'opacity 500ms' }}>
        {isTeam ? (
          <TeamTicket
            headerImage='/assets/ms_club_logo.png'
            title='Mini Hackathon 2026'
            date={new Date()}
            ticketNo={ticketNo}
            team={team}
            onRender={onRender}
            url={ticketURL}
            ref={ticketRef}
          />
        ) : (
          <Ticket
            headerImage='/assets/ms_club_logo.png'
            headerImage2='/assets/fcsc_logo.png'
            title='Mini Hackathon 2026'
            date={moment('2022-07-30 19:00')}
            ticketNo={ticketNo}
            studentItNo={student?.studentItNo}
            studentName={student?.studentName}
            onRender={onRender}
            url={ticketURL}
            ref={ticketRef}
          />
        )}
      </div>
    );
  }

  /* ── Full-page ticket page ── */
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: display ? 9999 : -2,
        opacity,
        transition: 'opacity 350ms ease',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        /* ── Glassmorphism: transparent frosted glass over the page ── */
        background: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      }}
    >
      {/* ── Page body ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px 80px',
        flex: 1,
        position: 'relative',
        zIndex: 1,
        width: '100%',
      }}>

        {!minimal && (
          <>
            {/* H1 — bold, tight tracking, large, dark */}
            <h1 style={{
              fontSize: 'clamp(18px, 3.2vw, 32px)',
              fontWeight: '800',
              color: '#1a1a1a',
              textAlign: 'center',
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.5px',
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
            }}>
              You have successfully registered for the Mini Hackathon 2026!
            </h1>

            {/* H2 — slightly smaller, dark gray, bold */}
            <h2 style={{
              fontSize: 'clamp(15px, 2.4vw, 22px)',
              fontWeight: '700',
              color: '#444444',
              textAlign: 'center',
              margin: '16px 0 0',
              letterSpacing: '-0.2px',
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
            }}>
              Here&apos;s your ticket. Share everywhere!
            </h2>

            {/* Check email sub-text */}
            <p style={{
              color: '#888888',
              fontSize: '15px',
              fontWeight: '500',
              margin: '16px 0 0',
              textAlign: 'center',
            }}>
              Check your email for more information.
            </p>
          </>
        )}

        {/* ── Ticket Card ── */}
        <div style={{ marginTop: '32px', filter: 'drop-shadow(0 20px 56px rgba(80,60,180,0.25))', maxWidth: '100%', overflowX: 'hidden', display: 'flex', justifyContent: 'center' }}>
          {isTeam ? (
            <TeamTicket
              headerImage='/assets/ms_club_logo.png'
              title='Mini Hackathon 2026'
              date={new Date()}
              ticketNo={ticketNo}
              team={team}
              onRender={onRender}
              url={ticketURL}
              ref={ticketRef}
            />
          ) : (
            <Ticket
              headerImage='/assets/ms_club_logo.png'
              headerImage2='/assets/fcsc_logo.png'
              title='Mini Hackathon 2026'
              date={moment('2022-07-30 19:00')}
              ticketNo={ticketNo}
              studentItNo={student?.studentItNo}
              studentName={student?.studentName}
              onRender={onRender}
              url={ticketURL}
              ref={ticketRef}
            />
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
          <button
            id="ticket-save-btn"
            onClick={saveTicket}
            style={{
              padding: '10px 36px',
              borderRadius: '9px',
              backgroundColor: '#1A1033',
              color: '#fff',
              fontWeight: '600',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.18s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7B52CC'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1A1033'}
          >
            Save
          </button>
          {!minimal && (
            <button
              id="ticket-close-btn"
              onClick={() => onClose && onClose()}
              style={{
                padding: '10px 36px',
                borderRadius: '9px',
                backgroundColor: '#1A1033',
                color: '#fff',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7B52CC'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1A1033'}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default TicketPopup;
