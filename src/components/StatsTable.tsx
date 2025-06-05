// src/components/StatsTable.tsx

import type { SimulationResult } from '../logic/chapterSimulation';

type Props = {
  data: SimulationResult[];
};

export function StatsTable({ data }: Props) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1em' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Day</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Event / Combat</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Stats (ATK / DEF / HP)</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ day, event, combat, stats }) => (
          <tr key={day}>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{day}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{event || combat}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>
              {`${stats.atk} / ${stats.def} / ${stats.hp}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}