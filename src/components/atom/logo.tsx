import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paths, logo } from 'config/paths';

type LogoProp = {
  isAdmin: boolean;
};

const Logo = ({ isAdmin }: LogoProp) => {
  return (
    <Link href={isAdmin ? paths.adminHome : paths.home}>
      <div className="relative xl:w-[195px] w-[110px] lg:ml-0 ml-[16px] xl:h-[60px] h-[34px]">
        <Image src={logo} alt="logo" fill />
      </div>
    </Link>
  );
};

export default Logo;
