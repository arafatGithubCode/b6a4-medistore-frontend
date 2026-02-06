"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">MediStore</h3>
            <p className="text-sm text-slate-400 mb-4">
              Your trusted online pharmacy delivering quality medicines and
              healthcare products to your doorstep.
            </p>
            <div className="flex gap-4 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-slate-400 hover:text-white transition"
                >
                  Shop Medicines
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-slate-400 hover:text-white transition"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-slate-400 hover:text-white transition"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-slate-400 hover:text-white transition"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <a
                  href="mailto:support@medistore.com"
                  className="text-slate-400 hover:text-white transition"
                >
                  support@medistore.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-400 mt-0.5" />
                <span className="text-slate-400">
                  123 Healthcare Ave, Medical City, MC 12345
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to get updates on new medicines and health tips.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-slate-800 text-white placeholder-slate-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">
              &copy; {currentYear} MediStore. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
