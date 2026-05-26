export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg font-bold text-white mb-2">🪙 CoinQuest Play</p>
        <p className="text-sm">Complete quizzes, earn coins, cash out for Robux!</p>
        <p className="text-xs mt-4">&copy; {new Date().getFullYear()} CoinQuest Games. All rights reserved.</p>
      </div>
    </footer>
  );
}
