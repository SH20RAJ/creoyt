export function Header() {
    return (
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">CreoYT</h1>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-800">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-800">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-800">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a>
          </nav>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</button>
        </div>
      </header>
    );
  }
  

  export function HeroSection() {
    return (
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4"> Grow Your YouTube Channel with AI-Powered Insights 🚀</h1>
          <p className="text-lg mb-6">
            Analyze, optimize, and manage your content to unlock your channel&apos;s full potential.
          </p>
          <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100">
            Get Started for Free
          </button>
        </div>
      </section>
    );
  }
  
  export function FeaturesSection() {
    const features = [
      { title: "📊 Channel Analysis", description: "Get actionable insights using advanced machine learning." },
      { title: "✍️ AI-Powered Title Generator", description: "Create SEO-optimized and click-worthy titles in seconds." },
      { title: "🖼️ Thumbnail Creator", description: "Design attention-grabbing thumbnails with ease." },
      { title: "🧠 Virtual AI Coach", description: "Receive personalized tips and strategies for growth." },
      { title: "🔍 Competitor & Keyword Analysis", description: "Stay ahead with in-depth research and tracking." },
      { title: "🎬 Shorts Repurposing", description: "Convert engaging moments into YouTube Shorts effortlessly." },
    ];
  
    return (
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">🌟 Features You&apos;ll Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  

  export function PricingSection() {
    const plans = [
      { name: "Free Plan", price: "$0", features: ["Basic Analysis", "5 Titles/Month", "Community Support"] },
      { name: "Pro Plan", price: "$15/month", features: ["Full Analysis", "Unlimited Titles", "AI Thumbnail Creator"] },
      { name: "Enterprise Plan", price: "Custom Pricing", features: ["Team Collaboration", "Priority Support"] },
    ];
  
    return (
      <section id="pricing" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">💰 Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {plans.map((plan, index) => (
              <div key={index} className="border border-gray-300 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <ul className="text-gray-600 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">✔️ {feature}</li>
                  ))}
                </ul>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  export function TestimonialsSection() {
    const testimonials = [
      { name: "John Doe", feedback: "CreoYT helped me triple my CTR in just a month!" },
      { name: "Jane Smith", feedback: "The AI Title Generator is a game-changer for my channel." },
      { name: "Mark Lee", feedback: "I love the competitor analysis tool. It's so insightful!" },
    ];
  
    return (
      <section id="testimonials" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">❤️ What Creators Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <p className="italic">“{testimonial.feedback}”</p>
                <h4 className="text-lg font-semibold mt-4">- {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  
  export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2024 CreoYT. All Rights Reserved.</p>
          <nav className="space-x-4 mt-4">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </footer>
    );
  }
  