// import { getUserSession } from 'lib/session-helpers';
import React, { ReactNode } from 'react';

type AdminLayout = {
  children: ReactNode;
};
const AdminLayout = async (props: AdminLayout) => {
  // await getUserSession();

  return <>{props.children}</>;
};

export default AdminLayout;
