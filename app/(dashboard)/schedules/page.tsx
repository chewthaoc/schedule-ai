'use client';

import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function SchedulesPage() {
  const schedules = [
    {
      id: 1,
      title: 'Spring 2026 Timetable',
      description: 'University course schedule',
      type: 'school',
      color: '#2E7D32',
      events: 15,
      isActive: true,
    },
    {
      id: 2,
      title: 'Work Schedule',
      description: 'Office hours and meetings',
      type: 'work',
      color: '#E65100',
      events: 8,
      isActive: true,
    },
    {
      id: 3,
      title: 'Gym Routine',
      description: 'Weekly workout plan',
      type: 'personal',
      color: '#7B1FA2',
      events: 6,
      isActive: true,
    },
  ];

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
                {schedule.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD5]">
                <div className="flex items-center gap-2 text-sm text-[#8D6E63]">
                  <Clock className="w-4 h-4" />
                  {schedule.events} events
                </div>
                <Link href={`/schedules/${schedule.id}`}>
                  <Button variant="ghost" size="sm">View</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
