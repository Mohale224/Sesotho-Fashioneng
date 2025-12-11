import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20">
  <img
    src="/images/landing-page-photo.png"
    alt="Basotho"
    className="w-full h-full object-cover"
  />
</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="basotho-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" />
          </pattern>
          <rect width="100" height="100" fill="url(#basotho-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full backdrop-blur-sm">
            <span className="text-yellow-400 font-medium text-sm tracking-wider">
              CELEBRATING BASOTHO HERITAGE
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Sesotho
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 bg-clip-text text-transparent">
              Fashioneng
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where traditional Basotho culture meets contemporary fashion.
            Experience the movement that's redefining cultural expression.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <a
              href="#shop"
              className="group px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-400 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-500 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-yellow-500/25"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#events"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Upcoming Events
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-300">500+</div>
              <div className="text-gray-400 text-sm">Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">50+</div>
              <div className="text-gray-400 text-sm">Artists</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">100+</div>
              <div className="text-gray-400 text-sm">Events</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
