'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { LoadingSpinner } from '@/components/ui/Loading';
import toast from 'react-hot-toast';

interface Analytics {
  totalEvents: number;
  totalSchedules: number;
  avgHoursPerWeek: number;
  busiestDay: string;
  busiestDayHours: number;
  freeTime: number;
  weeklyData: Array<{ day: string; hours: number }>;
  typeData: Array<{ name: string; value: number; color: string }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');

      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
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

  if (!analytics) {
    return (
      <div className="p-8">
        <Card>
          <CardBody className="p-12 text-center">
            <p className="text-[#8D6E63]">No analytics data available</p>
          </CardBody>
        </Card>
      </div>
    );
  }
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Analytics</h1>
        <p className="text-[#5D4037]">Insights into your time management</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card hover>
          <CardBody>
            <p className="text-sm text-[#8D6E63] mb-1">Total Events</p>
            <p className="text-3xl font-bold text-[#2C1810]">{analytics.totalEvents}</p>
            <p className="text-xs text-[#8D6E63] mt-2">Across all schedules</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <p className="text-sm text-[#8D6E63] mb-1">Avg Hours/Week</p>
            <p className="text-3xl font-bold text-[#2C1810]">{analytics.avgHoursPerWeek}</p>
            <p className="text-xs text-[#8D6E63] mt-2">Scheduled time</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <p className="text-sm text-[#8D6E63] mb-1">Busiest Day</p>
            <p className="text-3xl font-bold text-[#2C1810]">{analytics.busiestDay}</p>
            <p className="text-xs text-[#8D6E63] mt-2">{analytics.busiestDayHours}h scheduled</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <p className="text-sm text-[#8D6E63] mb-1">Free Time</p>
            <p className="text-3xl font-bold text-[#2C1810]">{analytics.freeTime}h</p>
            <p className="text-xs text-[#8D6E63] mt-2">per week available</p>
          </CardBody>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold text-[#2C1810] mb-6">Weekly Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD5" />
                <XAxis dataKey="day" stroke="#8D6E63" />
                <YAxis stroke="#8D6E63" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #D7CCC8',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="hours" fill="#8D6E63" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold text-[#2C1810] mb-6">Events by Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #D7CCC8',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold text-[#2C1810] mb-4">Smart Insights</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#E8F5E9] border border-[#2E7D32]/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-[#2E7D32] mb-1">Peak Productivity</h3>
                  <p className="text-sm text-[#5D4037]">
                    Your busiest day is {analytics.busiestDay} with {analytics.busiestDayHours} hours scheduled. Consider scheduling important tasks during your peak productivity times.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#FFF3E0] border border-[#E65100]/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-[#E65100] mb-1">Time Balance</h3>
                  <p className="text-sm text-[#5D4037]">
                    You have {analytics.freeTime} hours of free time per week. {analytics.freeTime > 50 ? 'Consider adding more productive activities or personal development time.' : 'Your schedule is well-balanced!'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#E3F2FD] border border-[#1565C0]/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-[#1565C0] mb-1">Schedule Consistency</h3>
                  <p className="text-sm text-[#5D4037]">
                    {analytics.typeData.length > 1
                      ? 'Your schedule is well-balanced across different activity types. Keep up the good work!'
                      : 'Consider diversifying your schedule with different types of activities for better work-life balance.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
