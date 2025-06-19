import { GetCompaniesDto } from '@/@types/company';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';

interface Props {
  onSubmit: (data: GetCompaniesDto) => void;
  defaultValues?: Partial<GetCompaniesDto>;
}

export const CompanyFilters: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit } = useForm<GetCompaniesDto>({
    defaultValues: {
      sortOrder: 'asc',
      sortBy: 'name',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block">
            <span className="block font-medium mb-1">Sort By</span>
            <select {...register('sortBy')} className="w-full border rounded px-2 py-1">
              <option value="name">Company Name</option>
              <option value="service">Service</option>
            </select>
          </label>

          <label className="block">
            <span className="block font-medium mb-1">Sort Order</span>
            <select {...register('sortOrder')} className="w-full border rounded px-2 py-1">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className="block font-medium mb-1">Capital Min</span>
            <input type="number" {...register('capitalMin')} className="w-full border rounded px-2 py-1" />
          </label>

          <label className="block">
            <span className="block font-medium mb-1">Capital Max</span>
            <input type="number" {...register('capitalMax')} className="w-full border rounded px-2 py-1" />
          </label>
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className="block font-medium mb-1">Created From</span>
            <input type="date" {...register('createdAtFrom')} className="w-full border rounded px-2 py-1" />
          </label>

          <label className="block">
            <span className="block font-medium mb-1">Created To</span>
            <input type="date" {...register('createdAtTo')} className="w-full border rounded px-2 py-1" />
          </label>
        </div>
      </div>

      <Button className="mt-4">Apply Filters</Button>
    </form>
  );
};
