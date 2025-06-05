import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

type Props = {
    data: number[];
}

export function GoldChart({ data}: Props) {
    const labels = data.map((_, i) => `Day ${i+1}`);

    return (
        <Line
            data = {{
                labels,
                datasets: [
                    {label: 'Accumulated Gold',
                    data,
                    borderColor: 'gold',
                    tension: 0.2
                }
                ]
            }}
            options={{
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Gold Accumulation Over Time'
                    },
                    legend: {
                        display: true
                    }
                }
            }}
        />
    );
}