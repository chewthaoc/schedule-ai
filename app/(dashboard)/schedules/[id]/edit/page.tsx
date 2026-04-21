'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface Schedule {
  id: string;
  title: string;
  description: string;
  type: string;
  color: string;
}

export default function EditSchedulePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'school',
    color: '#8D6E63',
  });

  useEffect(() => {
    fetchSchedule();
  }, [params.id]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/schedules/${params.id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }

      const data = await response.json();
      const schedule = data.schedule;

      setFormData({
        title: schedule.title,
        description: schedule.description || '',
        type: schedule.type,
        color: schedule.color,
      });
    } catch (error: any) {
      console.error('Error fetching schedule:', error);
      setError(error.message);
      toast.error('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/schedules/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          color: formData.color,
          isActive: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update schedule');
      }

      toast.success('Schedule updated successfully!');
      router.push(`/schedules/${params.id}`);
    } catch (error: any) {
      console.error('Error updating schedule:', error);
      toast.error(error.message || 'Failed to update schedule');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <ErrorMessage message={error} onRetry={fetchSchedule} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href={`/schedules/${params.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Schedule
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Edit Schedule</h1>
        <p className="text-[#5D4037]">Update your schedule information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-[#2C1810] mb-4">Basic Information</h2>

            <div className="space-y-4">
              <Input
                label="Schedule Title"
                placeholder="e.g., Spring 2026 Timetable"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <Textarea
                label="Description"
                placeholder="Brief description of this schedule"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />

              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                  Schedule Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#D7CCC8] bg-white text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  <option value="school">School</option>
                  <option value="work">Work</option>
                  <option value="event">Event</option>
                  <option value="personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                  Color Theme
                </label>
                <div className="flex gap-3">
                  {['#2E7D32', '#E65100', '#1565C0', '#7B1FA2', '#C62828', '#8D6E63'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        formData.color === color ? 'ring-2 ring-offset-2 ring-[#2C1810]' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? (
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
    </div>
  );
}
