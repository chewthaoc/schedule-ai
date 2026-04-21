import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all schedules for the user
    const { data: schedules, error: schedulesError } = await supabase
      .from('schedules')
      .select('id, type, created_at')
      .eq('user_id', user.id);

    if (schedulesError) throw schedulesError;

    // Fetch all events for the user's schedules
    const scheduleIds = schedules?.map(s => s.id) || [];

    let events: any[] = [];
    if (scheduleIds.length > 0) {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('schedule_id, day_of_week, start_time, end_time')
        .in('schedule_id', scheduleIds);

      if (eventsError) throw eventsError;
      events = eventsData || [];
    }

    // Calculate statistics
    const totalEvents = events.length;
    const totalSchedules = schedules?.length || 0;

    // Calculate events by day of week
    const weeklyData = [
      { day: 'Mon', hours: 0 },
      { day: 'Tue', hours: 0 },
      { day: 'Wed', hours: 0 },
      { day: 'Thu', hours: 0 },
      { day: 'Fri', hours: 0 },
      { day: 'Sat', hours: 0 },
      { day: 'Sun', hours: 0 },
    ];

    events.forEach((event: any) => {
      const dayIndex = event.day_of_week === 0 ? 6 : event.day_of_week - 1;
      if (dayIndex >= 0 && dayIndex < 7) {
        // Calculate duration in hours
        const start = event.start_time.split(':');
        const end = event.end_time.split(':');
        const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
        const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
        const duration = (endMinutes - startMinutes) / 60;
        weeklyData[dayIndex].hours += duration;
      }
    });

    // Calculate events by schedule type
    const typeCount: { [key: string]: number } = {};
    schedules?.forEach((schedule: any) => {
      typeCount[schedule.type] = (typeCount[schedule.type] || 0) + 1;
    });

    const typeData = Object.entries(typeCount).map(([name, value]) => {
      const colors: { [key: string]: string } = {
        school: '#2E7D32',
        work: '#E65100',
        personal: '#7B1FA2',
        event: '#1565C0',
      };
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: colors[name] || '#8D6E63',
      };
    });

    // Calculate average hours per week
    const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
    const avgHoursPerWeek = Math.round(totalHours);

    // Find busiest day
    const busiestDay = weeklyData.reduce((max, day) =>
      day.hours > max.hours ? day : max
    , weeklyData[0]);

    // Calculate free time (assuming 100 hours available per week)
    const freeTime = Math.max(0, 100 - totalHours);

    return NextResponse.json({
      analytics: {
        totalEvents,
        totalSchedules,
        avgHoursPerWeek,
        busiestDay: busiestDay.day,
        busiestDayHours: Math.round(busiestDay.hours),
        freeTime: Math.round(freeTime),
        weeklyData: weeklyData.map(d => ({ ...d, hours: Math.round(d.hours * 10) / 10 })),
        typeData,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
