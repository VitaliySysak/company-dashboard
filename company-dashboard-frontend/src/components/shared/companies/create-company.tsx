import React from 'react';
import { cn } from '@/src/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { CompanyFormValues } from '@/@types/company';
import { CompanyFormSchema } from '@/src/schemas/company-schema';
import { addUserCompany } from '@/src/lib/companies';
import { useRefresh } from '@/src/hooks/useRefresh';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import { FormInput } from '../../ui/form-input';
import { Container } from '../../ui/container';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
}

export const CreateCompany: React.FC<Props> = ({ className }) => {
  const { accessToken } = useRefresh();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      name: '',
      service: '',
      details: '',
      lat: 0,
      lng: 0,
      capital: 0,
    },
  });

  const onSubmit = async (data: CompanyFormValues) => {
    try {
      setIsLoading(true);
      await addUserCompany(data, accessToken!);
      toast.success('Company created successfully!', { icon: '✅' });
      form.reset();
    } catch (error) {
      console.error('Error while execution value:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="px-16">
      <Container className="mt-16">
        <Button>
          <Link to={'/'}>Back</Link>
        </Button>
        <FormProvider {...form}>
          <form className="flex flex-col items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <header className="flex items-center justify-center mb-8">
              <div className="absolute left-1/2 transform -translate-x-1/2"></div>
            </header>
            <>
              <FormInput name="name" label="Name" />
              <FormInput name="service" label="Service" />
              <FormInput name="details" label="Details" />
              <FormInput name="lat" label="Latitude" type="number" step="any" />
              <FormInput name="lng" label="Longitude" type="number" step="any" />
              <FormInput name="capital" label="Capital" type="number" />
            </>
            <Button className="max-w-[480px] w-full my-8 rounded-lg text-lg" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={100} className="animate-spin" /> &nbsp; Loading...
                </>
              ) : (
                <span>Create!</span>
              )}
            </Button>
          </form>
        </FormProvider>
      </Container>
    </section>
  );
};
