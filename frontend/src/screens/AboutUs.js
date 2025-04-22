import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaRobot, FaShieldAlt, FaUserFriends } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-indigo-900/50 to-purple-900/50"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTR2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINFYzNEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMGgydjRINHYyaDR2NGgydi00aDRWNEg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About AI-Price-Tracking
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Revolutionizing online shopping through AI-powered price tracking and smart recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Mission</h2>
            <p className="text-xl text-gray-200 text-center max-w-4xl mx-auto">
              At AI-Price-Tracking, we're on a mission to empower consumers with intelligent price tracking tools that help them make informed purchasing decisions. We believe that everyone deserves access to the best deals and price insights, and we're committed to making that a reality through cutting-edge AI technology.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <FaChartLine className="text-white text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Price Tracking</h3>
              <p className="text-gray-200">
                Monitor product prices across multiple e-commerce platforms and get instant notifications on price drops
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <FaRobot className="text-white text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-gray-200">
                Get smart recommendations and price predictions based on historical data and market trends
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <FaUserFriends className="text-white text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">User-Focused Design</h3>
              <p className="text-gray-200">
                Intuitive interface designed with user experience at its core, making price tracking effortless
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <FaShieldAlt className="text-white text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Security & Reliability</h3>
              <p className="text-gray-200">
                Your data is protected with enterprise-grade security measures and reliable infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Bijendra Pal Singh</h3>
              <p className="text-gray-300 text-center mb-2">CEO & Founder</p>
              <p className="text-gray-200 text-center">
                Visionary leader with 10+ years of experience in e-commerce and AI technology
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Saikat Nandi</h3>
              <p className="text-gray-300 text-center mb-2">CTO</p>
              <p className="text-gray-200 text-center">
                Expert in AI and machine learning with a passion for building innovative solutions
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Arunava Bandhu</h3>
              <p className="text-gray-300 text-center mb-2">Lead Developer</p>
              <p className="text-gray-200 text-center">
                Full-stack developer specializing in scalable web applications and real-time data processing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Saving with Smart Shopping
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of smart shoppers who save money using our AI-powered platform
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Get Started - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
