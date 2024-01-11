import Image from 'next/image';
import React from 'react';
import { LoginActions } from './LoginActions';

const LoginPage = () => {
  const logo = '/assets/images/womensBoardLogo.png';

  return (
    <div className="font-roboto">
      <div className="bg-secondary_color h-[45vh] relative w-full z-[-3] " />
      <div className="flex flex-col items-center  mt-[-80px] rounded-[5px] p-[30px] mx-auto bg-[#f9f9f9] shadow-[1px_1px_10px_1px_rgba(0,0,0,0.2)] z-[3] w-[300px] md:w-[400px] lg:w-[500px] xl:w-[500px] ">
        <Image
          src={logo}
          alt="logo"
          width={80}
          height={80}
          className="mb-[30px] mx-auto"
        />

        <LoginActions />
      </div>
    </div>
  );
};

export default LoginPage;
