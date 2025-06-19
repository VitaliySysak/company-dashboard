import React from 'react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { User } from '@/@types/user';
import { Button } from '../../ui/button';

interface Props extends User {
  className?: string;
}

export const UserCard: React.FC<Props> = ({ id, fullName, email, avatarUrl, className }) => {
  return (
    <div className={cn(className)}>
      <Link to={`user/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img
            className="w-[212px] h-auto object-contain"
            width={0}
            height={0}
            sizes="100vw"
            src={avatarUrl ? avatarUrl : 'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png'}
            alt={fullName}
          />
        </div>
        <p className="text-sm text-gray-400 px-4 sm:px-0"></p>

        <div className="flex justify-between items-center mt-4 px-4 sm:px-0">
          <span className="text-[20px]">{fullName}</span>

          <b>{email}</b>
        </div>
      </Link>
    </div>
  );
};
