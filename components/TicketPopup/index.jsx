'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import moment from 'moment';
import TeamTicket from '../TeamTicket';
import Ticket from '../Ticket';
import Link from 'next/link';

function MiniHackathonLogo() {
  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', userSelect: 'none', cursor: 'pointer' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#111',
              letterSpacing: '0.2px',
              lineHeight: 1.1,
              fontFamily: '"Inter", "SF Pro Display", sans-serif',
            }}>mini</span>
            <span style={{
              fontSize: '32px',
              fontWeight: '300',
              color: '#111',
              letterSpacing: '-0.5px',
              lineHeight: 1.0,
              fontFamily: '"Inter", "SF Pro Display", sans-serif',
            }}>Hackathon</span>
          </div>
          <div style={{
            backgroundColor: '#805AD5', // Slightly darker purple
            borderRadius: '0px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px',
            marginBottom: '1px',
            flexShrink: 0,
          }}>
            <span style={{ 
              fontSize: '26px', 
              fontWeight: '300', // Thin text from screenshot
              color: '#fff', 
              lineHeight: 1, 
              letterSpacing: '-0.5px',
              fontFamily: '"Inter", "SF Pro Display", sans-serif',
            }}>26</span>
          </div>
        </div>
        <div style={{
          fontSize: '7px',
          fontWeight: '600',
          color: '#A0A0A0',
          letterSpacing: '2px',
          marginTop: '5px',
          paddingLeft: '2px'
        }}>
          MS CLUB OF SLIIT PRESENTS
        </div>
      </div>
    </Link>
  );
}

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ELIGIBILITY', href: '/#eligibility' },
  { label: 'TIMELINE', href: '/#timeline' },
  { label: 'GALLERY', href: '/#gallery' },
  { label: 'RULES', href: '/rules' },
];

function TicketNavbar() {
  const basePill = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 20px',
    borderRadius: '999px',
    border: '1.5px solid #E0E7FF',
    fontSize: '13px',
    fontWeight: '700',
    color: '#6366F1',
    textDecoration: 'none',
    backgroundColor: '#fff',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s ease',
  };

  return (
    <nav style={{
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(210,200,240,0.35)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1220px',
        margin: '0 auto',
        padding: '0 28px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>

        <MiniHackathonLogo />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'center' }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={basePill}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#EEF2FF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              {'< '}{item.label}{' />'}
            </Link>
          ))}
        </div>

        <Link
          href="/register"
          style={{
            padding: '11px 28px',
            borderRadius: '6px',
            background: 'linear-gradient(to right, #3B82F6, #A855F7)',
            color: '#fff',
            fontWeight: '700',
            fontSize: '14px',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────
   Main TicketPopup component
───────────────────────────────────────── */
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

  useImperativeHandle(ref, () => ({
    getTicketRef: () => ticketRef,
    renderTicket: () => ticketRef.current?.renderTicket(),
  }));

  useEffect(() => {
    if (display) {
      setTimeout(() => setOpacity(1), 350);
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
        /* Figma exact gradient: lavender top-left → white center → pink bottom-right */
        background: 'linear-gradient(135deg, #DFDAFF 0%, #EBE5FF 18%, #F8F4FF 48%, #FCF0FF 70%, #FFE5F5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      {/* ── Navbar ── */}
      <TicketNavbar />

      {/* ── Page body ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px 80px',
        flex: 1,
        position: 'relative',
        zIndex: 1,
      }}>

        {/* H1 — bold, tight tracking, large, dark */}
        <h1 style={{
          fontSize: 'clamp(24px, 3.2vw, 32px)',
          fontWeight: '800',
          color: '#1a1a1a',
          textAlign: 'center',
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: '-0.5px',
          fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          whiteSpace: 'nowrap',
        }}>
          You have successfully registered for the Mini Hackathon 2026!
        </h1>

        {/* H2 — slightly smaller, dark gray, bold */}
        <h2 style={{
          fontSize: 'clamp(18px, 2.4vw, 22px)',
          fontWeight: '700',
          color: '#444444',
          textAlign: 'center',
          margin: '16px 0 0',
          letterSpacing: '-0.2px',
          fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          whiteSpace: 'nowrap',
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

        {/* Developer Mail Preview badge — matches Figma yellow badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '20px',
          padding: '8px 18px',
          borderRadius: '8px',
          backgroundColor: '#FFFAEB',
          border: '1px solid #FDE68A',
          fontSize: '12px',
          fontWeight: '700',
          color: '#A16207',
          cursor: 'default',
        }}>
          <div style={{ width: '14px', height: '10px', backgroundColor: '#E9D5FF', borderRadius: '1px' }} />
          <span>Developer Mail Preview: View sent email ticket</span>
        </div>

        {/* ── Ticket Card ── */}
        <div style={{ marginTop: '32px', filter: 'drop-shadow(0 20px 56px rgba(80,60,180,0.25))' }}>
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
        </div>
      </div>
    </div>
  );
});

export default TicketPopup;
