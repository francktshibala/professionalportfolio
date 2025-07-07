import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva(
  'font-bold tracking-tight text-foreground',
  {
    variants: {
      size: {
        h1: 'text-4xl lg:text-5xl',
        h2: 'text-3xl lg:text-4xl',
        h3: 'text-2xl lg:text-3xl',
        h4: 'text-xl lg:text-2xl',
        h5: 'text-lg lg:text-xl',
        h6: 'text-base lg:text-lg',
      },
    },
    defaultVariants: {
      size: 'h1',
    },
  }
);

const textVariants = cva(
  'text-foreground',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: 'text-foreground',
        muted: 'text-secondary-600 dark:text-secondary-400',
        accent: 'text-accent-600 dark:text-accent-400',
      },
    },
    defaultVariants: {
      size: 'base',
      weight: 'normal',
      color: 'default',
    },
  }
);

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as = 'h1', ...props }, ref) => {
    const Component = as;
    return (
      <Component
        className={headingVariants({ size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, color, as = 'p', ...props }, ref) => {
    const Component = as;
    return (
      <Component
        className={textVariants({ size, weight, color, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Heading, Text };