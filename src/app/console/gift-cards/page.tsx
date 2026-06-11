"use client";

import { useCallback, useEffect, useState } from "react";
import type { GiftCard } from "../_types";

export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [gcAvailable, setGcAvailable] = useState(0);
  const [gcRedeemed, setGcRedeemed] = useState(0);
  const [newCodes, setNewCodes] = useState("");
  const [addingCodes, setAddingCodes] = useState(false);
  const [addResult, setAddResult] = useState<string | null>(null);

  const fetchGiftCards = useCallback(async () => {
    const res = await fetch("/api/console/gift-cards");
    if (res.ok) {
      const data = await res.json();
      setGiftCards(data.cards);
      setGcAvailable(data.available);
      setGcRedeemed(data.redeemed);
    }
  }, []);

  useEffect(() => {
    fetchGiftCards();
  }, [fetchGiftCards]);

  const handleAddCodes = async () => {
    const codes = newCodes.split("\n").map((c) => c.trim()).filter(Boolean);
    if (codes.length === 0) return;
    setAddingCodes(true);
    setAddResult(null);

    const res = await fetch("/api/console/gift-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes }),
    });
    const data = await res.json();
    setAddResult(
      `Added ${data.added} card${data.added !== 1 ? "s" : ""}${data.skipped ? `, ${data.skipped} duplicate${data.skipped !== 1 ? "s" : ""} skipped` : ""}`
    );
    setNewCodes("");
    setAddingCodes(false);
    fetchGiftCards();
  };

  return (
    <div className="pixel-card p-5">
      <h2 className="font-pixel text-[10px] text-white mb-4">Gift Cards</h2>

      {/* Summary */}
      <div className="flex gap-4 mb-4">
        <div className="bg-[#0d1b2a] border border-roblox-green rounded-sm px-3 py-2 text-center flex-1">
          <div className="text-roblox-green font-bold text-lg">{gcAvailable}</div>
          <div className="text-text-secondary text-[10px]">Available</div>
        </div>
        <div className="bg-[#0d1b2a] border border-text-secondary rounded-sm px-3 py-2 text-center flex-1">
          <div className="text-text-secondary font-bold text-lg">{gcRedeemed}</div>
          <div className="text-text-secondary text-[10px]">Redeemed</div>
        </div>
      </div>

      {/* Add codes */}
      <div className="mb-4">
        <label className="text-text-secondary text-xs font-bold block mb-1">Add Gift Card Codes</label>
        <textarea
          value={newCodes}
          onChange={(e) => setNewCodes(e.target.value)}
          placeholder="Paste codes here (one per line)"
          rows={3}
          className="pixel-input w-full px-3 py-2 text-sm resize-none"
        />
        <button
          onClick={handleAddCodes}
          disabled={addingCodes || !newCodes.trim()}
          className="mt-2 bg-roblox-green text-white font-bold py-2 px-4 rounded-sm pixel-btn text-sm disabled:opacity-50 w-full"
        >
          {addingCodes ? "Adding..." : "Add Codes"}
        </button>
        {addResult && <p className="text-roblox-green text-xs mt-2">{addResult}</p>}
      </div>

      {/* Card list */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {giftCards.map((card) => (
          <div
            key={card.id}
            className={`bg-[#0d1b2a] rounded-sm p-3 border ${card.redeemed_at ? "border-border-pixel" : "border-roblox-green"}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-pixel text-[8px] select-all ${card.redeemed_at ? "text-text-secondary" : "text-roblox-green"}`}>
                {card.code}
              </span>
              <span className={`text-[10px] font-bold ${card.redeemed_at ? "text-roblox-red" : "text-roblox-green"}`}>
                {card.redeemed_at ? "USED" : "AVAILABLE"}
              </span>
            </div>
            {card.redeemed_at && (
              <div className="text-text-secondary text-[10px]">
                Redeemed by {card.redeemed_by_username} ({card.redeemed_by_email}) on{" "}
                {new Date(card.redeemed_at).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
        {giftCards.length === 0 && (
          <p className="text-text-secondary text-xs text-center py-4">No gift cards in inventory</p>
        )}
      </div>
    </div>
  );
}
