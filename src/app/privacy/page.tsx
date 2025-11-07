import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for YT Copilot - Learn how we protect and handle your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Link href="/" className="text-red-600 dark:text-red-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2>1. Information We Collect</h2>
            <p>
              At YT Copilot, we collect information to provide better YouTube optimization services. We collect information you provide directly to us and data from your connected YouTube channels.
            </p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name and email address</li>
              <li>YouTube channel information when connected</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Content optimization preferences</li>
            </ul>
            
            <h3>YouTube Data</h3>
            <ul>
              <li>Channel analytics and performance metrics</li>
              <li>Video metadata and optimization data</li>
              <li>Audience engagement information</li>
              <li>Trending and competitive analysis data</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide AI-powered YouTube optimization services</li>
              <li>Analyze channel performance and provide insights</li>
              <li>Store data securely in our Turso database</li>
              <li>Generate personalized content recommendations</li>
              <li>Process AI-powered optimizations using OpenAI technology</li>
              <li>Improve our proprietary algorithms and features</li>
            </ul>
            
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers (OpenAI for AI processing, Turso for data storage) under strict confidentiality</li>
            </ul>
            
            <h2>4. AI and Data Processing</h2>
            <p>
              When you use our AI features, your content may be processed by OpenAI models and our proprietary algorithms to provide YouTube optimization services. We implement appropriate safeguards to protect your data during this processing.
            </p>
            
            <h2>5. Data Security with Turso</h2>
            <p>
              We store your data securely using Turso database technology with enterprise-grade encryption and security measures to protect against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2>6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide YouTube optimization services. You may request deletion of your account and data at any time.
            </p>
            
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Disconnect your YouTube channel</li>
              <li>Opt out of marketing communications</li>
            </ul>
            
            <h2>8. YouTube API Services</h2>
            <p>
              YT Copilot uses YouTube API Services. By using our service, you agree to be bound by the YouTube Terms of Service. You can revoke YT Copilot's access to your data via the Google security settings page.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p>
              Email: privacy@yt-copilot.strivio.world<br />
              Website: https://yt-copilot.strivio.world
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
