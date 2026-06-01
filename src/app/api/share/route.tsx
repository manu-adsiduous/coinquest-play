import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function getRankInfo(score: number): { label: string; emoji: string; color: string } {
  if (score === 10) return { label: "QUIZ LEGEND", emoji: "🌟", color: "#FFD700" };
  if (score >= 8) return { label: "EXPERT", emoji: "🔥", color: "#FF6BCB" };
  if (score >= 6) return { label: "GREAT JOB", emoji: "🎉", color: "#00D4FF" };
  if (score >= 4) return { label: "NICE TRY", emoji: "💪", color: "#00B06F" };
  return { label: "KEEP GOING", emoji: "🎮", color: "#9CA3AF" };
}

// Fetch the pixel font
const fontPromise = fetch(
  new URL("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap")
).then(async (css) => {
  const text = await css.text();
  const fontUrl = text.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
  if (!fontUrl) throw new Error("Font URL not found");
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
});

export async function GET(req: NextRequest) {
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

  let fontData: ArrayBuffer | null = null;
  try {
    fontData = await fontPromise;
  } catch {
    // Font load failed — will use fallback
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          background: "#1a1a2e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: fontData ? "'Press Start 2P'" : "sans-serif",
        }}
      >
        {/* Decorative pixel blocks - top left cluster */}
        <div style={{ position: "absolute", top: "40px", left: "30px", width: "60px", height: "60px", background: "#FF6BCB", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", top: "40px", left: "90px", width: "40px", height: "40px", background: "#00D4FF", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", top: "100px", left: "30px", width: "40px", height: "40px", background: "#FFD700", opacity: 0.2, display: "flex" }} />
        <div style={{ position: "absolute", top: "100px", left: "70px", width: "30px", height: "30px", background: "#00B06F", opacity: 0.3, display: "flex" }} />

        {/* Top right cluster */}
        <div style={{ position: "absolute", top: "60px", right: "40px", width: "50px", height: "50px", background: "#3B82F6", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", top: "60px", right: "100px", width: "35px", height: "35px", background: "#FFD700", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", top: "120px", right: "60px", width: "45px", height: "45px", background: "#E74856", opacity: 0.2, display: "flex" }} />

        {/* Left side scattered blocks */}
        <div style={{ position: "absolute", top: "300px", left: "20px", width: "35px", height: "35px", background: "#00D4FF", opacity: 0.15, display: "flex" }} />
        <div style={{ position: "absolute", top: "500px", left: "40px", width: "50px", height: "50px", background: "#FF6BCB", opacity: 0.2, display: "flex" }} />
        <div style={{ position: "absolute", top: "550px", left: "15px", width: "25px", height: "25px", background: "#FFD700", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", top: "750px", left: "25px", width: "40px", height: "40px", background: "#00B06F", opacity: 0.2, display: "flex" }} />
        <div style={{ position: "absolute", top: "1000px", left: "30px", width: "55px", height: "55px", background: "#3B82F6", opacity: 0.15, display: "flex" }} />
        <div style={{ position: "absolute", top: "1200px", left: "15px", width: "30px", height: "30px", background: "#E74856", opacity: 0.2, display: "flex" }} />

        {/* Right side scattered blocks */}
        <div style={{ position: "absolute", top: "350px", right: "25px", width: "45px", height: "45px", background: "#FFD700", opacity: 0.15, display: "flex" }} />
        <div style={{ position: "absolute", top: "600px", right: "35px", width: "35px", height: "35px", background: "#00D4FF", opacity: 0.2, display: "flex" }} />
        <div style={{ position: "absolute", top: "800px", right: "20px", width: "50px", height: "50px", background: "#FF6BCB", opacity: 0.15, display: "flex" }} />
        <div style={{ position: "absolute", top: "850px", right: "70px", width: "25px", height: "25px", background: "#00B06F", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", top: "1100px", right: "30px", width: "40px", height: "40px", background: "#FFD700", opacity: 0.2, display: "flex" }} />
        <div style={{ position: "absolute", top: "1300px", right: "50px", width: "55px", height: "55px", background: "#3B82F6", opacity: 0.15, display: "flex" }} />

        {/* Bottom clusters */}
        <div style={{ position: "absolute", bottom: "200px", left: "40px", width: "45px", height: "45px", background: "#E74856", opacity: 0.2, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "150px", left: "90px", width: "30px", height: "30px", background: "#00D4FF", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "180px", right: "35px", width: "50px", height: "50px", background: "#FF6BCB", opacity: 0.2, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "130px", right: "90px", width: "35px", height: "35px", background: "#FFD700", opacity: 0.3, display: "flex" }} />

        {/* Corner pixel accents */}
        <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-350px", width: "20px", height: "20px", background: "#00D4FF", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "330px", width: "20px", height: "20px", background: "#00D4FF", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "300px", left: "50%", marginLeft: "-350px", width: "20px", height: "20px", background: "#FF6BCB", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "300px", left: "50%", marginLeft: "330px", width: "20px", height: "20px", background: "#FF6BCB", opacity: 0.3, display: "flex" }} />

        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "#00D4FF", display: "flex" }} />

        {/* Main card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(180deg, #16213e 0%, #1a1a3e 100%)",
            border: "6px solid #2A2A4A",
            boxShadow: "12px 12px 0px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.1)",
            padding: "50px 60px",
            width: "100%",
            maxWidth: "920px",
          }}
        >
          {/* Inner glow border */}
          <div style={{ position: "absolute", inset: "3px", border: "2px solid rgba(0,212,255,0.1)", display: "flex", pointerEvents: "none" }} />

          {/* Category badge */}
          {category && (
            <div
              style={{
                display: "flex",
                background: "rgba(59,130,246,0.2)",
                border: "3px solid rgba(59,130,246,0.5)",
                color: "#3B82F6",
                fontSize: "18px",
                padding: "8px 24px",
                marginBottom: "24px",
                fontWeight: 700,
                letterSpacing: "2px",
              }}
            >
              {category.toUpperCase()}
            </div>
          )}

          {/* Quiz emoji */}
          <div style={{ fontSize: "100px", marginBottom: "16px", display: "flex" }}>{emoji}</div>

          {/* Quiz title */}
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "28px",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "36px",
              maxWidth: "750px",
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>

          {/* Score with decorative line */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "24px",
              position: "relative",
            }}
          >
            {/* Score side decorations */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ width: "60px", height: "4px", background: `${rank.color}60`, display: "flex" }} />
              <div
                style={{
                  fontSize: "110px",
                  fontWeight: 900,
                  color: "#00D4FF",
                  lineHeight: 1,
                  display: "flex",
                  textShadow: "0 0 30px rgba(0,212,255,0.3)",
                }}
              >
                {score} / {total}
              </div>
              <div style={{ width: "60px", height: "4px", background: `${rank.color}60`, display: "flex" }} />
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "22px", display: "flex", marginTop: "8px" }}>correct answers</div>
          </div>

          {/* Rank badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: `${rank.color}15`,
              border: `4px solid ${rank.color}`,
              boxShadow: `0 0 20px ${rank.color}30`,
              padding: "14px 36px",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "40px", display: "flex" }}>{rank.emoji}</span>
            <span
              style={{
                color: rank.color,
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "3px",
                display: "flex",
              }}
            >
              {rank.label}
            </span>
          </div>

          {/* Coins earned */}
          {coins > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#FFD700",
                  border: "3px solid #B8860B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 900,
                  color: "#B8860B",
                  boxShadow: "0 0 10px rgba(255,215,0,0.3)",
                }}
              >
                C
              </div>
              <span style={{ color: "#FFD700", fontSize: "26px", fontWeight: 800, display: "flex" }}>
                +{coins} coins earned
              </span>
            </div>
          )}

          {/* Robux note */}
          <div
            style={{
              color: "#00B06F",
              fontSize: "18px",
              fontWeight: 700,
              display: "flex",
              letterSpacing: "1px",
            }}
          >
            Coins cash out as Robux gift cards!
          </div>
        </div>

        {/* User info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "36px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              background: "#16213e",
              border: "4px solid #00D4FF",
              boxShadow: "0 0 10px rgba(0,212,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            {avatar}
          </div>
          <span style={{ color: "#00D4FF", fontSize: "24px", fontWeight: 700, display: "flex" }}>
            {username}
          </span>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "#FFD700",
                border: "2px solid #B8860B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 900,
                color: "#B8860B",
              }}
            >
              C
            </div>
            <span style={{ color: "#FFD700", fontSize: "20px", fontWeight: 800, display: "flex" }}>
              CoinQuest Play
            </span>
          </div>
          <span style={{ color: "#9CA3AF", fontSize: "16px", display: "flex" }}>
            play.coinquestgames.com
          </span>
        </div>

        {/* Bottom accent line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8px", background: "#00D4FF", display: "flex" }} />
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: fontData
        ? [
            {
              name: "Press Start 2P",
              data: fontData,
              style: "normal",
              weight: 400,
            },
          ]
        : [],
    }
  );
}
