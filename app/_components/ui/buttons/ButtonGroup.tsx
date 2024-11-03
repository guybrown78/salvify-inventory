import React, { PropsWithChildren, ReactElement } from 'react'
import ButtonGroupItem from './ButtonGroupItem'

interface ButtonGroupProps extends PropsWithChildren {
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const ButtonGroup = ({ children, radius = 'full' }: ButtonGroupProps) => {
	const radiusClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }[radius];

	const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<any>, {
        className: `${child.props.className} ${radiusClass}`,
      });
    }
    return child;
  });


	return (
		<span className={`isolate inline-flex shadow-sm ${radiusClass}`}>
			{enhancedChildren}
		</span>
	)
}

export default ButtonGroup
export { ButtonGroupItem }