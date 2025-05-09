
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import StaffLoginForm from '@/components/auth/StaffLoginForm';

const StaffLogin = () => {
  return (
    <AuthLayout 
      title="Staff Login" 
      subtitle="Sign in to access the staff portal"
      type="staff"
    >
      <StaffLoginForm />
    </AuthLayout>
  );
};

export default StaffLogin;
