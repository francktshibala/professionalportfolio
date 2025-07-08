import { ReactNode } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  className?: string;
  children: ReactNode;
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