import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip } from 'chart.js';
import type { ChapterDailyResult } from '../logic/chapterSimulation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

type Props = {
  data: ChapterDailyResult[];
};

export function StatsChart({ data }: Props) {
  const labels = data.map((result) => result.day.toString());
  const atkData = data.map((result) => result.stats.atk);
  const defData = data.map((result) => result.stats.def);
  const hpData = data.map((result) => result.stats.hp);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'HP',
        data: hpData,
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'ATK',
        data: atkData,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'DEF',
        data: defData,
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}