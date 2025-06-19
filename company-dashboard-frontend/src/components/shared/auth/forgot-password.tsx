import React from 'react';
import { cn } from '@/src/lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../ui/form-input';
import { Button } from '../../ui/button';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswordSchema, TForgotPasswordValues } from '@/src/schemas/auth-schemas';
import toast from 'react-hot-toast';
import { resetUserPassword } from '@/src/lib/auth';

interface Props {
  className?: string;
}

export const ForgotPassword: React.FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm<TForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TForgotPasswordValues) => {
    try {
      const { confirmPassword, ...authData } = data;
      setIsLoading(true);
      await resetUserPassword(authData);
      navigate('/');
    } catch (error) {
      toast.error('Server error, try again', { icon: '❌' });
      console.error('Error while execution onSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn('flex w-full justify-center', className)}>
      <div className={cn('w-[clamp(20rem,_30vw,_30rem)] text-center ', className)}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <FormInput name="email" label="E-mail" />
            <FormInput name="password" label="Password" type="password" />
            <FormInput name="confirmPassword" label="Confirm Password" type="password" />

            {/* Button */}
            <Button className="w-full my-8 rounded-lg text-lg" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={100} className="animate-spin" /> &nbsp; Loading...
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
