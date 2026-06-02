import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

function getRankInfo(score: number): { label: string; emoji: string; color: string; bg: string } {
  if (score === 10) return { label: "QUIZ LEGEND", emoji: "🌟", color: "#FFD700", bg: "#FFD70020" };
  if (score >= 8) return { label: "EXPERT", emoji: "🔥", color: "#FF6BCB", bg: "#FF6BCB18" };
  if (score >= 6) return { label: "GREAT JOB", emoji: "🎉", color: "#00D4FF", bg: "#00D4FF18" };
  if (score >= 4) return { label: "NICE TRY", emoji: "💪", color: "#00B06F", bg: "#00B06F18" };
  return { label: "KEEP GOING", emoji: "🎮", color: "#9CA3AF", bg: "#9CA3AF18" };
}

let fontCache: Buffer | null = null;
async function getFont(): Promise<Buffer> {
  if (fontCache) return fontCache;
  fontCache = await readFile(join(process.cwd(), "src/app/api/share/PressStart2P.ttf"));
  return fontCache;
}

// Pixel decoration block
function PBlock({ t, l, r, b, w, c, o = 0.2 }: { t?: number; l?: number; r?: number; b?: number; w: number; c: string; o?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        ...(t !== undefined ? { top: `${t}px` } : {}),
        ...(b !== undefined ? { bottom: `${b}px` } : {}),
        ...(l !== undefined ? { left: `${l}px` } : {}),
        ...(r !== undefined ? { right: `${r}px` } : {}),
        width: `${w}px`,
        height: `${w}px`,
        background: c,
        opacity: o,
        display: "flex",
      }}
    />
  );
}

