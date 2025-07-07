import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg bg-white dark:bg-secondary-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
  {
    variants: {
      variant: {
        default: 'border border-secondary-200 dark:border-secondary-700 hover:border-primary-200 dark:hover:border-primary-700',
        elevated: 'shadow-md hover:shadow-2xl',
        outlined: 'border-2 border-secondary-300 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-600',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        className={cardVariants({ variant, padding, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 ${className || ''}`}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`${className || ''}`}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center pt-6 ${className || ''}`}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };