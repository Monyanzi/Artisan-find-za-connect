
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  children, 
  className,
  ...props 
}) => {
  return (
    <span
      className={cn(
        'badge',
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'badge-primary': variant === 'primary',
          'badge-secondary': variant === 'secondary',
          'badge-accent': variant === 'accent',
          'badge-outline': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
