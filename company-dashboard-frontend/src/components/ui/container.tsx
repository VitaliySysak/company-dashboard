import { cn } from '@/src/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div
      className={cn('w-full px-2 md:mx-auto sm:px-4 md:max-w-[800px] lg:max-w-[980px] xl:max-w-[1280px]', className)}
    >
      {children}
    </div>
  );
};
