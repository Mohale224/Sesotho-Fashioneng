import { useState, useEffect } from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Event } from '../lib/types';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .order('event_date', { ascending: true })
        .limit(3);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">Loading events...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4">
            <span className="text-orange-400 font-medium text-sm tracking-wider">
              UPCOMING EXPERIENCES
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Cultural Events
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join us for unforgettable celebrations of Basotho culture and artistry
          </p>
        </div>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden bg-gray-800">
                  <img
                    src={event.images[0] || 'https://images.pexels.com/photos/2263410/pexels-photo-2263410.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium">
                          {event.status.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                        {event.name}
                      </h3>

                      <p className="text-gray-400 mb-6 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-300">
                          <Calendar className="w-5 h-5 text-orange-400" />
                          <span>{formatDate(event.event_date)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <MapPin className="w-5 h-5 text-orange-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-3">
                      <a
                        href={`#event-${event.id}`}
                        className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap"
                      >
                        <Ticket className="w-5 h-5" />
                        <span>Get Tickets</span>
                      </a>
                      <a
                        href={`#event-${event.id}`}
                        className="flex-1 md:flex-none px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-center whitespace-nowrap"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#events"
            className="inline-block px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            View All Events
          </a>
        </div>
      </div>
    </section>
  );
}
