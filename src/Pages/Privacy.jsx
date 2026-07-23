import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Cookie, Trash2, User, Mail } from 'lucide-react';

export default function Privacy() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-16">
      <div className="container-custom px-4 sm:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-4">
            <Shield className="text-primary" size={32} />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-secondary-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            Your privacy is our priority. Learn how we protect your data.
          </p>
          <p className="text-sm text-secondary-400 mt-2">Last updated: {lastUpdated}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="font-display font-bold text-2xl text-secondary-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed mb-4">
              Moprix Gadgets Pvt. Ltd. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website moprix.in and use our services.
            </p>
            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Eye className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl text-secondary-900 dark:text-white mb-2">
                  2. Information We Collect
                </h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-secondary-900 dark:text-white mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Name, email address, phone number</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely via payment gateways)</li>
                  <li>Account credentials (encrypted)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-secondary-900 dark:text-white mb-2">Technical Information</h3>
                <ul className="list-disc list-inside space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring website and pages viewed</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-secondary-900 dark:text-white mb-2">Cookies & Tracking</h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content. You can manage cookie preferences through your browser settings.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <User className="text-success" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl text-secondary-900 dark:text-white mb-2">
                  3. How We Use Your Information
                </h2>
              </div>
            </div>
            
            <ul className="list-disc list-inside space-y-3 text-secondary-600 dark:text-secondary-400">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Lock className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl text-secondary-900 dark:text-white mb-2">
                  4. Data Security
                </h2>
              </div>
            </div>
            
            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary-600 dark:text-secondary-400">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure payment gateways (PCI DSS compliant)</li>
              <li>Regular security audits and updates</li>
              <li>Restricted access to personal data</li>
              <li>Secure data storage facilities</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                <Cookie className="text-warning" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl text-secondary-900 dark:text-white mb-2">
                  5. Third-Party Services
                </h2>
              </div>
            </div>
            
            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed mb-4">
              We may share your information with trusted third parties for specific purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary-600 dark:text-secondary-400">
              <li>Payment processors (RazorPay, PayTM)</li>
              <li>Shipping partners (Delhivery, BlueDart)</li>
              <li>Email service providers</li>
              <li>Analytics services (Google Analytics)</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <Trash2 className="text-danger" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl text-secondary-900 dark:text-white mb-2">
                  6. Your Rights
                </h2>
              </div>
            </div>
            
            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary-600 dark:text-secondary-400">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data (where applicable)</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-gradient-brand rounded-2xl p-8 shadow-sm border border-transparent text-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl text-white mb-2">
                  7. Contact Us
                </h2>
              </div>
            </div>
            
            <p className="text-secondary-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-secondary-200">
              <p><strong>Email:</strong> privacy@moprix.in</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> MG Road, Bangalore, Karnataka 560001</p>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link to="/" className="btn btn-primary btn-lg gap-2">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
