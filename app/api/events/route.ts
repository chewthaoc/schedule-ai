import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scheduleId = searchParams.get('scheduleId');

    if (!scheduleId) {
      return NextResponse.json(
        { error: 'Schedule ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('schedule_id', scheduleId)
      .order('start_time', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ events: data });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      scheduleId,
      title,
      description,
      location,
      startTime,
      endTime,
      dayOfWeek,
      recurrence,
      color,
      category,
    } = body;

    if (!scheduleId || !title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          schedule_id: scheduleId,
          title,
          description,
          location,
          start_time: startTime,
          end_time: endTime,
          day_of_week: dayOfWeek,
          recurrence: recurrence || 'none',
          color: color || '#8D6E63',
          category,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ event: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
