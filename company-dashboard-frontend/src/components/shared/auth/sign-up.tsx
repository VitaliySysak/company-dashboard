import React from 'react';
import { cn } from '@/src/lib/utils';
import { AuthForm } from './auth-form';

interface Props {
  className?: string;
}

export const SignUp: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('flex w-full justify-center', className)}>
      <AuthForm type="sign-up" />
    </section>
  );
};
