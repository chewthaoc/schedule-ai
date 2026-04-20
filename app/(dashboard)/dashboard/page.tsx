'use client';

import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Upload, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
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
                <p className="text-3xl font-bold text-[#2C1810]">3</p>
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
            {[
              { title: 'Spring 2026 Timetable', type: 'school', events: 15, color: '#2E7D32' },
              { title: 'Work Schedule', type: 'work', events: 8, color: '#E65100' },
              { title: 'Gym Routine', type: 'personal', events: 6, color: '#7B1FA2' },
            ].map((schedule, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-[#D7CCC8] hover:border-[#8D6E63] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: schedule.color }}
                  />
                  <div>
                    <h3 className="font-medium text-[#2C1810]">{schedule.title}</h3>
                    <p className="text-sm text-[#8D6E63]">
                      {schedule.events} events · {schedule.type}
                    </p>
                  </div>
                </div>
                <Link href={`/schedules/${index + 1}`}>
                  <Button variant="ghost" size="sm">View</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
