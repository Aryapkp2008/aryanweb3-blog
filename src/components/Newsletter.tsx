'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Gift,
  Users,
  TrendingUp,
  X
} from 'lucide-react';
import { trackNewsletterSignup } from '@/lib/analytics';

interface NewsletterProps {
  variant?: 'inline' | 'modal' | 'sticky';
}

export default function Newsletter({ variant = 'inline' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Check if user already subscribed
  React.useEffect(() => {
    const subscribed = localStorage.getItem('newsletter-subscribed');
    if (subscribed) {
      setHasSubscribed(true);
      setIsVisible(false);
    }

    // Show modal after 30 seconds for new visitors
    if (variant === 'modal' && !subscribed) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [variant]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage (in production, this would be an API call)
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        setStatus('error');
        setMessage('This email is already subscribed!');
      } else {
        subscribers.push(email);
        localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
        localStorage.setItem('newsletter-subscribed', 'true');
        
        setStatus('success');
        setMessage('🎉 Welcome aboard! Check your inbox for confirmation.');
        setHasSubscribed(true);
        
        // Track newsletter signup
        trackNewsletterSignup(email);
        
        // Hide sticky/modal after success
        if (variant !== 'inline') {
          setTimeout(() => {
            setIsVisible(false);
            setShowModal(false);
          }, 3000);
        }
      }
    }, 1000);
  };

  const benefits = [
    { icon: Sparkles, text: 'Exclusive insights & analysis' },
    { icon: Gift, text: 'Premium resources & guides' },
    { icon: TrendingUp, text: 'Cutting-edge Web3 trends' },
    { icon: Users, text: 'Join 10,000+ professionals' }
  ];

  // Inline Newsletter Component
  const InlineNewsletter = () => (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 mx-auto mb-4 animate-bounce" suppressHydrationWarning />
          <h3 className="text-3xl font-bold mb-2">Stay Ahead of the Curve</h3>
          <p className="text-lg opacity-90">
            Get exclusive weekly insights, expert analysis, and actionable strategies on blockchain, DeFi, and the revolutionary future of Web3
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <benefit.icon className="w-4 h-4 flex-shrink-0" suppressHydrationWarning />
              <span className="opacity-90">{benefit.text}</span>
            </div>
          ))}
        </div>

        {status === 'success' ? (
          <div className="bg-green-500 bg-opacity-20 border border-green-400 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" suppressHydrationWarning />
            <p className="flex-1">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Join Now
                  <Send className="w-4 h-4" suppressHydrationWarning />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="mt-3 text-sm text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" suppressHydrationWarning />
            {message}
          </div>
        )}

        <p className="text-xs text-center mt-4 opacity-70">
          Zero spam policy. Unsubscribe instantly. Your privacy is our priority.
        </p>
      </div>
    </div>
  );

  // Modal Newsletter Component
  const ModalNewsletter = () => (
    <>
      {showModal && !hasSubscribed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full p-8 relative animate-slide-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X className="w-5 h-5" suppressHydrationWarning />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" suppressHydrationWarning />
              </div>
              <h3 className="text-2xl font-bold mb-2 dark:text-white">Don't Miss Out!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join our exclusive newsletter for premium Web3 insights and strategies
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" suppressHydrationWarning />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{benefit.text}</span>
                </div>
              ))}
            </div>

            {status === 'success' ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" suppressHydrationWarning />
                <p className="flex-1 text-green-700 dark:text-green-400">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-3 bg-white dark:bg-gray-800 light:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    'Get Instant Access'
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <div className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {message}
              </div>
            )}

            <p className="text-xs text-center mt-4 text-gray-500">
              Zero spam policy. Unsubscribe instantly.
            </p>
          </div>
        </div>
      )}
    </>
  );

  // Sticky Newsletter Component
  const StickyNewsletter = () => (
    <>
      {isVisible && !hasSubscribed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 light:bg-white border-t border-gray-200 dark:border-gray-800 light:border-gray-200 shadow-lg z-40 animate-slide-up">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Get premium Web3 insights delivered
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join 10,000+ professionals • Exclusive weekly content
                  </p>
                </div>
              </div>

              {status === 'success' ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter professional email"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 light:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Join'
                    )}
                  </button>
                </form>
              )}

              <button
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Render based on variant
  switch (variant) {
    case 'modal':
      return <ModalNewsletter />;
    case 'sticky':
      return <StickyNewsletter />;
    default:
      return <InlineNewsletter />;
  }
}