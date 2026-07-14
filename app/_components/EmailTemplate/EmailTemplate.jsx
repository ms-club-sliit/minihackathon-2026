import React from "react";

export default function EmailTemplate({ image, name = "there", ticketUrl, team }) {
  const recipientName = team?.team_name || name;
  const link = ticketUrl || image || "https://www.msclubsliit.org";
  const ticketImage = image || link;

  return (
    <table
      role="presentation"
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{
        backgroundColor: "#E6F2FF",
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(230,242,255,0.96) 100%)",
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: "40px 20px" }}>
            <table
              role="presentation"
              width="640"
              cellPadding="0"
              cellSpacing="0"
              style={{
                maxWidth: "640px",
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#ffffff",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid rgba(29, 59, 243, 0.12)",
                boxShadow: "0 24px 60px rgba(18, 48, 124, 0.12)",
              }}
            >
              <tbody>
                {/* Header */}
                <tr>
                  <td
                    style={{
                      background: "linear-gradient(145deg, #CFE1FB 0%, #FAFAFD 45%, #F7DDF5 100%)",
                      padding: "30px 32px 28px",
                      textAlign: "left",
                      position: "relative",
                    }}
                  >
                    <table role="presentation" cellPadding="0" cellSpacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style={{
                                color: "#1d3bf3",
                                fontSize: "12px",
                                letterSpacing: "1.8px",
                                textTransform: "uppercase",
                                margin: "0 0 8px 0",
                                fontWeight: 700,
                              }}
                            >
                              MS Club SLIIT
                            </p>
                            <h1
                              style={{
                                color: "#12204f",
                                fontSize: "28px",
                                margin: 0,
                                lineHeight: 1.15,
                                fontWeight: 800,
                                letterSpacing: "-0.04em",
                                fontFamily:
                                  "'Open Sans Condensed', 'Inter', 'Segoe UI', Arial, sans-serif",
                              }}
                            >
                              Registration confirmed
                            </h1>
                          </td>
                          <td align="right" valign="top">
                            <span
                              style={{
                                display: "inline-block",
                                padding: "8px 14px",
                                borderRadius: "999px",
                                border: "1px solid rgba(29, 59, 243, 0.25)",
                                backgroundColor: "rgba(29, 59, 243, 0.08)",
                                color: "#1d3bf3",
                                fontSize: "12px",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                              }}
                            >
                              Mini Hackathon 2026
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style={{
                        color: "#3c4a6b",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        margin: "16px 0 0 0",
                        maxWidth: "500px",
                      }}
                    >
                      Your ticket is ready. Keep this email safe for event check-in and ticket access.
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: "34px 32px 36px" }}>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#1f2937",
                        lineHeight: 1.6,
                        margin: "0 0 14px 0",
                        fontWeight: 600,
                      }}
                    >
                      Hi {recipientName},
                    </p>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#4b5563",
                        lineHeight: 1.6,
                        margin: "0 0 24px 0",
                      }}
                    >
                      You&apos;re officially registered. Your ticket is below.
                      Please keep this email for check-in on the day of the event.
                    </p>

                    {/* Ticket image */}
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                    >
                      <tbody>
                        <tr>
                          <td align="center" style={{ padding: "0 0 24px 0" }}>
                            <table
                              role="presentation"
                              cellPadding="0"
                              cellSpacing="0"
                              style={{
                                border: "1px solid rgba(29, 59, 243, 0.16)",
                                borderRadius: "22px",
                                overflow: "hidden",
                                backgroundColor: "#F8FBFF",
                                boxShadow: "0 14px 30px rgba(29, 59, 243, 0.12)",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <img
                                      src={ticketImage}
                                      alt="Your Ticket"
                                      width="240"
                                      style={{
                                        display: "block",
                                        width: "240px",
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* CTA button */}
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                    >
                      <tbody>
                        <tr>
                          <td align="center" style={{ padding: "0 0 28px 0" }}>
                            <a
                              href={link}
                              style={{
                                display: "inline-block",
                                backgroundColor: "#1d3bf3",
                                backgroundImage:
                                  "linear-gradient(135deg, #1d3bf3 0%, #457EC1 100%)",
                                color: "#ffffff",
                                textDecoration: "none",
                                padding: "13px 34px",
                                borderRadius: "999px",
                                fontSize: "14px",
                                fontWeight: 700,
                                letterSpacing: "0.02em",
                                boxShadow: "0 12px 24px rgba(29, 59, 243, 0.26)",
                              }}
                            >
                              View full ticket
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        lineHeight: 1.6,
                        margin: 0,
                        borderTop: "1px solid rgba(29, 59, 243, 0.12)",
                        paddingTop: "20px",
                      }}
                    >
                      Questions? Visit{" "}
                      <a
                        href="https://www.msclubsliit.org/contact"
                        style={{ color: "#1d3bf3", textDecoration: "underline", fontWeight: 600 }}
                      >
                        msclubsliit.org/contact
                      </a>{" "}
                      and we'll get back to you.
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      padding: "16px 32px",
                      backgroundColor: "#F8FBFF",
                      borderTop: "1px solid rgba(29, 59, 243, 0.08)",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      MS Club SLIIT · MiniHackathon 2026
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}