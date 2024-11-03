import React from 'react';
import Link from 'next/link';
import { MenuItem } from '@headlessui/react';

interface DropDownMenuItemProps {
  icon?: React.ReactNode;
  title: string;
  href?: string;
}

export const baseStyle: string = "px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"

const classString: string =
  `inline-flex gap-2 items-center w-full ${baseStyle}`;

const DropDownMenuItem = ({ icon, title, href }: DropDownMenuItemProps) => {
  return href ? (
    <MenuItem as={Link} href={href} className={classString}>
      {icon && icon} {title}
    </MenuItem>
  ) : (
    <MenuItem as="button" className={classString}>
      {icon && icon} {title}
    </MenuItem>
  );
};

export default DropDownMenuItem;
