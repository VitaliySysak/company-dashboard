import React from 'react';
import { cn } from '@/src/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';
import { UserCard } from './user-card';
import { User } from '@/@types/user';

interface Props {
  className?: string;
  users: User[];
}

export const UsersGroupList: React.FC<Props> = ({ className, users }) => {
  const [page, setPage] = React.useState(1);
  const pageSize = 9;

  const start = (page - 1) * pageSize;
  const paginatedUsers = users.slice(start, start + pageSize);
  const pageCount = Math.ceil(users.length / pageSize);

  return (
    <div>
      <div className={cn('grid grid-cols-1 sm:grid-cols-3 gap-[25px] lg:gap-[50px]')}>
        {paginatedUsers.map((user) => (
          <UserCard {...user} className="mt-12" />
        ))}
      </div>
      <Pagination className="my-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((prev) => Math.max(prev - 1, 1));
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
                  setPage(i + 1);
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
                setPage((prev) => Math.min(prev + 1, pageCount));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
