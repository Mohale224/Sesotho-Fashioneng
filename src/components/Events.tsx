import { useState, useEffect } from 'react';
import { Calendar, MapPin, Ticket, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Event, TicketType } from '../lib/types';
import { useCart } from '../contexts/CartContext';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [tickets, setTickets] = useState<Record<string, TicketType[]>>({});
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .order('event_date', { ascending: true });

      if (eventsError) throw eventsError;

      const { data: ticketsData, error: ticketsError } = await supabase
        .from('ticket_types')
        .select('*');

      if (ticketsError) throw ticketsError;

      const ticketsByEvent = (ticketsData || []).reduce((acc, ticket) => {
        if (!acc[ticket.event_id]) {
          acc[ticket.event_id] = [];
        }
        acc[ticket.event_id].push(ticket);
        return acc;
      }, {} as Record<string, TicketType[]>);

      setEvents(eventsData || []);
      setTickets(ticketsByEvent);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddTicket = (ticket: TicketType, event: Event) => {
    addToCart({
      type: 'ticket',
      name: ticket.name,
      price: ticket.price,
      quantity: 1,
      ticketTypeId: ticket.id,
      eventName: event.name,
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">Loading events...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Upcoming Events</h1>
          <p className="text-gray-400">Experience the culture, celebrate the movement</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No upcoming events at the moment. Check back soon!
          </div>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-video lg:aspect-auto overflow-hidden bg-gray-800">
                    <img
                      src='/images/event-for-2024.jpg'
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium">
                        {event.status.toUpperCase()}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">{event.name}</h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6 leading-relaxed">{event.description}</p>

                    {tickets[event.id] && tickets[event.id].length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Ticket className="w-5 h-5 text-yellow-400" />
                          Available Tickets
                        </h3>

                        <div className="space-y-3">
                          {tickets[event.id].map((ticket) => {
                            const available = ticket.quantity_available - ticket.quantity_sold;
                            return (
                              <div
                                key={ticket.id}
                                className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between"
                              >
                                <div className="flex-1">
                                  <h4 className="text-white font-semibold mb-1">{ticket.name}</h4>
                                  {ticket.description && (
                                    <p className="text-gray-400 text-sm mb-2">{ticket.description}</p>
                                  )}
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Users className="w-4 h-4" />
                                    <span>{available} tickets left</span>
                                  </div>
                                </div>

                                <div className="text-right ml-4">
                                  <div className="text-2xl font-bold text-white mb-2">
                                    M{ticket.price.toFixed(2)}
                                  </div>
                                  <button
                                    onClick={() => handleAddTicket(ticket, event)}
                                    disabled={available === 0}
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                  >
                                    {available === 0 ? 'Sold Out' : 'Add to Cart'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
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
