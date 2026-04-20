'use client';

import { Card, CardBody } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const weeklyData = [
  { day: 'Mon', hours: 0 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 6 },
  { day: 'Thu', hours: 3 },
  { day: 'Fri', hours: 6 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
];

const typeData = [
  { name: 'School', value: 15, color: '#2E7D32' },
  { name: 'Work', value: 8, color: '#E65100' },
  { name: 'Personal', value: 6, color: '#7B1FA2' },
  { name: 'Events', value: 3, color: '#1565C0' },
];

export default function AnalyticsPage() {
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
            <p className="text-3xl font-bold text-[#2C1810]">32</p>
            <p className="text-xs text-[#2E7D32] mt-2">↑ 12% from last month</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <p className="text-sm text-[#8D6E63] mb-1">Avg Hours/Week</p>
            <p className="text-3xl font-bold text-[#2C1810]">19</p>
            <p className="text-xs text-[#2E7D32] mt-2">↑ 5% from last week</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <p className="text-sm text-[#8D6E63] mb-1">Busiest Day</p>
            <p className="text-3xl font-bold text-[#2C1810]">Wed</p>
            <p className="text-xs text-[#8D6E63] mt-2">6 hours scheduled</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <p className="text-sm text-[#8D6E63] mb-1">Free Time</p>
            <p className="text-3xl font-bold text-[#2C1810]">81h</p>
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
              <BarChart data={weeklyData}>
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
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
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
                    Your busiest days are Wednesday and Friday. Consider scheduling important tasks during these days.
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
                    You have 81 hours of free time per week. Consider adding more personal development activities.
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
                    Your schedule is well-balanced across different activity types. Keep up the good work!
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
