import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Company } from '@/@types/company';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  companies: Company[];
  className?: string;
}

export const DoughnutChart: React.FC<Props> = ({ companies, className }) => {
  const payload = {
    datasets: [
      {
        label: 'Company',
        data: companies.map((company) => company.capital),
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
      },
    ],
    labels: companies.map((company) => company.name),
  };
  return (
    <div className={className}>
      <Doughnut data={payload} options={{ cutout: '60%', plugins: { legend: { display: false } } }} />
    </div>
  );
};
