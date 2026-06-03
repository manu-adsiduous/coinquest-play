"use client";

import { useState } from "react";

interface CreativeGeneratorProps {
  quizTitle: string;
  quizId: string;
  category: string;
  emoji: string;
}

export default function CreativeGenerator({ quizTitle, quizId, category, emoji }: CreativeGeneratorProps) {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    setImageUrl(null);

    try {
      const res = await fetch("/api/console/generate-creative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizTitle, category, emoji }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Generation failed");
      } else {
        setImageUrl(data.imageUrl);
      }
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  const download = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `coinquest-creative-${quizId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      // Fallback: open in new tab
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <>
      {/* Small admin icon */}
      <button
        onClick={() => { setShowModal(true); if (!imageUrl) generate(); }}
        title="Generate ad creative"
        className="inline-flex items-center justify-center w-8 h-8 bg-pixel-magenta/20 border border-pixel-magenta/40 rounded-sm hover:bg-pixel-magenta/30 transition-colors"
      >
        <span className="text-sm">🎨</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative pixel-card p-6 max-w-md w-full slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-pixel text-[9px] text-white">Ad Creative</h3>
              <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-white text-lg">✕</button>
            </div>

            <p className="text-text-secondary text-xs mb-4 truncate">{quizTitle}</p>

            {/* Image preview */}
            <div className="bg-[#0d1b2a] border-2 border-border-pixel rounded-sm mb-4 flex items-center justify-center min-h-[300px]">
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-8">
                  <svg className="animate-spin h-10 w-10 text-pixel-magenta" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-text-secondary text-xs">Generating...</span>
                  <span className="text-text-secondary/50 text-[10px]">This may take 15-30 seconds</span>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-roblox-red text-sm mb-2">{error}</p>
                  <button onClick={generate} className="text-pixel-cyan text-xs hover:underline">
                    Try again
                  </button>
                </div>
              ) : imageUrl ? (
                <img src={imageUrl} alt="Generated creative" className="w-full h-auto rounded-sm" />
              ) : null}
            </div>

            {/* Actions */}
            {imageUrl && !loading && (
              <div className="flex gap-3">
                <button
                  onClick={download}
                  className="flex-1 pixel-btn bg-roblox-green text-white font-bold py-2.5 rounded-sm text-sm"
                >
                  💾 Download
                </button>
                <button
                  onClick={generate}
                  className="flex-1 pixel-btn bg-pixel-blue text-white font-bold py-2.5 rounded-sm text-sm"
                >
                  🔄 Regenerate
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
