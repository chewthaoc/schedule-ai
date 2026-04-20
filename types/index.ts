export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export type ScheduleType = 'school' | 'work' | 'event' | 'personal';

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  subscription_tier: SubscriptionTier;
  notification_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: ScheduleType;
  color: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  schedule_id: string;
  title: string;
  description?: string;
  location?: string;
  start_time: string;
  end_time: string;
  day_of_week?: number;
  recurrence: RecurrenceType;
  color: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduleWithEvents extends Schedule {
  events: Event[];
}

export interface EventStats {
  total: number;
  thisWeek: number;
  thisMonth: number;
  byType: Record<string, number>;
  byDay: Record<string, number>;
}
