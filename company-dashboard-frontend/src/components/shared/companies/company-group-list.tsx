import React from 'react';
import { cn } from '@/src/lib/utils';
import { CompanyCard } from './company-card';
import { Company } from '@/@types/company';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';

interface Props {
  className?: string;
  companies: Company[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const CompanyGroupList: React.FC<Props> = ({
  className,
  companies,
  page,
  pageSize,
  totalCount,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <div>
      <div className={cn('grid grid-cols-1 sm:grid-cols-3 gap-[25px] lg:gap-[50px]')}>
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} className="mt-12" />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.max(page - 1, 1));
              }}
            />
          </PaginationItem>

          {[...Array(pageCount)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.min(page + 1, pageCount));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
