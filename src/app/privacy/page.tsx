export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      <div className="pixel-card p-8">
        <h1 className="font-pixel text-sm text-white mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
          <p className="text-xs text-text-secondary/60">Last updated: June 1, 2026</p>

          <p>
            CoinQuest Play (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated at play.coinquestgames.com, respects your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
          </p>

          <h2 className="text-white font-bold text-base mt-6">1. No Affiliation with Roblox</h2>
          <p>
            CoinQuest Play is <span className="text-coin-gold font-bold">not affiliated with, endorsed by, or in any way officially connected to Roblox Corporation</span>. We are an independent platform that distributes Robux gift cards as rewards. Any data we collect is used solely by CoinQuest Play and is not shared with Roblox Corporation.
          </p>

          <h2 className="text-white font-bold text-base mt-6">2. Information We Collect</h2>
          <p className="font-bold text-white">Account Information:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Email address</li>
            <li>Username</li>
            <li>Password (stored securely using bcrypt hashing — we cannot see your password)</li>
          </ul>

          <p className="font-bold text-white mt-3">Usage Data:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Quiz completion history and scores</li>
            <li>Coin balance and redemption history</li>
            <li>Pages visited and interactions on the site</li>
          </ul>

          <p className="font-bold text-white mt-3">Automatically Collected:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>IP address</li>
            <li>Browser type and device information (user agent)</li>
            <li>Cookies (including third-party cookies from ad and analytics providers)</li>
          </ul>

          <h2 className="text-white font-bold text-base mt-6">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To provide and maintain your account and coin balance</li>
            <li>To process gift card redemptions</li>
            <li>To display relevant advertisements through Google AdSense</li>
            <li>To analyze site usage and improve our service via Google Analytics</li>
            <li>To measure advertising effectiveness via Meta (Facebook) Pixel and Conversions API</li>
            <li>To prevent fraud and abuse of our platform</li>
          </ul>

          <h2 className="text-white font-bold text-base mt-6">4. Third-Party Services</h2>
          <p>We use the following third-party services that may collect data:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><span className="text-white">Google AdSense</span> — displays advertisements. Google may use cookies to serve personalized ads. <span className="text-pixel-cyan">See Google&apos;s privacy policy.</span></li>
            <li><span className="text-white">Google Analytics</span> — tracks site usage and events for analytics purposes.</li>
            <li><span className="text-white">Meta (Facebook) Pixel & Conversions API</span> — measures ad effectiveness. We send hashed (SHA-256) email addresses and browser identifiers to Meta for attribution.</li>
          </ul>

          <h2 className="text-white font-bold text-base mt-6">5. Cookies</h2>
          <p>We use cookies for:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><span className="text-white">Authentication</span> — a session cookie to keep you logged in</li>
            <li><span className="text-white">Analytics</span> — Google Analytics and Meta Pixel cookies to understand usage</li>
            <li><span className="text-white">Advertising</span> — Google AdSense cookies to serve and measure ads</li>
          </ul>
          <p>You can disable cookies in your browser settings, but some features may not work properly.</p>

          <h2 className="text-white font-bold text-base mt-6">6. Data Security</h2>
          <p>
            We take reasonable measures to protect your data, including encrypted passwords (bcrypt hashing), httpOnly secure cookies, and HTTPS encryption. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-white font-bold text-base mt-6">7. Children&apos;s Privacy</h2>
          <p>
            Our service is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us and we will delete it promptly.
          </p>

          <h2 className="text-white font-bold text-base mt-6">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of personalized advertising (via your browser or ad settings)</li>
          </ul>
          <p>To exercise these rights, contact us at <span className="text-pixel-cyan">support@coinquestgames.com</span>.</p>

          <h2 className="text-white font-bold text-base mt-6">9. Data Retention</h2>
          <p>
            We retain your account data for as long as your account is active. If you request account deletion, we will remove your personal data within 30 days. Anonymized usage data may be retained for analytics purposes.
          </p>

          <h2 className="text-white font-bold text-base mt-6">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-white font-bold text-base mt-6">11. Contact</h2>
          <p>
            For privacy-related inquiries, please contact us at <span className="text-pixel-cyan">support@coinquestgames.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
