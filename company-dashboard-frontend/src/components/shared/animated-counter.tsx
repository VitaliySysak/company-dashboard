import React from 'react';
import { cn } from '@/src/lib/utils';
import CountUp from 'react-countup';

interface Props {
  amount: number;
  className?: string;
}

export const AnimatedCounter: React.FC<Props> = ({ className, amount }) => {
  return (
    <p className={cn('flex-center gap-2 font-bold text-4xl', className)}>
      <CountUp decimals={2} decimal="," prefix="$" start={0} end={amount} />
    </p>
  );
};
