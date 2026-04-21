'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditEventModalProps {
  event: {
    id: string;
    title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    day_of_week: number;
    category: string;
    color: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export function EditEventModal({ event, onClose, onSuccess }: EditEventModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description || '',
    location: event.location || '',
    startTime: event.start_time,
    endTime: event.end_time,
    dayOfWeek: event.day_of_week,
    category: event.category || '',
    color: event.color,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          startTime: formData.startTime,
          endTime: formData.endTime,
          dayOfWeek: formData.dayOfWeek,
          category: formData.category,
          color: formData.color,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      toast.success('Event updated successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error updating event:', error);
      toast.error(error.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2C1810]">Edit Event</h2>
            <button
              onClick={onClose}
              className="text-[#8D6E63] hover:text-[#2C1810] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Event Title"
              placeholder="e.g., Computer Science Lab"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Textarea
              label="Description"
              placeholder="Additional details about this event"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />

            <Input
              label="Location"
              placeholder="e.g., Room NE-4-17"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />

            <Input
              label="Category"
              placeholder="e.g., Lab, Tutorial, Lecture"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                  Day of Week
                </label>
                <select
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-[#D7CCC8] bg-white text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={4}>Thursday</option>
                  <option value={5}>Friday</option>
                  <option value={6}>Saturday</option>
                  <option value={0}>Sunday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#D7CCC8] bg-white text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-[#D7CCC8] bg-white text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
