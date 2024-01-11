import { useState, useEffect, useMemo } from 'react';

const breakpoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1440,
};

export type BreakPointSizes = keyof typeof breakpoints;

const sizeOrder: BreakPointSizes[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const useMedia = () => {
  const [screenWidth, setScreenWidth] = useState(-1);

  useEffect(() => {
    const handleResize = () => {
      const currentWindowWidth = window.innerWidth;
      setScreenWidth(currentWindowWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return useMemo(() => {
    let currentSize: BreakPointSizes = 'xl';

    for (const size of sizeOrder) {
      if (screenWidth < breakpoints[size]) {
        currentSize = size;
        break;
      }
    }
    return {
      breakpoint: currentSize,
      width: screenWidth,
    };
  }, [screenWidth]);
};

export default useMedia;
