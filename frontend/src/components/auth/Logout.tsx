import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/Context/AuthProvider';

interface Props {
  className?: string;
}

const Logout: React.FC<Props> = ({ className }) => {
  const { logout } = useAuth();
  return (
    <Button divClassName={`${className} ml-auto`} onClick={logout}>Logout</Button>
  );
}

export default Logout;