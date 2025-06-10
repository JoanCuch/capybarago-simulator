import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  BarController,
  LineController
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import type { AggregatedDay } from '../logic/simulationAggregator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  BarController,
  LineController
);

type Props = {
  aggregatedDays: AggregatedDay[];
};

export function AggregatedChart({ aggregatedDays }: Props) {
  const labels = aggregatedDays.map((d) => `Day ${d.day}`);

  const reachLineData = {
    labels,
    datasets: [
      {
        label: 'Reached Count',
        data: aggregatedDays.map((d) => d.reachCount),
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        tension: 0.2,
      },
    ],
  };

  const mixedChartData = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Avg ATK',
        data: aggregatedDays.map((d) => d.avgStats.atk),
        borderColor: 'red',
        fill: false,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Avg DEF',
        data: aggregatedDays.map((d) => d.avgStats.def),
        borderColor: 'green',
        fill: false,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Avg HP',
        data: aggregatedDays.map((d) => d.avgStats.hp),
        borderColor: 'orange',
        fill: false,
        yAxisID: 'y',
      },
      {
        type: 'bar' as const,
        label: '% Events',
        data: aggregatedDays.map((d) => d.eventPercentage),
        backgroundColor: 'purple',
        yAxisID: 'y1',
      },
      {
        type: 'bar' as const,
        label: '% Combats',
        data: aggregatedDays.map((d) => d.combatPercentage),
        backgroundColor: 'gray',
        yAxisID: 'y1',
      },
    ],
  };

  const mixedChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Average Stats',
        },
      },
      y1: {
        type: 'linear' as const,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: '% Events / Combats',
        },
      },
    },
  };

  return (
    <div style={{ marginTop: '2em' }}>
      <h3>Reached per Day</h3>
      <Line data={reachLineData} />

      <h3>Stats and Event/Combat per Day</h3>
      <Chart type='bar' data={mixedChartData} options={mixedChartOptions} />
    </div>
  );
}