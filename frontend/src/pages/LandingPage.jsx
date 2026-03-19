import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  pink: '#F472B6',
  black: '#0A0A0A',
  white: '#FFFFFF',
  muted: '#9CA3AF',
  darkBg: '#0F0F0F',
  cardBg: '#1A1A1A',
};

const IndiaMap = () => {
  const markers = [
    { id: 'delhi', cx: 195, cy: 105, city: 'Delhi NCR', count: 247, size: 'large' },
    { id: 'mumbai', cx: 155, cy: 230, city: 'Mumbai', count: 183, size: 'medium' },
    { id: 'bengaluru', cx: 185, cy: 310, city: 'Bengaluru', count: 156, size: 'medium' },
    { id: 'chennai', cx: 210, cy: 330, city: 'Chennai', count: 134, size: 'medium' },
    { id: 'kolkata', cx: 268, cy: 155, city: 'Kolkata', count: 112, size: 'medium' },
    { id: 'jaipur', cx: 160, cy: 125, city: 'Jaipur', count: 89, size: 'small' },
  ];

  const pulseRadius = {
    large: { inner: 6, middle: 12, outer: 18 },
    medium: { inner: 5, middle: 10, outer: 15 },
    small: { inner: 4, middle: 8, outer: 12 },
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 400 450"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '300px',
          filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.15))',
        }}
      >
        <defs>
          <style>{`
            @keyframes pulse {
              0% {
                r: 100%;
                opacity: 1;
              }
              100% {
                r: 250%;
                opacity: 0;
              }
            }
            @keyframes dashFlow {
              0% {
                stroke-dashoffset: 0;
              }
              100% {
                stroke-dashoffset: -8;
              }
            }
            .pulse-ring {
              animation: pulse 2s infinite;
            }
          `}</style>
        </defs>

        {/* Main India body */}
        <path
          d="M 160 20 L 200 15 L 240 25 L 270 40 L 290 70 L 300 100 L 310 120 L 320 140 L 315 165 L 300 180 L 310 200 L 305 225 L 290 250 L 280 270 L 270 290 L 260 310 L 245 330 L 230 350 L 215 370 L 200 390 L 190 370 L 175 350 L 160 330 L 145 310 L 135 290 L 125 265 L 115 240 L 110 215 L 105 190 L 110 165 L 100 145 L 95 120 L 100 95 L 115 70 L 130 50 L 145 30 Z"
          fill="#1A1A1A"
          stroke={COLORS.pink}
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Kashmir region */}
        <path
          d="M 155 20 L 145 10 L 160 5 L 180 8 L 195 15 L 180 18 Z"
          fill="#1A1A1A"
          stroke={COLORS.pink}
          strokeWidth="1"
        />

        {/* Northeast region */}
        <path
          d="M 310 120 L 330 115 L 345 125 L 350 140 L 340 155 L 320 148 L 315 135 Z"
          fill="#1A1A1A"
          stroke={COLORS.pink}
          strokeWidth="1"
        />

        {/* Sri Lanka */}
        <ellipse
          cx="215"
          cy="410"
          rx="8"
          ry="12"
          fill="#1A1A1A"
          stroke={COLORS.pink}
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Connection lines between markers */}
        {[
          [195, 105, 155, 230],
          [195, 105, 185, 310],
          [155, 230, 185, 310],
          [185, 310, 210, 330],
          [195, 105, 268, 155],
          [195, 105, 160, 125],
        ].map((line, idx) => (
          <line
            key={`line-${idx}`}
            x1={line[0]}
            y1={line[1]}
            x2={line[2]}
            y2={line[3]}
            stroke="rgba(244, 114, 182, 0.15)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            style={{
              animation: 'dashFlow 3s linear infinite',
            }}
          />
        ))}

        {/* Markers with animations */}
        {markers.map((marker, idx) => {
          const sizes = pulseRadius[marker.size];
          return (
            <g key={marker.id}>
              {/* Outer pulse */}
              <circle
                cx={marker.cx}
                cy={marker.cy}
                r={sizes.outer}
                fill="none"
                stroke={COLORS.pink}
                strokeWidth="0.5"
                opacity="0.1"
                className="pulse-ring"
                style={{
                  animationDelay: `${idx * 0.4}s`,
                }}
              />

              {/* Middle pulse */}
              <circle
                cx={marker.cx}
                cy={marker.cy}
                r={sizes.middle}
                fill="none"
                stroke={COLORS.pink}
                strokeWidth="0.8"
                opacity="0.3"
                className="pulse-ring"
                style={{
                  animationDelay: `${idx * 0.4}s`,
                }}
              />

              {/* Inner dot */}
              <circle
                cx={marker.cx}
                cy={marker.cy}
                r={sizes.inner}
                fill={COLORS.pink}
                opacity="1"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltips */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '40%',
          background: COLORS.white,
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontSize: '10px',
        }}
      >
        <div style={{ fontFamily: 'Syne', fontWeight: 700, color: COLORS.black, marginBottom: '2px' }}>
          Delhi NCR
        </div>
        <div style={{ fontFamily: 'Outfit', fontWeight: 400, color: COLORS.pink, fontSize: '9px' }}>
          247 complaints
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const authContext = useAuth();
  const { isAuthenticated, user, role, logout } = authContext || { isAuthenticated: false, user: null, role: null, logout: null };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '68px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 56px',
        boxSizing: 'border-box',
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(244, 114, 182, 0.2)' : 'none',
      }}
    >
      {/* LEFT - Brand */}
      <div
        style={{
          width: 'auto',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* India Flag */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <div style={{ width: '18px', height: '4px', backgroundColor: '#FF9933', borderRadius: '1px' }} />
          <div style={{ width: '18px', height: '4px', backgroundColor: '#888888', borderRadius: '1px' }} />
          <div style={{ width: '18px', height: '4px', backgroundColor: '#138808', borderRadius: '1px' }} />
        </div>

        {/* Brand Text */}
        <span
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'Syne',
            fontSize: '18px',
            fontWeight: 800,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: '#F472B6' }}>P</span>·CRM
        </span>
      </div>

      {/* CENTER - Nav Links */}
      {!isAuthenticated && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            whiteSpace: 'nowrap',
          }}
        >
          {['Features', 'How It Works', 'User Roles', 'Departments'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                fontFamily: 'Outfit',
                fontSize: '13px',
                fontWeight: 500,
                color: '#9CA3AF',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#F472B6')}
              onMouseLeave={(e) => (e.target.style.color = '#9CA3AF')}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      {/* RIGHT - Buttons */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginLeft: 'auto',
        }}
      >
        {isAuthenticated ? (
          <>
            <span
              style={{
                fontFamily: 'Outfit',
                fontSize: '11px',
                color: '#9CA3AF',
                maxWidth: '100px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name || user?.email}
            </span>
            {role === 'admin' && (
              <span
                style={{
                  fontFamily: 'Outfit',
                  fontSize: '10px',
                  background: '#F472B6',
                  color: '#0A0A0A',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
              >
                Admin
              </span>
            )}
            <button
              onClick={() => navigate('/admin/dashboard')}
              style={{
                height: '38px',
                padding: '0 20px',
                background: 'transparent',
                border: '1px solid rgba(244, 114, 182, 0.3)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontFamily: 'Outfit',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#F472B6';
                e.target.style.color = '#F472B6';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(244, 114, 182, 0.3)';
                e.target.style.color = '#FFFFFF';
              }}
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              style={{
                height: '38px',
                padding: '0 20px',
                background: '#F472B6',
                border: 'none',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontFamily: 'Outfit',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#EC4899')}
              onMouseLeave={(e) => (e.target.style.background = '#F472B6')}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              style={{
                height: '38px',
                padding: '0 20px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontFamily: 'Outfit',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#F472B6';
                e.target.style.color = '#F472B6';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.target.style.color = '#FFFFFF';
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                height: '38px',
                padding: '0 20px',
                background: '#F472B6',
                border: 'none',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontFamily: 'Outfit',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#EC4899')}
              onMouseLeave={(e) => (e.target.style.background = '#F472B6')}
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [textVisible, setTextVisible] = useState([false, false, false]);

  useEffect(() => {
    const timings = [0, 200, 400];
    timings.forEach((delay, idx) => {
      setTimeout(() => {
        setTextVisible((prev) => {
          const newState = [...prev];
          newState[idx] = true;
          return newState;
        });
      }, delay);
    });
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        background: COLORS.darkBg,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '60px',
        padding: '100px 60px',
        paddingTop: '68px',
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: 'Syne',
            fontSize: '62px',
            fontWeight: 800,
            lineHeight: '1.1',
            marginBottom: '24px',
            color: COLORS.white,
            opacity: textVisible[0] ? 1 : 0,
            transform: textVisible[0] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          Aapki Awaaz,{' '}
          <span style={{ color: COLORS.pink }}>
            Ab Sunni
          </span>
          <br />
          Jadiyegi
        </h1>

        <p
          style={{
            fontFamily: 'Outfit',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '1.6',
            color: COLORS.muted,
            marginBottom: '40px',
            maxWidth: '450px',
            opacity: textVisible[1] ? 1 : 0,
            transform: textVisible[1] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.2s',
          }}
        >
          Empowering every citizen with a direct line to governance. Revolutionizing public
          grievance redressal through Smart AI-driven P-CRM.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            opacity: textVisible[2] ? 1 : 0,
            transform: textVisible[2] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.4s',
          }}
        >
          <button
            onClick={() => navigate('/register')}
            style={{
              fontFamily: 'Outfit',
              fontSize: '14px',
              fontWeight: 600,
              background: COLORS.pink,
              color: COLORS.black,
              border: 'none',
              padding: '14px 32px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = `0 16px 32px rgba(244, 114, 182, 0.4)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Report a Problem
          </button>

          <button
            style={{
              fontFamily: 'Outfit',
              fontSize: '14px',
              fontWeight: 600,
              background: 'transparent',
              color: COLORS.white,
              border: `1px solid ${COLORS.muted}`,
              padding: '14px 32px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = COLORS.pink;
              e.target.style.color = COLORS.pink;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = COLORS.muted;
              e.target.style.color = COLORS.white;
            }}
          >
            View Analytics
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '500px',
        }}
      >
        <IndiaMap />
      </div>
    </section>
  );
};

const ChallengesSection = () => {
  const challenges = [
    {
      icon: '⏱️',
      number: '01',
      title: 'Excessive delays frustrating citizens',
      description: 'No real-time updates or tracking',
    },
    {
      icon: '⚖️',
      number: '02',
      title: 'Lack of transparency in issue tracking resolution',
      description: 'Citizens uninformed about progress',
    },
    {
      icon: '💬',
      number: '03',
      title: 'Fragmented communication between departments',
      description: 'Departments work in silos',
    },
    {
      icon: '📊',
      number: '04',
      title: 'No real-time data for proactive governance',
      description: 'Limited insights for decision making',
    },
  ];

  return (
    <section
      style={{
        background: COLORS.darkBg,
        padding: '100px 60px',
        borderTop: `1px solid rgba(244, 114, 182, 0.1)`,
      }}
    >
      <h2
        style={{
          fontFamily: 'Syne',
          fontSize: '44px',
          fontWeight: 800,
          color: COLORS.white,
          marginBottom: '60px',
          textAlign: 'center',
        }}
      >
        Current Challenges We Solve
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {challenges.map((challenge, idx) => (
          <div
            key={idx}
            style={{
              background: COLORS.cardBg,
              border: `1px solid rgba(244, 114, 182, 0.2)`,
              borderRadius: '12px',
              padding: '32px 24px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.pink;
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(244, 114, 182, 0.15)`;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `rgba(244, 114, 182, 0.2)`;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{challenge.icon}</div>
            <div
              style={{
                fontFamily: 'Syne',
                fontSize: '12px',
                fontWeight: 700,
                color: COLORS.pink,
                marginBottom: '8px',
              }}
            >
              {challenge.number}
            </div>
            <h3
              style={{
                fontFamily: 'Outfit',
                fontSize: '14px',
                fontWeight: 600,
                color: COLORS.white,
                marginBottom: '8px',
              }}
            >
              {challenge.title}
            </h3>
            <p
              style={{
                fontFamily: 'Outfit',
                fontSize: '12px',
                fontWeight: 400,
                color: COLORS.muted,
              }}
            >
              {challenge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      title: 'Citizen Report',
      description: 'Users lodge complaints via mobile app or web, attaching geo-tagged photos and descriptions',
    },
    {
      title: 'AI Categorization',
      description: 'Our Smart Engine automatically routes complaints to concerned department with priority labels',
    },
    {
      title: 'Rapid Redressal',
      description: 'Officials track, update, and resolve with full accountability and citizen feedback',
    },
  ];

  return (
    <section
      style={{
        background: COLORS.darkBg,
        padding: '100px 60px',
        borderTop: `1px solid rgba(244, 114, 182, 0.1)`,
      }}
    >
      <h2
        style={{
          fontFamily: 'Syne',
          fontSize: '44px',
          fontWeight: 800,
          color: COLORS.white,
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        The Smart Process
      </h2>

      <p
        style={{
          fontFamily: 'Outfit',
          fontSize: '14px',
          fontWeight: 400,
          color: COLORS.muted,
          textAlign: 'center',
          marginBottom: '60px',
        }}
      >
        A seamless 3-step digital journey from complaint to resolution.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              background: COLORS.cardBg,
              border: `1px solid rgba(244, 114, 182, 0.1)`,
              borderRadius: '12px',
              padding: '40px 32px',
              borderTop: `4px solid ${COLORS.pink}`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.pink;
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(244, 114, 182, 0.15)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `rgba(244, 114, 182, 0.1)`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3
              style={{
                fontFamily: 'Syne',
                fontSize: '18px',
                fontWeight: 700,
                color: COLORS.white,
                marginBottom: '12px',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: 'Outfit',
                fontSize: '13px',
                fontWeight: 400,
                color: COLORS.muted,
                lineHeight: '1.6',
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const RolesSection = () => {
  const roles = [
    {
      tag: 'SUBMIT',
      title: 'Citizens',
      description: 'Report issues, track progress in real-time, submit geo-tagged photos and descriptions',
    },
    {
      tag: 'DETENTION',
      title: 'Local Officials',
      description: 'Receive priority-sorted complaints, coordinate with departments for swift resolution',
    },
    {
      tag: 'REVIEW',
      title: 'Department Heads',
      description: 'Access centralized dashboard, allocate resources, and monitor complaint resolution',
    },
    {
      tag: 'ANALYTICS',
      title: 'Policy Makers',
      description: 'Use data insights to identify trends, budget and fine-tune planning',
    },
  ];

  return (
    <section
      style={{
        background: COLORS.darkBg,
        padding: '100px 60px',
        borderTop: `1px solid rgba(244, 114, 182, 0.1)`,
      }}
    >
      <h2
        style={{
          fontFamily: 'Syne',
          fontSize: '44px',
          fontWeight: 800,
          color: COLORS.white,
          marginBottom: '60px',
          textAlign: 'center',
        }}
      >
        User Roles & Ecosystem
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {roles.map((role, idx) => (
          <div
            key={idx}
            style={{
              background: COLORS.cardBg,
              border: `1px solid rgba(244, 114, 182, 0.1)`,
              borderRadius: '12px',
              padding: '32px 24px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.pink;
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(244, 114, 182, 0.15)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `rgba(244, 114, 182, 0.1)`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                fontFamily: 'Outfit',
                fontSize: '10px',
                fontWeight: 600,
                color: COLORS.pink,
                marginBottom: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {role.tag}
            </div>
            <h3
              style={{
                fontFamily: 'Syne',
                fontSize: '18px',
                fontWeight: 700,
                color: COLORS.white,
                marginBottom: '12px',
              }}
            >
              {role.title}
            </h3>
            <p
              style={{
                fontFamily: 'Outfit',
                fontSize: '12px',
                fontWeight: 400,
                color: COLORS.muted,
                lineHeight: '1.6',
              }}
            >
              {role.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { number: '95+', label: 'EFFICIENCY RATE' },
    { number: '12M+', label: 'ACTIVE CITIZENS' },
    { number: '24h+', label: 'AVG RESOLUTION TIME' },
  ];

  return (
    <section
      style={{
        background: COLORS.darkBg,
        padding: '100px 60px',
        borderTop: `1px solid rgba(244, 114, 182, 0.1)`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '60px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {stats.map((stat, idx) => (
          <div key={idx}>
            <h3
              style={{
                fontFamily: 'Syne',
                fontSize: '56px',
                fontWeight: 800,
                background: `linear-gradient(135deg, ${COLORS.pink} 0%, ${COLORS.white} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}
            >
              {stat.number}
            </h3>
            <p
              style={{
                fontFamily: 'Outfit',
                fontSize: '11px',
                fontWeight: 600,
                color: COLORS.muted,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: COLORS.darkBg,
        padding: '100px 60px',
        borderTop: `1px solid rgba(244, 114, 182, 0.1)`,
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'Syne',
          fontSize: '52px',
          fontWeight: 800,
          color: COLORS.white,
          marginBottom: '16px',
          lineHeight: '1.2',
        }}
      >
        Ready to transform
        <br />
        governance?
      </h2>

      <p
        style={{
          fontFamily: 'Outfit',
          fontSize: '14px',
          fontWeight: 400,
          color: COLORS.muted,
          marginBottom: '40px',
        }}
      >
        Join the digital revolution presented at India Innovates 2026, Bharat Mandapam.
      </p>

      <button
        onClick={() => navigate('/register')}
        style={{
          fontFamily: 'Outfit',
          fontSize: '14px',
          fontWeight: 600,
          background: COLORS.pink,
          color: COLORS.black,
          border: 'none',
          padding: '14px 32px',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = `0 16px 32px rgba(244, 114, 182, 0.4)`;
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        Join the Initiative
      </button>
    </section>
  );
};

const Footer = () => {
  return (
    <footer
      style={{
        background: `rgba(0, 0, 0, 0.5)`,
        borderTop: `1px solid rgba(244, 114, 182, 0.1)`,
        padding: '40px 60px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'Outfit',
          fontSize: '12px',
          fontWeight: 400,
          color: COLORS.muted,
          marginBottom: '12px',
        }}
      >
        🇮🇳 A Team India Innovates 2026 Initiative
      </p>
      <p
        style={{
          fontFamily: 'Outfit',
          fontSize: '11px',
          fontWeight: 400,
          color: `rgba(156, 163, 175, 0.6)`,
        }}
      >
        © 2025 Smart P-CRM. Built for Bharat Mandapam, New Delhi
      </p>
    </footer>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { isAuthenticated, role } = authContext || { isAuthenticated: false, role: null };

  // Redirect authenticated users to their dashboards
  useEffect(() => {
    if (isAuthenticated && role) {
      switch (role) {
        case 'citizen':
          navigate('/citizen/my-complaints');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'dept_admin':
          navigate('/admin/dept-admin-dashboard');
          break;
        case 'worker':
        case 'field_worker':
          navigate('/worker/dashboard');
          break;
        case 'superadmin':
        case 'super_admin':
          navigate('/superadmin/dashboard');
          break;
        default:
          break;
      }
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div style={{ background: COLORS.darkBg, minHeight: '100vh', paddingTop: '68px' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Outfit', sans-serif;
          background: #0F0F0F;
          color: #FFFFFF;
        }
        @keyframes dashFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -8;
          }
        }
      `}</style>

      <Navbar />
      <HeroSection />
      <ChallengesSection />
      <ProcessSection />
      <RolesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

