import clsx from 'clsx';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

type AccordionItemProps = {
  children: ReactNode;
  title: string;
  expanded?: boolean;
};
export const Accordion = (props: AccordionItemProps) => {
  const { children, title, expanded: defaultExpanded } = props;

  const [expanded, setExpanded] = useState<boolean>(defaultExpanded || false);

  useEffect(() => {
    if (typeof defaultExpanded === 'boolean') {
      setExpanded(defaultExpanded);
    }
  }, [defaultExpanded]);

  const toggle = useCallback(() => {
    setExpanded((expand) => !expand);
  }, []);

  return (
    <>
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-expanded={expanded}
          onClick={toggle}
        >
          <span>{title}</span>
          <svg
            data-accordion-icon
            className={clsx('w-6 h-6 shrink-0', expanded ? 'rotate-180' : '')}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        className={clsx('pt-5', expanded ? '' : 'hidden')}
        aria-hidden={!expanded}
      >
        {children}
      </div>
    </>
  );
};

export default Accordion;
