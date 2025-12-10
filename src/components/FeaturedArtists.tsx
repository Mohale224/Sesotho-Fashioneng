import { useState, useEffect } from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Artist } from '../lib/types';

export default function FeaturedArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('featured', true)
        .limit(4);

      if (error) throw error;
      setArtists(data || []);
    } catch (error) {
      console.error('Error loading artists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">Loading artists...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="artists" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4">
            <span className="text-orange-400 font-medium text-sm tracking-wider">
              MEET THE TALENT
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured Artists
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The creative minds bringing Basotho culture to life
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="aspect-square overflow-hidden bg-gray-800">
                <img
                  src={artist.image || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {artist.name}
                </h3>
                {artist.genre && (
                  <p className="text-orange-400 text-sm font-medium mb-3">
                    {artist.genre}
                  </p>
                )}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {artist.bio}
                </p>

                <div className="flex items-center gap-2">
                  {artist.social_links?.instagram && (
                    <a
                      href={artist.social_links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-orange-400" />
                    </a>
                  )}
                  {artist.social_links?.facebook && (
                    <a
                      href={artist.social_links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-orange-400" />
                    </a>
                  )}
                  {artist.social_links?.twitter && (
                    <a
                      href={artist.social_links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-orange-400" />
                    </a>
                  )}
                </div>

                <a
                  href={`#artist-${artist.id}`}
                  className="mt-4 block w-full py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-center text-sm"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#artists"
            className="inline-block px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            View All Artists
          </a>
        </div>
      </div>
    </section>
  );
}
