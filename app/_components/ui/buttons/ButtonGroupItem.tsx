import React, { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
	href?: string;
  rounding?: 'left' | 'right' | 'both' | 'none';
}

const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  ({ title, icon, href, rounding = 'none', ...props }, ref) => {
    // Determine the class for rounding based on the props
    const roundingClass = {
      left: 'rounded-l-full',
      right: 'rounded-r-full',
      both: 'rounded-full',
      none: '',
    }[rounding];

		const baseClass =
		`relative inline-flex items-center ${roundingClass} bg-green-600 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white hover:bg-green-700 focus:z-10`;

		if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
        >
          {icon && <span className="mr-2 text-sm">{icon}</span>}
          {title}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={baseClass}
        {...props}
      >
        {icon && <span className="mr-2 text-sm">{icon}</span>}
        {title}
      </button>
    );
  }
);

ButtonGroupItem.displayName = 'ButtonGroupItem';

export default ButtonGroupItem;