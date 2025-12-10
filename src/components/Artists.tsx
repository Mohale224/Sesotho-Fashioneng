import { useState, useEffect } from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Artist } from '../lib/types';

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name', { ascending: true });

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
      <section className="min-h-screen bg-black pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">Loading artists...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4">
            <span className="text-orange-400 font-medium text-sm tracking-wider">
              MEET THE CREATORS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Artists</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The visionary talents bringing Basotho culture and fashion to life
          </p>
        </div>

        {artists.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No artists to display at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-6">
                  <div className="sm:col-span-2">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-800">
                      <img
                        src={
                          artist.image ||
                          'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800'
                        }
                        alt={artist.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 flex flex-col">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {artist.name}
                      </h2>
                      {artist.genre && (
                        <p className="text-orange-400 font-medium mb-4">{artist.genre}</p>
                      )}
                      <p className="text-gray-400 leading-relaxed mb-6">{artist.bio}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        {artist.social_links?.instagram && (
                          <a
                            href={artist.social_links.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Instagram className="w-5 h-5 text-orange-400" />
                          </a>
                        )}
                        {artist.social_links?.facebook && (
                          <a
                            href={artist.social_links.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Facebook className="w-5 h-5 text-orange-400" />
                          </a>
                        )}
                        {artist.social_links?.twitter && (
                          <a
                            href={artist.social_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Twitter className="w-5 h-5 text-orange-400" />
                          </a>
                        )}
                      </div>

                      {artist.gallery && artist.gallery.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {artist.gallery.slice(0, 3).map((image, idx) => (
                            <div
                              key={idx}
                              className="aspect-square rounded-lg overflow-hidden bg-gray-700"
                            >
                              <img
                                src={image}
                                alt={`${artist.name} work ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
