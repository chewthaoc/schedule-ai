import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Calendar, Sparkles, BarChart3, Shield, Zap, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#E8DFD5] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☕</span>
            <span className="text-xl font-semibold text-[#2C1810]">ScheduleAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F0E8] text-[#5D4037] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Schedule Management
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C1810] mb-6">
            Transform Your Schedule
            <br />
            <span className="text-[#8D6E63]">With AI Intelligence</span>
          </h1>
          <p className="text-xl text-[#5D4037] mb-8 max-w-2xl mx-auto">
            Upload your timetable image and let AI automatically extract events.
            Manage school, work, and personal schedules all in one place.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C1810] mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-[#5D4037]">
              Powerful features to manage your time effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#E8F5E9] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                AI Image Recognition
              </h3>
              <p className="text-[#5D4037]">
                Upload any schedule image and let AI automatically extract all events with details.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#FFF3E0] flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-[#E65100]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                Multi-Type Schedules
              </h3>
              <p className="text-[#5D4037]">
                Manage school timetables, work shifts, events, and personal plans in one place.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#E3F2FD] flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-[#1565C0]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                Smart Analytics
              </h3>
              <p className="text-[#5D4037]">
                Get insights on your time distribution and receive intelligent suggestions.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#F3E5F5] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#7B1FA2]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                Secure & Private
              </h3>
              <p className="text-[#5D4037]">
                Your data is encrypted and protected with enterprise-grade security.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#FFEBEE] flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#C62828]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                Lightning Fast
              </h3>
              <p className="text-[#5D4037]">
                Optimized performance for instant access to your schedules anytime.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#E8DFD5] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#8D6E63]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                Team Collaboration
              </h3>
              <p className="text-[#5D4037]">
                Share schedules with team members and collaborate effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C1810] mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-[#5D4037]">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-[#D7CCC8] bg-white">
              <h3 className="text-2xl font-bold text-[#2C1810] mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2C1810]">$0</span>
                <span className="text-[#5D4037]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> 3 schedules
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Basic AI extraction
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Calendar view
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </div>

            <div className="p-8 rounded-lg border-2 border-[#8D6E63] bg-white relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8D6E63] text-white text-sm font-medium rounded-full">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-[#2C1810] mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2C1810]">$9</span>
                <span className="text-[#5D4037]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Unlimited schedules
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Advanced AI features
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Analytics dashboard
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Priority support
                </li>
              </ul>
              <Button variant="primary" className="w-full">
                Start Free Trial
              </Button>
            </div>

            <div className="p-8 rounded-lg border border-[#D7CCC8] bg-white">
              <h3 className="text-2xl font-bold text-[#2C1810] mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2C1810]">$29</span>
                <span className="text-[#5D4037]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Team collaboration
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Custom integrations
                </li>
                <li className="flex items-center gap-2 text-[#5D4037]">
                  <span className="text-[#2E7D32]">✓</span> Dedicated support
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#2C1810] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-[#D7CCC8] mb-8">
            Join thousands of users managing their schedules smarter with AI
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#E8DFD5] bg-white">
        <div className="max-w-6xl mx-auto text-center text-sm text-[#8D6E63]">
          <p>© 2026 ScheduleAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
