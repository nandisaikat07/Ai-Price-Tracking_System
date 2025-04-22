import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRobot, FaSearch, FaHistory, FaPercentage, FaUsers, FaChartBar, FaRegSmile, FaRegStar, FaStar } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900">
      <Helmet>
        <title>AI Price Tracking - Home</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/95 via-purple-900/95 to-fuchsia-900/95"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTR2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINFYzNEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMGgydjRINHYyaDR2NGgydi00aDRWNEg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              AI-Powered Price Tracking
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Track prices, get alerts, and make smarter shopping decisions with our advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/productpage"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Browse Products
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-b from-violet-950/40 to-purple-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <FaUsers className="text-blue-400 text-5xl mx-auto mb-4" />
              <h3 className="text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">10K+</h3>
              <p className="text-gray-300 text-lg">Active Users</p>
            </div>
            <div className="text-center bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <FaChartBar className="text-purple-400 text-5xl mx-auto mb-4" />
              <h3 className="text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">1M+</h3>
              <p className="text-gray-300 text-lg">Products Tracked</p>
            </div>
            <div className="text-center bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <FaRegSmile className="text-pink-400 text-5xl mx-auto mb-4" />
              <h3 className="text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">₹50M+</h3>
              <p className="text-gray-300 text-lg">Money Saved</p>
            </div>
            <div className="text-center bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <FaRegStar className="text-yellow-400 text-5xl mx-auto mb-4" />
              <h3 className="text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">4.8/5</h3>
              <p className="text-gray-300 text-lg">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-fuchsia-900/30 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-purple-300 to-fuchsia-200">
            Advanced AI-Powered Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 group shadow-lg shadow-purple-900/20">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-3 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-md">
                <FaRobot className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-violet-100 mb-4">Smart Price Predictions</h3>
              <p className="text-violet-200/90 leading-relaxed">Our AI analyzes historical data to predict future price trends and optimal buying times.</p>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 group shadow-lg shadow-purple-900/20">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-md">
                <FaSearch className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-violet-100 mb-4">Cross-Platform Search</h3>
              <p className="text-violet-200/90 leading-relaxed">Find the best deals across multiple e-commerce platforms with a single search.</p>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 group shadow-lg shadow-purple-900/20">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-md">
                <FaPercentage className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-violet-100 mb-4">Price Drop Alerts</h3>
              <p className="text-violet-200/90 leading-relaxed">Get instant notifications when prices drop below your target price.</p>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 group shadow-lg shadow-purple-900/20">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-md">
                <FaHistory className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-violet-100 mb-4">Price History Analysis</h3>
              <p className="text-violet-200/90 leading-relaxed">View detailed price history and trends to make informed purchasing decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/40 to-fuchsia-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-purple-300 to-fuchsia-200">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 shadow-lg shadow-purple-900/20">
              <h3 className="text-xl font-semibold text-violet-100 mb-6 text-center">Traditional Shopping</h3>
              <ul className="space-y-4">
                <li className="flex items-center bg-violet-950/30 p-3 rounded-xl">
                  <span className="text-red-400 mr-3 text-xl">✕</span>
                  <span className="text-lg text-violet-200">Manual price tracking</span>
                </li>
                <li className="flex items-center bg-violet-950/30 p-3 rounded-xl">
                  <span className="text-red-400 mr-3 text-xl">✕</span>
                  <span className="text-lg text-violet-200">Limited price history</span>
                </li>
                <li className="flex items-center bg-violet-950/30 p-3 rounded-xl">
                  <span className="text-red-400 mr-3 text-xl">✕</span>
                  <span className="text-lg text-violet-200">No price predictions</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-8 rounded-2xl border border-purple-400/30 transform scale-105 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">AI Price Tracking</h3>
              <ul className="space-y-4">
                <li className="flex items-center bg-white/10 p-3 rounded-xl">
                  <span className="text-emerald-300 mr-3 text-xl">✓</span>
                  <span className="text-lg text-white">Automated tracking</span>
                </li>
                <li className="flex items-center bg-white/10 p-3 rounded-xl">
                  <span className="text-emerald-300 mr-3 text-xl">✓</span>
                  <span className="text-lg text-white">Detailed price history</span>
                </li>
                <li className="flex items-center bg-white/10 p-3 rounded-xl">
                  <span className="text-emerald-300 mr-3 text-xl">✓</span>
                  <span className="text-lg text-white">Smart price predictions</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 shadow-lg shadow-purple-900/20">
              <h3 className="text-xl font-semibold text-violet-100 mb-6 text-center">Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-center bg-violet-950/30 p-3 rounded-xl">
                  <span className="text-blue-400 mr-3 text-xl">★</span>
                  <span className="text-lg text-violet-200">Save up to 30% on purchases</span>
                </li>
                <li className="flex items-center bg-violet-950/30 p-3 rounded-xl">
                  <span className="text-blue-400 mr-3 text-xl">★</span>
                  <span className="text-lg text-violet-200">Never miss a price drop</span>
                </li>
                <li className="flex items-center bg-violet-950/30 p-3 rounded-xl">
                  <span className="text-blue-400 mr-3 text-xl">★</span>
                  <span className="text-lg text-violet-200">Make informed decisions</span>
                </li>
              </ul>
      </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/30 to-purple-900/30 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-purple-300 to-fuchsia-200">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mr-4 flex items-center justify-center text-white text-2xl font-bold shadow-md">SJ</div>
                <div>
                  <h4 className="text-violet-100 font-semibold text-lg">Sarah Johnson</h4>
                  <div className="flex text-amber-400">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-violet-200/90 leading-relaxed">"This platform has saved me hundreds of dollars! The AI predictions are incredibly accurate."</p>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex items-center justify-center text-white text-2xl font-bold shadow-md">MC</div>
                <div>
                  <h4 className="text-violet-100 font-semibold text-lg">Michael Chen</h4>
                  <div className="flex text-amber-400">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-violet-200/90 leading-relaxed">"The cross-platform search feature is a game-changer. I can find the best deals instantly!"</p>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mr-4 flex items-center justify-center text-white text-2xl font-bold shadow-md">ER</div>
                <div>
                  <h4 className="text-violet-100 font-semibold text-lg">Emily Rodriguez</h4>
                  <div className="flex text-amber-400">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-violet-200/90 leading-relaxed">"The price drop alerts are so convenient. I never miss a good deal anymore!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/40 to-violet-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-purple-300 to-fuchsia-200">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <div className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-purple-300">1</div>
              <h3 className="text-xl font-semibold text-violet-100 mb-4">Track Products</h3>
              <p className="text-violet-200/90 leading-relaxed">Add products to your watchlist and set your target price.</p>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <div className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">2</div>
              <h3 className="text-xl font-semibold text-violet-100 mb-4">AI Analysis</h3>
              <p className="text-violet-200/90 leading-relaxed">Our AI analyzes price patterns and market trends.</p>
            </div>
            <div className="bg-gradient-to-br from-violet-900/50 to-purple-800/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-400/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20">
              <div className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-red-300">3</div>
              <h3 className="text-xl font-semibold text-violet-100 mb-4">Get Notified</h3>
              <p className="text-violet-200/90 leading-relaxed">Receive alerts when it's the best time to buy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 to-purple-900/30 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-purple-300 to-fuchsia-200">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-violet-200/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of smart shoppers who are already saving money with our AI-powered price tracking.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <FaArrowRight className="ml-2" />
          </Link>
      </div>
      </section>
    </div>
  );
}

export default HomeScreen;
