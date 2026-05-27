export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t-4 border-pixel-cyan text-text-secondary py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-pixel text-[9px] text-coin-gold mb-2">
          <span className="pixel-coin inline-block mr-2">C</span> CoinQuest Play
        </p>
        <p className="text-sm">Complete quizzes, earn coins, cash out for Robux!</p>
        <p className="text-xs mt-4 text-text-secondary/60">&copy; {new Date().getFullYear()} CoinQuest Games. All rights reserved.</p>
      </div>
    </footer>
  );
}
