import React from 'react';
import { Card, CardBody } from './Card';
import { Button } from './Button';
import { AlertCircle, XCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ title = 'Error', message, onRetry }: ErrorMessageProps) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardBody className="p-6">
        <div className="flex items-start gap-4">
          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
            <p className="text-red-700 mb-4">{message}</p>
            {onRetry && (
              <Button variant="outline" onClick={onRetry} size="sm">
                Try Again
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function ErrorPage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">☕</div>
          <h1 className="text-2xl font-bold text-[#2C1810] mb-2">Oops!</h1>
        </div>
        <ErrorMessage message={message} onRetry={onRetry} />
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F0E8] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#2C1810] mb-2">{title}</h3>
      <p className="text-[#8D6E63] mb-6 max-w-sm mx-auto">{description}</p>
      {action}
    </div>
  );
}
