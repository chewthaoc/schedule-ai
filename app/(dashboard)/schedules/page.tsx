'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface Schedule {
  id: string;
  title: string;
  description: string;
  type: string;
  color: string;
  is_active: boolean;
  created_at: string;
}

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schedules');

      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }

      const data = await response.json();
      setSchedules(data.schedules || []);
    } catch (error: any) {
      console.error('Error fetching schedules:', error);
      setError(error.message);
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
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
        <ErrorMessage message={error} onRetry={fetchSchedules} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Schedules</h1>
          <p className="text-[#5D4037]">Manage all your schedules in one place</p>
        </div>
        <Link href="/schedules/new">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            New Schedule
          </Button>
        </Link>
      </div>

      {schedules.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[#D7CCC8]" />
            <h3 className="text-xl font-semibold text-[#2C1810] mb-2">No schedules yet</h3>
            <p className="text-[#8D6E63] mb-6">Create your first schedule to get started</p>
            <Link href="/schedules/new">
              <Button variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Create Schedule
              </Button>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <Card key={schedule.id} hover>
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${schedule.color}20` }}
                  >
                    <Calendar
                      className="w-6 h-6"
                      style={{ color: schedule.color }}
                    />
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${schedule.color}20`,
                      color: schedule.color,
                    }}
                  >
                    {schedule.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#2C1810] mb-2">
                  {schedule.title}
                </h3>
                <p className="text-sm text-[#8D6E63] mb-4">
                  {schedule.description || 'No description'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD5]">
                  <div className="flex items-center gap-2 text-sm text-[#8D6E63]">
                    <Clock className="w-4 h-4" />
                    Active
                  </div>
                  <Link href={`/schedules/${schedule.id}`}>
                    <Button variant="ghost" size="sm">View</Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
