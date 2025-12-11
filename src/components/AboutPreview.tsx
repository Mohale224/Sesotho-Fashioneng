import { Heart, Users, Sparkles } from 'lucide-react';

export default function AboutPreview() {
  return (
    <section id="about" className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="about-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" className="text-orange-500" />
          </pattern>
          <rect width="100" height="100" fill="url(#about-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
            <span className="text-yellow-400 font-medium text-sm tracking-wider">
              OUR STORY
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The Movement
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Sesotho Fashioneng is more than fashion—it's a cultural revolution celebrating
            Basotho heritage through contemporary design, art, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800">
              <img 
                src="/images/Stunna.jpeg" 
                alt="Ntate Stunna in Olady oa Roka Shirt" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Honoring Tradition,
              <br />
              <span className="text-yellow-400">Embracing Innovation</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Founded in the heart of Lesotho, Sesotho Fashioneng emerged from a
              desire to preserve and celebrate our rich cultural heritage while
              pushing the boundaries of contemporary fashion.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We bring together master craftspeople, visionary designers, and talented
              artists to create pieces that tell stories of our ancestors while
              speaking to modern aesthetics.
            </p>
            <a
              href="#about"
              className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
            >
              Learn More About Us
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-800">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-yellow-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Cultural Pride</h4>
            <p className="text-gray-400">
              Every piece we create celebrates the beauty and richness of Basotho
              culture, honoring our ancestors and inspiring future generations.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-800">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-yellow-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Community First</h4>
            <p className="text-gray-400">
              We're building a movement that brings people together through fashion,
              art, and cultural experiences that unite our community.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-800">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-yellow-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Innovation</h4>
            <p className="text-gray-400">
              We blend traditional craftsmanship with modern design techniques,
              creating unique pieces that bridge past and present.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}