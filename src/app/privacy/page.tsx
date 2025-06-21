import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Creovate - Learn how we protect and handle your personal information.',
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
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
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
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us.
            </p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name and email address</li>
              <li>Profile information you choose to provide</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Content you create using our platform</li>
            </ul>
            
            <h3>Usage Information</h3>
            <ul>
              <li>How you interact with our service</li>
              <li>Features you use and actions you take</li>
              <li>Time, frequency, and duration of your activities</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new features and services</li>
            </ul>
            
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist us (under strict confidentiality)</li>
            </ul>
            
            <h2>4. AI and Data Processing</h2>
            <p>
              When you use our AI features, your content may be processed by AI models to provide the service. We implement appropriate safeguards to protect your data during this processing.
            </p>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2>6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your account and data at any time.
            </p>
            
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            
            <h2>8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
            </p>
            
            <h2>9. Third-Party Services</h2>
            <p>
              Our service may contain links to third-party websites or services. This privacy policy does not apply to those third-party services.
            </p>
            
            <h2>10. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>
            
            <h2>11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place.
            </p>
            
            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material changes via email or through our service.
            </p>
            
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p>
              Email: privacy@creovate.com<br />
              Address: [Your Company Address]
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
