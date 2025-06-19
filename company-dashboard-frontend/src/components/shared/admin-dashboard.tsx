import React from 'react';
import { cn } from '@/src/lib/utils';
import { useRefresh } from '@/src/hooks/useRefresh';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UsersGroupList } from './users/users-group-list';
import { User } from '@/@types/user';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/src/lib/users';
import { Container } from '../ui/container';
import { Title } from '../ui/title';

interface Props {
  className?: string;
}

export const AdminDashboard: React.FC<Props> = ({ className }) => {
  const { accessToken } = useRefresh();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => getAllUsers(accessToken!),
    enabled: !!accessToken,
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error loading companies</h3>;

  return (
    <section className={cn('', className)}>
      <Container className="mt-16">
        <div className="flex justify-between">
          <Title text="All Users" className="font-extrabold mb-6 text-[36px]" />
          <Button className="mt-4">
            <Link to={'/new-company'}>Create Admin</Link>
          </Button>
        </div>
        {!data.length && <h2>No Users</h2>}
        <UsersGroupList users={data} />
      </Container>
    </section>
  );
};
