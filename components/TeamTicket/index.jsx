import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useDisplaySize, usePerspectiveOnMouseMoveEffect } from "../../hooks";

/**
 *
 * @param {{
 * 		headerImage: "",
 * 		ticketNo: "",
 * 		team: "",
 * 		date: "",
 *      onRender: "",
 * 		onClickSave: "",
 * 		save: ""
 * }} props
 */
const TeamTicket = (props, this_ref) => {
	const isDebugModeOn = false;
	const ref = useRef(null);
	const htmlRef = useRef(null);
	const { onRender } = props;

	const size = useDisplaySize();

	usePerspectiveOnMouseMoveEffect(ref);

	useImperativeHandle(this_ref, () => ({
		renderTicket: () => {
			if (ref.current === null) return;
			ref.current.style.transform = "none";
			return toPng(htmlRef.current, { cacheBust: true });
		},
	}));

	useEffect(() => {
		if (onRender && ref.current) {
			ref.current.style.transform = "none";
			toPng(ref.current, { cacheBust: true })
				.then((dataUrl) => {
					ref.current.style.transform = "none";
					onRender(dataUrl);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [ref, isDebugModeOn, onRender]);

	const getMembers = useCallback(() => {
		if (!props.team) return [];
		let members = [];
		if (props.team.member01 && props.team.member01.name) {
			members.push({ name: props.team.member01.name, role: "LEADER", color: "#4F46E5" });
		}
		const memberColors = ["#7C3AED", "#EC4899", "#8B5CF6"];
		for (let i = 2; i <= 4; i++) {
			const member = props.team[`member0${i}`];
			if (member && member.name) {
				members.push({ name: member.name, role: "MEMBER", color: memberColors[(i - 2) % memberColors.length] });
			}
		}
		return members;
	}, [props.team]);

	const getCurrentDateString = () =>
		new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
			.format(new Date())
			.toUpperCase();

	const getCurrentTimeString = () =>
		new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric", hour12: true }).format(new Date());

	const members    = getMembers();
	const leftMembers  = members.filter((_, i) => i % 2 === 0);
	const rightMembers = members.filter((_, i) => i % 2 === 1);

	const TICKET_W = 730;
	const TICKET_H = 440;
	const STUB_W   = 125;

	// ── Configurable ticket values — update these when event details are finalised ──
	const TICKET_ROUND = process.env.NEXT_PUBLIC_TICKET_ROUND;
	const TICKET_DATE  = process.env.NEXT_PUBLIC_TICKET_DATE;
	const TICKET_TIME  = process.env.NEXT_PUBLIC_TICKET_TIME;

	return (
		<div ref={ref}>
			<svg
				width={size === 0 ? '100%' : TICKET_W}
				viewBox={`0 0 ${TICKET_W} ${TICKET_H}`}
			>
				<foreignObject width={TICKET_W} height={TICKET_H} xmlns="http://www.w3.org/2000/svg">

					{/* ── TICKET OUTER WRAPPER ── */}
					<div
						ref={htmlRef}
						style={{
							display: "flex",
							flexDirection: "column",
							width: `${TICKET_W}px`,
							height: `${TICKET_H}px`,
							borderRadius: "24px",
							overflow: "hidden",
							border: "1px solid rgba(220, 215, 235, 0.6)",
							fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
							boxSizing: "border-box",
							background: "#FFFFFF",
						}}
					>
						{/* ══════════════════════════════════════════════
						    UPPER SECTION (Main Content + Stub)
						   ══════════════════════════════════════════════ */}
						<div style={{
							display: "flex", flexDirection: "row", flex: 1, overflow: "hidden",
							background: "#FFFFFF"
						}}>

							{/* ── MAIN CONTENT (Left) ── */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									flex: 1,
									padding: "0",
									minWidth: 0,
									position: "relative",
									overflow: "hidden",
                                    background: "linear-gradient(145deg, #CFE1FB 0%, #FAFAFD 45%, #F7DDF5 100%)"
								}}
							>
								{/* Dot grid */}
								<div style={{
									position: "absolute", inset: 0,
									backgroundImage: "radial-gradient(circle, rgba(100,80,180,0.12) 1px, transparent 1px)",
									backgroundSize: "22px 22px",
									backgroundPosition: "11px 11px",
									pointerEvents: "none", zIndex: 0,
								}} />

								{/* Window-control circles */}
								<div style={{
									display: "flex", flexDirection: "row", alignItems: "center",
									gap: "6px", padding: "20px 28px 0 28px", zIndex: 1, position: "relative",
								}}>
									<div style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.5px solid #AFA8C8", background: "transparent" }} />
									<div style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.5px solid #AFA8C8", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
										<span style={{ fontSize: "8px", color: "#AFA8C8", lineHeight: 1, fontWeight: 500 }}>×</span>
									</div>
								</div>

								{/* Content area: team name + members */}
								<div style={{
									display: "flex", flexDirection: "column", flex: 1,
									padding: "24px 28px 16px 28px", zIndex: 1, position: "relative",
								}}>
									{/* Team name */}
									<div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "24px", gap: "10px" }}>
										<svg width="24" height="22" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M11 2L20 18H2L11 2Z" stroke="#111" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
										</svg>
										<span style={{ fontSize: "28px", fontWeight: "800", color: "#1A1A2E", letterSpacing: "-0.5px", lineHeight: 1 }}>
											{props.team && props.team.team_name}
										</span>
									</div>

									{/* Members 2-column grid */}
									<div style={{ display: "flex", flexDirection: "row", gap: "16px", flex: 1, alignItems: "flex-start" }}>
										<div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, minWidth: 0 }}>
											{leftMembers.map((m, i) => <MemberCard key={i} member={m} />)}
										</div>
										<div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, minWidth: 0 }}>
											{rightMembers.map((m, i) => <MemberCard key={i} member={m} />)}
										</div>
									</div>
								</div>

								{/* 1ST ROUND + Date/Time (Bottom of Main Section) */}
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										padding: "16px 28px 20px 28px",
										position: "relative",
										zIndex: 1,
									}}
								>
									{/* Step-fading dotted line (100% compatible with html-to-image) */}
									<div style={{
										position: "absolute",
										top: 0,
										left: "28px",
										right: "28px",
										display: "flex",
										flexDirection: "row"
									}}>
										<div style={{ width: "50%", borderTop: "1.5px dotted rgba(200,190,220,0.8)" }} />
										<div style={{ width: "10%", borderTop: "1.5px dotted rgba(200,190,220,0.7)" }} />
										<div style={{ width: "10%", borderTop: "1.5px dotted rgba(200,190,220,0.6)" }} />
										<div style={{ width: "10%", borderTop: "1.5px dotted rgba(200,190,220,0.5)" }} />
										<div style={{ width: "10%", borderTop: "1.5px dotted rgba(200,190,220,0.4)" }} />
										<div style={{ width: "10%", borderTop: "1.5px dotted rgba(200,190,220,0.2)" }} />
									</div>
									{/* 1ST ROUND pill */}
									<div style={{
										border: "1.5px solid #E0D8F0",
										borderRadius: "20px",
										padding: "6px 16px",
										fontSize: "12px",
										fontWeight: "700",
										color: "#4A4468",
										letterSpacing: "0.5px",
										background: "#FFFFFF",
									}}>
										{TICKET_ROUND}
									</div>

									{/* Date & Time */}
									<div style={{ textAlign: "right" }}>
										<div style={{ fontSize: "15px", fontWeight: "800", color: "#1A1A2E", letterSpacing: "0.2px", lineHeight: 1.2 }}>
											{TICKET_DATE}
										</div>
										<div style={{ fontSize: "13px", fontWeight: "400", color: "#8B7FA8", letterSpacing: "0.2px", lineHeight: 1.4, marginTop: "2px" }}>
											{TICKET_TIME}
										</div>
									</div>
								</div>
							</div>

							{/* ── DASHED VERTICAL SEPARATOR ── */}
							<div style={{ width: "1px", height: "100%", borderLeft: "1.5px dashed rgba(190,175,220,0.6)", flexShrink: 0 }} />

							{/* ── STUB SECTION (Right) ── */}
							<div
								style={{
									width: `${STUB_W}px`,
									flexShrink: 0,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									position: "relative",
									overflow: "hidden",
									/* Figma stub background: distinct pink */
									background: "linear-gradient(180deg, #FBF0FA 0%, #F7DDF5 100%)",
								}}
							>
								{/* Tech/Circuit decoration lines (precise 3-line flaring pattern with shallower angle) */}
								<div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
									{/* Subtle dot grid for the stub */}
									<div style={{
										position: "absolute", inset: 0,
										backgroundImage: "radial-gradient(circle, rgba(100,80,180,0.06) 1px, transparent 1px)",
										backgroundSize: "22px 22px",
										backgroundPosition: "11px 11px",
									}} />
									
									<svg width={STUB_W} height="100%" viewBox={`0 0 ${STUB_W} ${TICKET_H}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0 }}>
										{/* Top line: expands upwards gently */}
										<path d="M -10 210 H 40 L 60 197 H 135" stroke="#E0CFE5" strokeWidth="1.5" strokeLinejoin="bevel" fill="none" />
										
										{/* Middle line: straight across */}
										<path d="M -10 220 H 135" stroke="#E0CFE5" strokeWidth="1.5" strokeLinejoin="bevel" fill="none" />
										
										{/* Bottom line: expands downwards gently */}
										<path d="M -10 230 H 40 L 60 243 H 135" stroke="#E0CFE5" strokeWidth="1.5" strokeLinejoin="bevel" fill="none" />
									</svg>
								</div>

								<div style={{
									position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%) rotate(-90deg)",
									whiteSpace: "nowrap",
								}}>
									<span style={{ fontSize: "22px", fontWeight: "900", color: "#111", letterSpacing: "3px" }}>
										#{props.ticketNo}
									</span>
								</div>

								{/* MINIHACKATHON 26 + Icons (Bottom of stub) */}
								<div style={{
									paddingBottom: "20px",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-end",
									width: "100%",
									paddingRight: "16px",
									zIndex: 1,
									position: "relative",
									marginTop: "auto"
								}}>
									<span style={{ fontSize: "9px", fontWeight: "600", color: "#C09ABB", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
										MINIHACKATHON 26
									</span>
									<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2px", marginTop: "4px" }}>
										<span style={{ fontSize: "18px", fontWeight: "700", color: "#F59E0B", lineHeight: 1 }}>+</span>
										<div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#EC4899" }} />
									</div>
								</div>
							</div>
						</div>

						{/* ══════════════════════════════════════════════
						    ROW 2 — SOLID WHITE FOOTER (Full width)
						══════════════════════════════════════════════ */}
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
								padding: "20px 28px",
								position: "relative",
								zIndex: 1,
								background: "#FFFFFF",
								boxSizing: "border-box",
							}}
						>
							{/* mini Hackathon 26 — EXACT Figma match */}
							<div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
								<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
									<span style={{ fontSize: "14px", fontWeight: "800", color: "#111", letterSpacing: "0.2px", lineHeight: 1.1, fontFamily: '"Inter", "SF Pro Display", sans-serif' }}>mini</span>
									<span style={{ fontSize: "24px", fontWeight: "300", color: "#111", letterSpacing: "-0.5px", lineHeight: 1.0, fontFamily: '"Inter", "SF Pro Display", sans-serif' }}>Hackathon</span>
								</div>
								<div style={{
									backgroundColor: "#805AD5", // Slightly darker purple
									borderRadius: "0px",
									width: "28px",
									height: "28px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginLeft: "6px",
									marginBottom: "1px",
									flexShrink: 0
								}}>
									<span style={{ fontSize: "20px", fontWeight: "300", color: "#fff", lineHeight: 1, letterSpacing: "-0.5px", fontFamily: '"Inter", "SF Pro Display", sans-serif' }}>26</span>
								</div>
							</div>

							{/* HOSTED BY — label stacked above logos */}
							<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
								<span style={{ fontSize: "9px", fontWeight: "700", color: "#8B7FA8", letterSpacing: "1.2px", textTransform: "uppercase" }}>
									HOSTED BY
								</span>
								<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
									<img src="/assets/ms_club_logo.png" alt="MS Club" style={{ height: "30px", objectFit: "contain" }} />
									<img src="/assets/fcsc_logo.webp" alt="FCSC" style={{ height: "30px", objectFit: "contain" }} />
								</div>
							</div>
						</div>

					</div>
				</foreignObject>
			</svg>
		</div>
	);
};

/**
 * Member card — Figma-exact
 */
function MemberCard({ member }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: "12px",
				background: "#FFFFFF",
				borderRadius: "20px",
				padding: "12px 18px",
				border: "1px solid rgba(220, 215, 235, 0.8)",
				minWidth: 0,
				boxShadow: "0 2px 8px rgba(100,80,200,0.05)",
			}}
		>
			{/* Avatar */}
			<div
				style={{
					width: "42px",
					height: "42px",
					borderRadius: "50%",
					background: `${member.color}18`,
					border: `2px solid ${member.color}`,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
				}}
			>
				<span style={{ fontSize: "16px", fontWeight: "700", color: member.color }}>
					{member.name?.[0]?.toUpperCase()}
				</span>
			</div>

			{/* Name & role */}
			<div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
				<span style={{ fontSize: "14px", fontWeight: "700", color: "#1A1A2E", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
					{member.name}
				</span>
				<span style={{ fontSize: "10px", fontWeight: "600", color: "#9B8FC0", letterSpacing: "1.2px", lineHeight: 1.4, marginTop: "1px", textTransform: "uppercase" }}>
					{member.role}
				</span>
			</div>
		</div>
	);
}

export default forwardRef(TeamTicket);