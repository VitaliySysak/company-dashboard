import { cn } from '@/src/lib/utils';
import React from 'react';
import { Container } from '../ui/container';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { UserRole } from '@/@types/user';
import { useQuery } from '@tanstack/react-query';
import { logOut } from '@/src/lib/auth';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const { data: auth } = useQuery<{ accessToken: string; role: string }>({
    queryKey: ['auth'],
    enabled: false,
    queryFn: async () => {
      throw new Error('queryFn should never be called');
    },
  });

  return (
    <header className={cn('border-b', className)}>
      <Container className="hidden sm:flex items-center justify-between py-4">
        {/*Left side */}
        <Link to={'/'}>
          <div className="flex items-center gap-4">
            <img className="w-16 h-16" src="/images/logo.png" alt="logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Company Dashboard</h1>
              <p className="text-sm text-gray-400 leading-3">can&apos;t be tastier</p>
            </div>
          </div>
        </Link>

        {/*Right side */}
        <div className="flex items-center gap-3">
          {(auth?.role === UserRole.SUPER_ADMIN || auth?.role === UserRole.ADMIN) && (
            <Button>
              <Link to="/admin-dashboard">Admin</Link>
            </Button>
          )}
          <Link to="/sign-in">
            <Button onClick={logOut}>Log out</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
};
