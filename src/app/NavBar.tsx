'use client';

import Link from 'next/link';
import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

export default function NavBar() {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', path: '/' },
    { label: 'Issues', path: '/issues' },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <FaLaptopCode />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <Link
            key={link.label}
            className={classNames({
              'text-zinc-900': link.path === currentPath,
              'text-zinc-500': link.path !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.path}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

// 'classnames' replaced the code below to make it cleaner:
// className={`${link.path === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}

// Ctrl + K + D = select next match
