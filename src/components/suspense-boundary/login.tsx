'use client';

import React, { Suspense } from 'react';

const Login = React.lazy(() => import('../../app/login/LoginActions'));

const SuspendedLogin = () => (
  <Suspense fallback="Loaing">
    <Login />
  </Suspense>
);

export default SuspendedLogin;
