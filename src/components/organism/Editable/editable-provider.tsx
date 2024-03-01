'use client';
import { usePathname } from 'next/navigation';
import React, { ReactNode, createContext, useContext } from 'react';

type EditableProviderProps = {
  children: ReactNode;
};
const EditableContext = createContext(false);

export const EditableProvider = (props: EditableProviderProps) => {
  const pathname = usePathname();
  const { children } = props;
  const showWidgets = pathname?.startsWith('/admin');

  return (
    <EditableContext.Provider value={!!showWidgets}>
      {children}
    </EditableContext.Provider>
  );
};

export const useEditable = () => {
  return useContext(EditableContext);
};
