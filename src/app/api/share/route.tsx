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
  try {
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

    // Pixel blocks data for scattered decorations
    const blocks = [
      { t: 40, l: 30, w: 60, c: "#FF6BCB" }, { t: 40, l: 100, w: 40, c: "#00D4FF" },
      { t: 110, l: 30, w: 40, c: "#FFD700" }, { t: 110, l: 80, w: 30, c: "#00B06F" },
      { t: 60, r: 40, w: 50, c: "#3B82F6" }, { t: 60, r: 100, w: 35, c: "#FFD700" },
      { t: 130, r: 60, w: 45, c: "#E74856" }, { t: 300, l: 20, w: 35, c: "#00D4FF" },
      { t: 500, l: 40, w: 50, c: "#FF6BCB" }, { t: 560, l: 15, w: 25, c: "#FFD700" },
      { t: 750, l: 25, w: 40, c: "#00B06F" }, { t: 1000, l: 30, w: 55, c: "#3B82F6" },
      { t: 1200, l: 15, w: 30, c: "#E74856" }, { t: 350, r: 25, w: 45, c: "#FFD700" },
      { t: 600, r: 35, w: 35, c: "#00D4FF" }, { t: 800, r: 20, w: 50, c: "#FF6BCB" },
      { t: 860, r: 70, w: 25, c: "#00B06F" }, { t: 1100, r: 30, w: 40, c: "#FFD700" },
      { t: 1300, r: 50, w: 55, c: "#3B82F6" },
      { b: 200, l: 40, w: 45, c: "#E74856" }, { b: 150, l: 100, w: 30, c: "#00D4FF" },
      { b: 180, r: 35, w: 50, c: "#FF6BCB" }, { b: 130, r: 100, w: 35, c: "#FFD700" },
    ];

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
          }}
        >
          {/* Pixel block decorations */}
          {blocks.map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: b.t !== undefined ? `${b.t}px` : undefined,
                bottom: (b as { b?: number }).b !== undefined ? `${(b as { b?: number }).b}px` : undefined,
                left: b.l !== undefined ? `${b.l}px` : undefined,
                right: (b as { r?: number }).r !== undefined ? `${(b as { r?: number }).r}px` : undefined,
                width: `${b.w}px`,
                height: `${b.w}px`,
                background: b.c,
                opacity: 0.2,
                display: "flex",
              }}
            />
          ))}

          {/* Top accent */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "#00D4FF", display: "flex" }} />

          {/* Main card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#16213e",
              border: "6px solid #2A2A4A",
              boxShadow: "12px 12px 0px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.1)",
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

            {/* Emoji */}
            <div style={{ fontSize: "100px", marginBottom: "16px", display: "flex" }}>{emoji}</div>

            {/* Title */}
            <div
              style={{
                color: "#FFFFFF",
                fontSize: "32px",
                fontWeight: 800,
                textAlign: "center",
                marginBottom: "36px",
                maxWidth: "750px",
                lineHeight: 1.4,
              }}
            >
              {title}
            </div>

            {/* Score */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ width: "60px", height: "4px", background: `${rank.color}60`, display: "flex" }} />
                <div
                  style={{
                    fontSize: "110px",
                    fontWeight: 900,
                    color: "#00D4FF",
                    lineHeight: 1,
                    display: "flex",
                  }}
                >
                  {score} / {total}
                </div>
                <div style={{ width: "60px", height: "4px", background: `${rank.color}60`, display: "flex" }} />
              </div>
              <div style={{ color: "#9CA3AF", fontSize: "22px", display: "flex", marginTop: "8px" }}>correct answers</div>
            </div>

            {/* Rank */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: `${rank.color}15`,
                border: `4px solid ${rank.color}`,
                padding: "14px 36px",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "40px", display: "flex" }}>{rank.emoji}</span>
              <span
                style={{
                  color: rank.color,
                  fontSize: "28px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                  display: "flex",
                }}
              >
                {rank.label}
              </span>
            </div>

            {/* Coins */}
            {coins > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
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
            <div style={{ color: "#00B06F", fontSize: "20px", fontWeight: 700, display: "flex" }}>
              Coins cash out as Robux gift cards!
            </div>
          </div>

          {/* User */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "36px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                background: "#16213e",
                border: "4px solid #00D4FF",
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

          {/* Branding */}
          <div style={{ position: "absolute", bottom: "50px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
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

          {/* Bottom accent */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8px", background: "#00D4FF", display: "flex" }} />
        </div>
      ),
      {
        width: 1080,
        height: 1920,
      }
    );
  } catch (e) {
    console.error("Share image error:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
