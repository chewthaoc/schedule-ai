'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Calendar, MapPin, Clock, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

import { AddEventModal } from '@/components/modals/AddEventModal';
import { EditEventModal } from '@/components/modals/EditEventModal';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

interface Schedule {
  id: string;
  title: string;
  description: string;
  type: string;
  color: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  day_of_week: number;
  category: string;
  color: string;
}

export default function ScheduleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchScheduleData();
  }, [params.id]);

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/schedules/${params.id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }

      const data = await response.json();
      setSchedule(data.schedule);
      setEvents(data.schedule.events || []);
    } catch (error: any) {
      console.error('Error fetching schedule:', error);
      setError(error.message);
      toast.error('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this schedule?')) {
      return;
    }

    try {
      const response = await fetch(`/api/schedules/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }

      toast.success('Schedule deleted successfully');
      router.push('/schedules');
    } catch (error: any) {
      console.error('Error deleting schedule:', error);
      toast.error('Failed to delete schedule');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      toast.success('Event deleted successfully');
      fetchScheduleData();
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="p-8">
        <ErrorMessage message={error || 'Schedule not found'} onRetry={fetchScheduleData} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/schedules">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Schedules
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810] mb-2">{schedule.title}</h1>
          <p className="text-[#5D4037]">{schedule.description}</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/schedules/${params.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={view === 'grid' ? 'primary' : 'outline'}
          onClick={() => setView('grid')}
        >
          Weekly Grid
        </Button>
        <Button
          variant={view === 'list' ? 'primary' : 'outline'}
          onClick={() => setView('list')}
        >
          Daily List
        </Button>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <Card>
          <CardBody className="p-0 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#2C1810] text-white py-3 px-4 text-left text-sm font-medium w-32 sticky left-0">
                    Time
                  </th>
                  {DAYS.slice(1, 6).map((day) => (
                    <th key={day} className="bg-[#2C1810] text-white py-3 px-4 text-center text-sm font-medium">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((time, timeIndex) => (
                  <tr key={time}>
                    <td className="bg-[#E8DFD5] py-4 px-4 text-sm font-medium border border-[#D7CCC8] sticky left-0">
                      {time}
                    </td>
                    {DAYS.slice(1, 6).map((day, dayIndex) => {
                      const event = events.find(
                        (e) => e.day_of_week === dayIndex + 1 && e.start_time.startsWith(time.slice(0, 2))
                      );
                      return (
                        <td key={day} className="py-2 px-2 border border-[#D7CCC8] align-top">
                          {event ? (
                            <div
                              className="rounded p-3 text-center cursor-pointer hover:opacity-90 transition-opacity group relative"
                              style={{ backgroundColor: `${event.color}20`, color: event.color }}
                              onClick={() => setEditingEvent(event)}
                            >
                              <div className="font-semibold text-sm">{event.title}</div>
                              <div className="text-xs opacity-75 mt-1">{event.location}</div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteEvent(event.id);
                                }}
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-all"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="text-center text-[#BCAAA4] text-sm">—</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-4">
          {DAYS.slice(1, 6).map((day, dayIndex) => {
            const dayEvents = events.filter((e) => e.day_of_week === dayIndex + 1);
            return (
              <Card key={day}>
                <div className="bg-[#2C1810] text-white py-3 px-6 text-sm font-medium">
                  {day}
                </div>
                {dayEvents.length > 0 ? (
                  <CardBody className="p-0 divide-y divide-[#E8DFD5]">
                    {dayEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 hover:bg-[#F5F0E8] transition-colors group">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-24 text-sm font-medium text-[#8D6E63]">
                            {event.start_time} - {event.end_time}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-[#2C1810]">{event.title}</div>
                            <div className="text-sm text-[#8D6E63] flex items-center gap-2 mt-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ backgroundColor: `${event.color}20`, color: event.color }}
                          >
                            {event.category}
                          </span>
                          <button
                            onClick={() => setEditingEvent(event)}
                            className="opacity-0 group-hover:opacity-100 text-[#8D6E63] hover:text-[#2C1810] transition-all p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                ) : (
                  <CardBody className="p-8 text-center text-sm text-[#BCAAA4]">
                    No classes. Enjoy your day! ☕
                  </CardBody>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Event Button */}
      <div className="mt-6">
        <Button variant="primary" onClick={() => setShowAddEventModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <AddEventModal
          scheduleId={params.id}
          scheduleColor={schedule.color}
          onClose={() => setShowAddEventModal(false)}
          onSuccess={fetchScheduleData}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSuccess={fetchScheduleData}
        />
      )}
    </div>
  );
}
