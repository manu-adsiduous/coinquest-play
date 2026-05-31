import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t-4 border-pixel-cyan text-text-secondary py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-pixel text-[9px] text-coin-gold mb-2">
          <span className="pixel-coin inline-block mr-2">C</span> CoinQuest Play
        </p>
        <p className="text-sm">Complete quizzes, earn coins, cash out for Robux!</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/terms" className="text-xs text-text-secondary/60 hover:text-pixel-cyan transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-xs text-text-secondary/60 hover:text-pixel-cyan transition-colors">
            Privacy Policy
          </Link>
        </div>
        <p className="text-[10px] mt-4 text-text-secondary/40">
          CoinQuest Play is not affiliated with or endorsed by Roblox Corporation. Roblox and Robux are trademarks of Roblox Corporation.
        </p>
        <p className="text-xs mt-2 text-text-secondary/60">&copy; {new Date().getFullYear()} CoinQuest Games. All rights reserved.</p>
      </div>
    </footer>
  );
}
