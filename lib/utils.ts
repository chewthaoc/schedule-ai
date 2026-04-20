import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDayOfWeek(date: string | Date): number {
  return new Date(date).getDay();
}

export function getWeekDayName(day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day] || '';
}

export function getScheduleTypeColor(type: string): string {
  const colors: Record<string, string> = {
    school: '#2E7D32',
    work: '#E65100',
    event: '#1565C0',
    personal: '#7B1FA2',
  };
  return colors[type] || '#8D6E63';
}
