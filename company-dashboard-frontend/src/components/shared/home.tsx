import React from 'react';
import { cn } from '@/src/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { getUserCompanies } from '@/src/lib/companies';
import { Company, CompanyResponse, GetCompaniesDto } from '@/@types/company';
import { useRefresh } from '@/src/hooks/useRefresh';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { CompanyGroupList } from './companies/company-group-list';
import { Title } from '../ui/title';
import { DoughnutChart } from './doughnut-chart';
import { AnimatedCounter } from './animated-counter';
import { CompanyFilters } from './companies/company-filters';

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  const { accessToken } = useRefresh();

  const [filters, setFilters] = React.useState<GetCompaniesDto>({ sortOrder: 'asc' });

  const [page, setPage] = React.useState(1);
  const pageSize = 9;

  const {
    data = { companies: [], totalCount: 0 },
    isLoading,
    isError,
  } = useQuery<CompanyResponse>({
    queryKey: ['companies', filters, page],
    queryFn: () =>
      getUserCompanies(accessToken!, {
        ...filters,
        skip: (page - 1) * pageSize,
        limit: pageSize,
      }),
    enabled: !!accessToken,
  });

  const totalAmount = data.companies.reduce((acc, { capital }) => acc + capital, 0);

  const onFilterChange = (newFilters: GetCompaniesDto) => {
    setPage(1);
    setFilters(newFilters);
  };

  return (
    <section className={cn('', className)}>
      <Container className="mt-16">
        <div className="flex justify-evenly items-center">
          <DoughnutChart companies={data.companies} className="w-[300px] h-[300px]" />
          <AnimatedCounter amount={totalAmount} />
        </div>
        <div className="flex justify-between">
          <Title text="All Companies" className="font-extrabold mb-6 text-[36px]" />
          <Button className="mt-4">
            <Link to={'/new-company'}>Create Company</Link>
          </Button>
        </div>

        <CompanyFilters onSubmit={onFilterChange} defaultValues={filters} />

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading companies</p>}
        {!data.companies.length && <h2>No Companies</h2>}
        <CompanyGroupList
          companies={data.companies}
          totalCount={data.totalCount}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </Container>
    </section>
  );
};
