import React from 'react';
import { DevConfigProvider, useDevConfig } from './context/DevConfigContext';
import LoginLanding from './components/auth/LoginLanding';
import PostLoginDashboard from './components/dashboard/PostLoginDashboard';

function MainAppContent() {
  const { currentUser } = useDevConfig();

  // If user is logged in (via Google SSO, Mobile OTP, or Dev Quick Preset), show Dashboard.
  // Otherwise show the Landing & Login page.
  return currentUser ? <PostLoginDashboard /> : <LoginLanding />;
}

export default function App() {
  return (
    <DevConfigProvider>
      <MainAppContent />
    </DevConfigProvider>
  );
}
