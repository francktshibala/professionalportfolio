import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva(
  'font-bold tracking-tight text-foreground',
  {
    variants: {
      size: {
        h1: 'text-4xl lg:text-6xl leading-tight lg:leading-tight',
        h2: 'text-3xl lg:text-5xl leading-tight lg:leading-tight',
        h3: 'text-2xl lg:text-4xl leading-snug lg:leading-snug',
        h4: 'text-xl lg:text-3xl leading-snug lg:leading-snug',
        h5: 'text-lg lg:text-2xl leading-normal lg:leading-normal',
        h6: 'text-base lg:text-xl leading-normal lg:leading-normal',
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
        sm: 'text-sm leading-relaxed',
        base: 'text-base leading-relaxed',
        lg: 'text-lg leading-relaxed',
        xl: 'text-xl leading-relaxed',
        '2xl': 'text-2xl leading-relaxed',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: 'text-foreground',
        muted: 'text-secondary-700 dark:text-secondary-300',
        subtle: 'text-secondary-600 dark:text-secondary-400',
        accent: 'text-accent-600 dark:text-accent-400',
        primary: 'text-primary-600 dark:text-primary-400',
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

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  className?: string;
  children: React.ReactNode;
}

export function Typography({ variant = 'body', className = '', children }: TypographyProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'h1':
        return 'text-4xl lg:text-6xl font-bold tracking-tight leading-tight lg:leading-tight';
      case 'h2':
        return 'text-3xl lg:text-5xl font-bold tracking-tight leading-tight lg:leading-tight';
      case 'h3':
        return 'text-2xl lg:text-4xl font-bold tracking-tight leading-snug lg:leading-snug';
      case 'h4':
        return 'text-xl lg:text-3xl font-bold tracking-tight leading-snug lg:leading-snug';
      case 'h5':
        return 'text-lg lg:text-2xl font-bold tracking-tight leading-normal lg:leading-normal';
      case 'h6':
        return 'text-base lg:text-xl font-bold tracking-tight leading-normal lg:leading-normal';
      case 'body':
        return 'text-base leading-relaxed';
      case 'small':
        return 'text-sm leading-relaxed';
      case 'caption':
        return 'text-xs leading-relaxed text-gray-600 dark:text-gray-400';
      default:
        return 'text-base leading-relaxed';
    }
  };

  const variantClasses = getVariantClasses();
  const combinedClasses = `${variantClasses} ${className}`.trim();

  switch (variant) {
    case 'h1':
      return <h1 className={combinedClasses}>{children}</h1>;
    case 'h2':
      return <h2 className={combinedClasses}>{children}</h2>;
    case 'h3':
      return <h3 className={combinedClasses}>{children}</h3>;
    case 'h4':
      return <h4 className={combinedClasses}>{children}</h4>;
    case 'h5':
      return <h5 className={combinedClasses}>{children}</h5>;
    case 'h6':
      return <h6 className={combinedClasses}>{children}</h6>;
    case 'small':
      return <small className={combinedClasses}>{children}</small>;
    case 'caption':
      return <span className={combinedClasses}>{children}</span>;
    default:
      return <p className={combinedClasses}>{children}</p>;
  }
}

export { Heading, Text };