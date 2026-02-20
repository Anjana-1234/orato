import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import welcomeBg from "../assets/welcome-bg.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      
      {/* Use existing Navbar component */}
      <Navbar isLoggedIn={false} />

      {/* Welcome Section with Background Image */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${welcomeBg})` }}
      >
        {/* Gradient Overlay - Stronger on right, transparent on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/50 to-black/70"></div>
        
        {/* Content Container - Positioned on RIGHT side */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="ml-auto max-w-2xl">
            
            {/* Glass Card */}
            <div className="backdrop-blur-md bg-black/20 border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
              
              {/* Animated Welcome Text - BALANCED SIZE */}
              <h1 className="text-5xl md:text-5xl font-black mb-4 leading-tight animate-fade-in-up">
                <span className="text-white drop-shadow-2xl block">Welcome to</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 animate-gradient drop-shadow-2xl block">
                  ORATO
                </span>
              </h1>

              {/* Animated Line */}
              <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-emerald-400 mb-6 rounded-full animate-pulse"></div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white mb-8 animate-fade-in-up animation-delay-200 drop-shadow-lg leading-relaxed">
                Unlock smarter, personalized lessons designed to accelerate your fluency.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-base hover:from-green-600 hover:to-emerald-700 transition-all shadow-2xl hover:shadow-green-500/50 hover:scale-105 text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/signin"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 rounded-xl font-bold text-base hover:bg-white/30 transition-all shadow-2xl hover:scale-105 text-center"
                >
                  Sign In
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-green-200 text-green-800 rounded-full text-sm font-semibold mb-6">
              AI-Powered Language Learning
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Any Language with
              <br />
              <span className="text-green-600">Personalized AI</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Learn at your own pace with AI-powered lessons tailored to your skill level. 
              From beginner to advanced, Orato adapts to your learning journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4 mb-12">
              <Link
                to="/signup"
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                to="/signin"
                className="px-8 py-4 border-2 border-gray-400 text-gray-700 rounded-xl font-bold text-lg hover:border-green-600 hover:text-green-600 transition"
              >
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl font-bold text-green-600">10K+</div>
                <div className="text-gray-600 mt-2">Active Learners</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl font-bold text-green-600">15+</div>
                <div className="text-gray-600 mt-2">Languages</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl font-bold text-green-600">4.9</div>
                <div className="text-gray-600 mt-2">User Rating</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Use existing Footer component */}
      <Footer />

    </div>
  );
};

export default Home;