

import type { AggregatedDay } from "../logic/simulationAggregator";
interface AggregatedTableProps {
  data: AggregatedDay[];
}

export function AggregatedTable({ data }: AggregatedTableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2em' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '0.5em' }}>Day</th>
          <th style={{ border: '1px solid black', padding: '0.5em' }}>Avg ATK</th>
          <th style={{ border: '1px solid black', padding: '0.5em' }}>Avg DEF</th>
          <th style={{ border: '1px solid black', padding: '0.5em' }}>Avg HP</th>
          <th style={{ border: '1px solid black', padding: '0.5em' }}>% Events</th>
          <th style={{ border: '1px solid black', padding: '0.5em' }}>% Combats</th>
        </tr>
      </thead>
      <tbody>
        {data.map((day) => (
          <tr key={day.day}>
            <td style={{ border: '1px solid black', padding: '0.5em' }}>{day.day}</td>
            <td style={{ border: '1px solid black', padding: '0.5em' }}>{day.avgStats.atk.toFixed(2)}</td>
            <td style={{ border: '1px solid black', padding: '0.5em' }}>{day.avgStats.def.toFixed(2)}</td>
            <td style={{ border: '1px solid black', padding: '0.5em' }}>{day.avgStats.hp.toFixed(2)}</td>
            <td style={{ border: '1px solid black', padding: '0.5em' }}>{day.eventPercentage.toFixed(1)}%</td>
            <td style={{ border: '1px solid black', padding: '0.5em' }}>{day.combatPercentage.toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}