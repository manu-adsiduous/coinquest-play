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
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.02) 31px, rgba(255,255,255,0.02) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.02) 31px, rgba(255,255,255,0.02) 32px)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#00D4FF",
          }}
        />

        {/* Main card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#16213e",
            border: "6px solid #2A2A4A",
            boxShadow: "12px 12px 0px rgba(0,0,0,0.5)",
            padding: "60px",
            width: "100%",
            maxWidth: "920px",
          }}
        >
          {/* Category badge */}
          {category && (
            <div
              style={{
                display: "flex",
                background: "rgba(59,130,246,0.2)",
                border: "2px solid rgba(59,130,246,0.4)",
                color: "#3B82F6",
                fontSize: "24px",
                padding: "8px 24px",
                marginBottom: "20px",
                fontWeight: 700,
              }}
            >
              {category}
            </div>
          )}

          {/* Quiz emoji */}
          <div style={{ fontSize: "120px", marginBottom: "20px", display: "flex" }}>{emoji}</div>

          {/* Quiz title */}
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "36px",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "40px",
              maxWidth: "800px",
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>

          {/* Score */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                fontSize: "120px",
                fontWeight: 900,
                color: "#00D4FF",
                lineHeight: 1,
                display: "flex",
              }}
            >
              {score} / {total}
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "28px", display: "flex" }}>correct answers</div>
          </div>

          {/* Rank badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: `${rank.color}20`,
              border: `4px solid ${rank.color}`,
              padding: "16px 40px",
              marginBottom: "30px",
            }}
          >
            <span style={{ fontSize: "48px", display: "flex" }}>{rank.emoji}</span>
            <span
              style={{
                color: rank.color,
                fontSize: "32px",
                fontWeight: 900,
                letterSpacing: "2px",
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
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#FFD700",
                  border: "3px solid #B8860B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#B8860B",
                }}
              >
                C
              </div>
              <span style={{ color: "#FFD700", fontSize: "32px", fontWeight: 800, display: "flex" }}>
                +{coins} coins earned
              </span>
            </div>
          )}

          {/* Robux cashout note */}
          <div
            style={{
              color: "#00B06F",
              fontSize: "22px",
              fontWeight: 700,
              display: "flex",
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
            marginTop: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#16213e",
              border: "4px solid #00D4FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            {avatar}
          </div>
          <span style={{ color: "#00D4FF", fontSize: "28px", fontWeight: 700, display: "flex" }}>
            {username}
          </span>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "#FFD700",
                border: "2px solid #B8860B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 900,
                color: "#B8860B",
              }}
            >
              C
            </div>
            <span style={{ color: "#FFD700", fontSize: "24px", fontWeight: 800, display: "flex" }}>
              CoinQuest Play
            </span>
          </div>
          <span style={{ color: "#9CA3AF", fontSize: "20px", display: "flex" }}>
            play.coinquestgames.com
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#00D4FF",
          }}
        />
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  );
}
