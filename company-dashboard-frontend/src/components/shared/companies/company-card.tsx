import React from 'react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { Company } from '@/@types/company';

interface Props extends Company {
  className?: string;
}

export const CompanyCard: React.FC<Props> = ({
  id,
  name,
  service,
  details,
  capital,
  logoUrl,
  createdAt,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <Link to={`company/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img
            className="w-[212px] h-auto object-contain"
            width={0}
            height={0}
            sizes="100vw"
            src={logoUrl ? logoUrl : '/images/logo.png'}
            alt={name}
          />
        </div>

        {/* <Title text={name} size="sm" className="mb-1 mt-3 font-bold px-4 sm:px-0" /> */}
        <p className="text-sm text-gray-400 px-4 sm:px-0"></p>

        <span className="text-[20px]">{service}</span>
        <div className="flex justify-between items-center mt-4 px-4 sm:px-0">
          <span className="text-[20px]">{name}</span>
          <span className="text-[20px]">
            capital <b>${capital}</b>
          </span>
        </div>
      </Link>
    </div>
  );
};
