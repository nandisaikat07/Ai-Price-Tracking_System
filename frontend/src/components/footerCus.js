import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const FooterCus = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'Facebook', icon: FaFacebook, url: '#' },
    { label: 'Instagram', icon: FaInstagram, url: '#' },
    { label: 'Twitter', icon: FaTwitter, url: '#' },
    { label: 'LinkedIn', icon: FaLinkedin, url: '#' },
  ];

  const quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/productpage' },
    { label: 'About Us', url: '/aboutus' },
    { label: 'Contact', url: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://static.vecteezy.com/system/resources/previews/007/790/634/non_2x/a-global-tracking-logo-or-a-tracking-business-logo-concept-for-your-business-free-vector.jpg" alt="Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white">AI-Price-Tracking</span>
            </Link>
            <p className="text-sm">
              Bringing your dance dreams to life with passion, dedication, and excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.url}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                <span>123 Dance Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="h-5 w-5 text-gray-400" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
                <span>contact@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© {currentYear} AI-Tracking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCus;
