/* eslint-disable react/no-unescaped-entities */
;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Empowering YouTube Creators with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            CreoYT is revolutionizing content creation by combining artificial intelligence with creator insights to help YouTubers grow their channels effectively.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Founded in 2024, CreoYT emerged from a simple observation: YouTube creators spend too much time on repetitive tasks instead of focusing on what they do best - creating amazing content.
              </p>
              <p className="text-muted-foreground">
                We built CreoYT to streamline the content creation process using advanced AI technology, helping creators optimize their workflow and grow their channels more efficiently.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Our Mission</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500">✦</span>
                  <span className="text-muted-foreground">Empower creators with AI-driven insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500">✦</span>
                  <span className="text-muted-foreground">Simplify content optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500">✦</span>
                  <span className="text-muted-foreground">Foster creator community growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-foreground text-center">Powered by Advanced Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Analysis",
                description: "Machine learning algorithms analyze trends and patterns",
              },
              {
                title: "Smart Optimization",
                description: "Automated content optimization for maximum engagement",
              },
              {
                title: "Real-time Insights",
                description: "Live analytics and performance tracking",
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl bg-card hover:bg-accent/50 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <a
            href="mailto:sh20raj@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