export async function GET(req: NextRequest) {
  try {
    const fontData = await getFont();

    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Quiz";
    const emoji = searchParams.get("emoji") || "🎮";
    const score = Number(searchParams.get("score")) || 0;
    const total = Number(searchParams.get("total")) || 10;
    const coins = Number(searchParams.get("coins")) || 0;
    const username = searchParams.get("username") || "Player";
    const avatar = searchParams.get("avatar") || "👤";
    const category = searchParams.get("category") || "";

    const rank = getRankInfo(score);

    return new ImageResponse(
      (
        <div
          style={{
            width: "1080px",
            height: "1920px",
            background: "linear-gradient(170deg, #1a1a2e 0%, #0d1b2a 50%, #1a1a2e 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'PressStart2P'",
          }}
        >
          {/* Scattered pixel decorations */}
          <PBlock t={30} l={20} w={70} c="#FF6BCB" o={0.25} />
          <PBlock t={30} l={100} w={45} c="#00D4FF" o={0.2} />
          <PBlock t={110} l={25} w={35} c="#FFD700" o={0.3} />
          <PBlock t={50} r={30} w={55} c="#3B82F6" o={0.25} />
          <PBlock t={50} r={95} w={35} c="#FFD700" o={0.2} />
          <PBlock t={120} r={50} w={45} c="#E74856" o={0.2} />
          <PBlock t={250} l={15} w={25} c="#00D4FF" o={0.15} />
          <PBlock t={400} l={35} w={50} c="#FF6BCB" o={0.2} />
          <PBlock t={450} l={10} w={20} c="#00B06F" o={0.25} />
          <PBlock t={650} l={20} w={40} c="#3B82F6" o={0.15} />
          <PBlock t={900} l={25} w={55} c="#FFD700" o={0.15} />
          <PBlock t={1100} l={10} w={30} c="#E74856" o={0.2} />
          <PBlock t={1350} l={30} w={45} c="#00D4FF" o={0.15} />
          <PBlock t={300} r={20} w={40} c="#FFD700" o={0.15} />
          <PBlock t={500} r={30} w={35} c="#00D4FF" o={0.2} />
          <PBlock t={700} r={15} w={50} c="#FF6BCB" o={0.15} />
          <PBlock t={750} r={70} w={25} c="#00B06F" o={0.25} />
          <PBlock t={1000} r={25} w={40} c="#E74856" o={0.15} />
          <PBlock t={1200} r={40} w={55} c="#3B82F6" o={0.15} />
          <PBlock b={250} l={30} w={40} c="#E74856" o={0.2} />
          <PBlock b={200} l={80} w={25} c="#00D4FF" o={0.25} />
          <PBlock b={220} r={25} w={50} c="#FF6BCB" o={0.2} />
          <PBlock b={170} r={80} w={30} c="#FFD700" o={0.3} />

          {/* Large faint pixel shapes in the background */}
          <PBlock t={180} l={60} w={120} c="#00D4FF" o={0.04} />
          <PBlock t={700} r={40} w={150} c="#FF6BCB" o={0.04} />
          <PBlock b={400} l={50} w={130} c="#FFD700" o={0.04} />
          <PBlock t={1100} r={60} w={110} c="#00B06F" o={0.04} />

          {/* Diagonal pixel trail - top left to center */}
          <PBlock t={200} l={140} w={15} c="#00D4FF" o={0.3} />
          <PBlock t={230} l={170} w={12} c="#00D4FF" o={0.25} />
          <PBlock t={255} l={195} w={10} c="#00D4FF" o={0.2} />

          {/* Diagonal pixel trail - top right */}
          <PBlock t={200} r={140} w={15} c="#FF6BCB" o={0.3} />
          <PBlock t={230} r={170} w={12} c="#FF6BCB" o={0.25} />
          <PBlock t={255} r={195} w={10} c="#FF6BCB" o={0.2} />

          {/* Top accent bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", display: "flex" }}>
            <div style={{ flex: 1, background: "#00D4FF", display: "flex" }} />
            <div style={{ flex: 1, background: "#FF6BCB", display: "flex" }} />
            <div style={{ flex: 1, background: "#FFD700", display: "flex" }} />
            <div style={{ flex: 1, background: "#00B06F", display: "flex" }} />
          </div>

          {/* Main card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "linear-gradient(180deg, #16213e 0%, #1a2744 100%)",
              border: "6px solid #2A2A4A",
              boxShadow: "12px 12px 0px rgba(0,0,0,0.6), 0 0 80px rgba(0,212,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
              padding: "50px 60px",
              width: "100%",
              maxWidth: "920px",
            }}
          >
            {/* Category */}
            {category && (
              <div
                style={{
                  display: "flex",
                  background: "rgba(59,130,246,0.15)",
                  border: "3px solid rgba(59,130,246,0.5)",
                  color: "#3B82F6",
                  fontSize: "14px",
                  padding: "8px 24px",
                  marginBottom: "24px",
                  letterSpacing: "3px",
                }}
              >
                {category.toUpperCase()}
              </div>
            )}

            {/* Emoji */}
            <div style={{ fontSize: "90px", marginBottom: "12px", display: "flex" }}>{emoji}</div>

            {/* Title */}
            <div
              style={{
                color: "#FFFFFF",
                fontSize: "22px",
                textAlign: "center",
                marginBottom: "36px",
                maxWidth: "750px",
                lineHeight: 1.6,
              }}
            >
              {title}
            </div>

            {/* Score with side accents */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                  <div style={{ width: "50px", height: "5px", background: rank.color, opacity: 0.6, display: "flex" }} />
                  <div style={{ width: "30px", height: "5px", background: rank.color, opacity: 0.3, display: "flex" }} />
                </div>
                <div
                  style={{
                    fontSize: "100px",
                    color: "#00D4FF",
                    lineHeight: 1,
                    display: "flex",
                  }}
                >
                  {score}/{total}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
                  <div style={{ width: "50px", height: "5px", background: rank.color, opacity: 0.6, display: "flex" }} />
                  <div style={{ width: "30px", height: "5px", background: rank.color, opacity: 0.3, display: "flex" }} />
                </div>
              </div>
              <div style={{ color: "#9CA3AF", fontSize: "14px", display: "flex", marginTop: "10px", letterSpacing: "2px" }}>CORRECT ANSWERS</div>
            </div>

            {/* Rank badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: rank.bg,
                border: `4px solid ${rank.color}`,
                boxShadow: `0 0 25px ${rank.color}25`,
                padding: "14px 36px",
                marginBottom: "28px",
              }}
            >
              <span style={{ fontSize: "36px", display: "flex" }}>{rank.emoji}</span>
              <span
                style={{
                  color: rank.color,
                  fontSize: "20px",
                  letterSpacing: "4px",
                  display: "flex",
                }}
              >
                {rank.label}
              </span>
            </div>

            {/* Coins earned */}
            {coins > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "#FFD700",
                    border: "3px solid #B8860B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "#B8860B",
                    boxShadow: "0 0 12px rgba(255,215,0,0.3)",
                  }}
                >
                  C
                </div>
                <span style={{ color: "#FFD700", fontSize: "18px", display: "flex" }}>
                  +{coins} COINS EARNED
                </span>
              </div>
            )}

            {/* Robux note */}
            <div style={{ color: "#00B06F", fontSize: "12px", display: "flex", letterSpacing: "2px" }}>
              COINS CASH OUT AS ROBUX GIFT CARDS!
            </div>
          </div>

          {/* User info */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "32px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#16213e",
                border: "4px solid #00D4FF",
                boxShadow: "0 0 12px rgba(0,212,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              {avatar}
            </div>
            <span style={{ color: "#00D4FF", fontSize: "16px", display: "flex", letterSpacing: "2px" }}>
              {username.toUpperCase()}
            </span>
          </div>

          {/* Branding */}
          <div style={{ position: "absolute", bottom: "45px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: "#FFD700",
                  border: "2px solid #B8860B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "#B8860B",
                }}
              >
                C
              </div>
              <span style={{ color: "#FFD700", fontSize: "14px", display: "flex", letterSpacing: "2px" }}>
                COINQUEST PLAY
              </span>
            </div>
            <span style={{ color: "#9CA3AF", fontSize: "12px", display: "flex", letterSpacing: "1px" }}>
              play.coinquestgames.com
            </span>
          </div>

          {/* Bottom accent bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8px", display: "flex" }}>
            <div style={{ flex: 1, background: "#00B06F", display: "flex" }} />
            <div style={{ flex: 1, background: "#FFD700", display: "flex" }} />
            <div style={{ flex: 1, background: "#FF6BCB", display: "flex" }} />
            <div style={{ flex: 1, background: "#00D4FF", display: "flex" }} />
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
        fonts: [
          {
            name: "PressStart2P",
            data: fontData,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (e) {
    console.error("Share image error:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
