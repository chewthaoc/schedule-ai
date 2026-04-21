'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Upload, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/Loading';
import toast from 'react-hot-toast';

interface Schedule {
  id: string;
  title: string;
  type: string;
  color: string;
}

export default function DashboardPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/schedules');
      if (!response.ok) throw new Error('Failed to fetch schedules');

      const data = await response.json();
      setSchedules(data.schedules || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Failed to load dashboard data');
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
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Dashboard</h1>
        <p className="text-[#5D4037]">Welcome back! Here's your schedule overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card hover>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8D6E63] mb-1">Total Events</p>
                <p className="text-3xl font-bold text-[#2C1810]">24</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#2E7D32]" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8D6E63] mb-1">This Week</p>
                <p className="text-3xl font-bold text-[#2C1810]">12</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#FFF3E0] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#E65100]" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8D6E63] mb-1">Schedules</p>
                <p className="text-3xl font-bold text-[#2C1810]">{schedules.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#E3F2FD] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#1565C0]" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8D6E63] mb-1">Hours/Week</p>
                <p className="text-3xl font-bold text-[#2C1810]">19</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#F3E5F5] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#7B1FA2]" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardBody className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#8D6E63] flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                  Upload Schedule Image
                </h3>
                <p className="text-[#5D4037] mb-4">
                  Let AI automatically extract events from your timetable image
                </p>
                <Link href="/schedules/new">
                  <Button variant="primary">Upload Now</Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#2E7D32] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                  Create Manual Schedule
                </h3>
                <p className="text-[#5D4037] mb-4">
                  Add events manually and organize your time
                </p>
                <Link href="/schedules/new?manual=true">
                  <Button variant="secondary">Create Schedule</Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Schedules */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2C1810]">Recent Schedules</h2>
            <Link href="/schedules">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {schedules.length > 0 ? (
              schedules.slice(0, 3).map((schedule, index) => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: schedule.color }}
                    />
                    <div>
                      <h3 className="font-medium text-[#2C1810]">{schedule.title}</h3>
                      <p className="text-sm text-[#8D6E63]">{schedule.type}</p>
                    </div>
                  </div>
                  <Link href={`/schedules/${schedule.id}`}>
                    <Button variant="ghost" size="sm">View</Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#8D6E63]">
                <p className="mb-4">No schedules yet</p>
                <Link href="/schedules/new">
                  <Button variant="primary" size="sm">Create Your First Schedule</Button>
                </Link>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
