import React from 'react';

type HeadingProps = {
  children: string;
  type?: 'h1' | 'h2' | 'h3';
};

const Heading = (props: HeadingProps) => {
  const Component = props.type || 'h1';
  return <Component>{props.children}</Component>;
};

export default Heading;
