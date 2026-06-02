"use client";

import { useState } from "react";

interface ShareSheetProps {
  imageUrl: string;
  quizTitle: string;
  score: number;
  total: number;
  onClose: () => void;
  onBonusClaimed: () => void;
  bonusClaimed: boolean;
}

export default function ShareSheet({
  imageUrl,
  quizTitle,
  score,
  total,
  onClose,
  onBonusClaimed,
  bonusClaimed,
}: ShareSheetProps) {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const shareText = `I scored ${score}/${total} on ${quizTitle}! Can you beat me? 🎮\nplay.coinquestgames.com`;

  const handleImageLoad = async () => {
    try {
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      setImageBlob(blob);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  // Load image on mount
  if (loading && !imageBlob && !error) {
    handleImageLoad();
  }

  const downloadImage = () => {
    if (!imageBlob) return;
    const url = URL.createObjectURL(imageBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "coinquest-score.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    onBonusClaimed();
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
    onBonusClaimed();
  };

  const shareToInstagram = () => {
    // Instagram doesn't support web sharing — download image and prompt
    downloadImage();
  };

  const shareToTikTok = () => {
    downloadImage();
  };

  const shareToSnapchat = () => {
    downloadImage();
  };

  const shareNative = async () => {
    if (!imageBlob) return;
    try {
      const file = new File([imageBlob], "coinquest-score.png", { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `I scored ${score}/${total} on ${quizTitle}!`,
          text: shareText,
          files: [file],
        });
        onBonusClaimed();
      } else {
        downloadImage();
      }
    } catch {
      // Cancelled
    }
  };

  const socials = [
    { name: "Instagram", icon: "📷", color: "#E1306C", action: shareToInstagram },
    { name: "TikTok", icon: "🎵", color: "#00F2EA", action: shareToTikTok },
    { name: "Snapchat", icon: "👻", color: "#FFFC00", action: shareToSnapchat },
    { name: "WhatsApp", icon: "💬", color: "#25D366", action: shareToWhatsApp },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Sheet */}
      <div
        className="relative w-full max-w-lg bg-[#0d1b2a] border-t-4 border-pixel-cyan rounded-t-sm p-5 pb-8 slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-border-pixel rounded-full" />
        </div>

        {/* Image preview */}
        <div className="bg-card border-2 border-border-pixel rounded-sm p-2 mb-5 flex justify-center">
          {loading ? (
            <div className="h-48 flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-pixel-cyan" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : error ? (
            <div className="h-48 flex items-center justify-center text-roblox-red text-sm">
              Failed to generate image
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Score card"
              className="h-48 w-auto object-contain"
            />
          )}
        </div>

        {/* Social share buttons */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {socials.map((s) => (
            <button
              key={s.name}
              onClick={s.action}
              disabled={loading || error}
              className="flex flex-col items-center gap-1.5 p-3 bg-card border-2 border-border-pixel rounded-sm hover:border-pixel-cyan transition-colors disabled:opacity-40"
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[9px] text-text-secondary">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={downloadImage}
            disabled={loading || error}
            className="flex-1 pixel-btn bg-pixel-blue text-white font-bold py-3 rounded-sm text-sm disabled:opacity-40"
          >
            💾 Save Image
          </button>
          {typeof navigator !== "undefined" && !!navigator.share && (
            <button
              onClick={shareNative}
              disabled={loading || error}
              className="flex-1 pixel-btn bg-roblox-green text-white font-bold py-3 rounded-sm text-sm disabled:opacity-40"
            >
              📤 More Options
            </button>
          )}
        </div>

        {/* Bonus note */}
        {!bonusClaimed && (
          <p className="text-center text-coin-gold text-xs mt-3 flex items-center justify-center gap-1">
            <span className="pixel-coin" style={{ width: 12, height: 12, fontSize: 5 }}>C</span>
            +2 bonus coins when you share!
          </p>
        )}
        {bonusClaimed && (
          <p className="text-center text-roblox-green text-xs mt-3">
            ✅ +2 bonus coins claimed!
          </p>
        )}
      </div>
    </div>
  );
}
