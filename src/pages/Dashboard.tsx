
import React from 'react';
import Layout from '@/components/Layout';
import PersonalDashboard from '@/components/PersonalDashboard';
import NgoDashboard from '@/components/NgoDashboard';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Layout>
      {user.mode === 'personal' ? <PersonalDashboard /> : <NgoDashboard />}
    </Layout>
  );
};

export default Dashboard;
