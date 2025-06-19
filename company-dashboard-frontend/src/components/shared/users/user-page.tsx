import React from 'react';
import { cn } from '@/src/lib/utils';
import { Link, useParams } from 'react-router-dom';
import { useRefresh } from '@/src/hooks/useRefresh';
import { useQuery } from '@tanstack/react-query';
import { Company } from '@/@types/company';
import { getUserCompany } from '@/src/lib/companies';
import { Container } from '../../ui/container';
import { deleteUser, getUser } from '@/src/lib/users';
import { User, UserRole } from '@/@types/user';
import { Title } from '../../ui/title';
import { Button } from '../../ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Props {
  className?: string;
}

export const UserPage: React.FC<Props> = ({ className }) => {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useRefresh();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => getUser(id!, accessToken!),
    enabled: !!accessToken && !!id,
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error loading user</h3>;
  if (!user) return <h3>No user</h3>;

  const onDelete = async (role: UserRole) => {
    try {
      await deleteUser(String(id), accessToken!, role);
      toast.success('User deleted successfully', { icon: '✅' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === 'You do not have right permission') {
          toast.error('You do not have right permission', { icon: '❌' });
        }
      } else {
        toast.error('Server Error, try again', { icon: '❌' });
      }
    }
  };
  return (
    <section className={cn('', className)}>
      <Container>
        <div className="flex">
          <img
            className="flex-1"
            src={
              user.avatarUrl ? user.avatarUrl : 'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png'
            }
            alt={user.fullName}
          />
          <div className="flex-1">
            <Title text={user.fullName} className="font-extrabold mb-6 text-[36px]" />
            <p>Email: {user.email}</p>
            <h2>Role: {user.role}</h2>
            <p>Created At: {user.createdAt}</p>
            <Link to="/admin-dashboard">
              <Button onClick={() => onDelete(user.role)} className="mt-8" variant={'destructive'}>
                Delete User
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
