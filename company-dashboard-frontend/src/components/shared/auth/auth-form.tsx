import React from 'react';
import { cn } from '@/src/lib/utils';
import { Button } from '../../ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../ui/form-input';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '@/src/lib/auth';
import { loginFormSchema, registerFormSchema } from '@/src/schemas/auth-schemas';
import { AuthFormValues } from '@/@types/auth';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  className?: string;
  type: 'sign-up' | 'sign-in';
}

export const AuthForm: React.FC<Props> = ({ type, className }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(type === 'sign-up' ? registerFormSchema : loginFormSchema),
    defaultValues: {
      fullName: type === 'sign-up' ? '' : undefined,
      email: '',
      password: '',
      confirmPassword: type === 'sign-up' ? '' : undefined,
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    try {
      const { confirmPassword, ...authData } = data;
      if (type === 'sign-up') {
        setIsLoading(true);
        const { accessToken, role } = await registerUser(authData);
        queryClient.setQueryData(['auth'], {
          accessToken,
          role,
        });
      } else {
        setIsLoading(true);
        const { accessToken, role } = await loginUser(authData);
        queryClient.setQueryData(['auth'], {
          accessToken,
          role,
        });
      }
      navigate('/');
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        if (error?.response?.data?.message === 'Invalid credentials') {
          toast.error('Wrong password or email, try again', { icon: '❌' });
        } else {
          toast.error('Server error, try again', { icon: '❌' });
          console.error('Error while execution onSubmit:', error);
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn('w-[clamp(20rem,_30vw,_30rem)] text-center ', className)}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === 'sign-up' && (
            <>
              <div className="relative w-[70px] h-[70px] top-0 left-0 mx-auto my-4">
                <img src="/images/circle.svg" alt="Ellipse 30 background" className="absolute inset-0" />
                <img
                  src="/images/sm-circle.svg"
                  alt="Ellipse 29 background"
                  width={50}
                  height={50}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <img
                  src="/images/sign-up.svg"
                  alt="Login illustration"
                  width={40}
                  height={40}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <h1 className="text-2xl font-bold mb-10">Create an account</h1>
              <>
                <FormInput name="fullName" label="Full Name" />
                <FormInput name="email" label="E-mail" />
                <FormInput name="password" label="Password" type="password" />
                <FormInput name="confirmPassword" label="Confirm Password" type="password" />
              </>
            </>
          )}

          {type === 'sign-in' && (
            <>
              <div className="relative w-[70px] h-[70px] top-0 left-0 mx-auto my-4">
                <img src="/images/circle.svg" alt="Ellipse 30 background" className="absolute inset-0" />
                <img
                  src="/images/sm-circle.svg"
                  alt="Ellipse 29 background"
                  width={50}
                  height={50}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <img
                  src="/images/sign-in.svg"
                  alt="Login illustration"
                  width={40}
                  height={40}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              <h1 className="text-2xl font-bold mb-10">Log in to your Account</h1>
              <FormInput name="email" label="E-mail" />
              <FormInput name="password" label="Password" type="password" />
              <p className="text-right mt-2 w-full">
                <Link to="/forgot-password">Forgot a password?</Link>
              </p>
            </>
          )}
          {/* Button */}
          <Button className="w-full my-8 rounded-lg text-lg" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={100} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : type === 'sign-up' ? (
              'Create'
            ) : (
              'Log in'
            )}
          </Button>
          {type === 'sign-up' ? (
            <Link className="mt-6" to={'/sign-in'}>
              Already have an account? <span className="text-primary">Log in</span>
            </Link>
          ) : (
            <Link className="mt-6" to={'/sign-up'}>
              Don&apos;t have an account? <span className="text-primary">Sign up</span>
            </Link>
          )}
        </form>
      </FormProvider>
    </section>
  );
};
