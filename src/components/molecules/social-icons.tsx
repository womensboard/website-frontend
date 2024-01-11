import { socials } from 'config/social-handles';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SocialIcons = () => {
  return (
    <div className="flex gap-5">
      {socials.map((handle, index) => {
        return (
          <Link
            key={index}
            href={handle.href}
            target="_blank"
            className="w-[40px] h-[40px] relative"
          >
            <Image
              src={handle.icon}
              alt="social-icon"
              fill
              className="rounded-full"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialIcons;
