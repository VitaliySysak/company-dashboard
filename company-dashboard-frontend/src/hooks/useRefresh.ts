import React from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../lib/auth';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export const useRefresh = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: auth } = useQuery<{ accessToken: string; role: string }>({
    queryKey: ['auth'],
    enabled: false,
    queryFn: async () => {
      throw new Error('queryFn should never be called');
    },
  });

  React.useEffect(() => {
    const init = async () => {
      if (!auth?.accessToken) {
        try {
          const { accessToken, role } = await refreshToken();
          queryClient.setQueryData(['auth'], { accessToken, role });
        } catch (err) {
          navigate('/sign-in');
        }
      }
    };

    init();
  }, [auth?.accessToken, queryClient, navigate]);

  return {
    accessToken: auth?.accessToken,
    role: auth?.role,
  };
};
