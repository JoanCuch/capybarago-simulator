// src/components/StatsTable.tsx

import type { ChapterDailyResult } from '../logic/chapterSimulation';

type Props = {
  data: ChapterDailyResult[];
};

export function StatsTable({ data }: Props) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1em' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Day</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Event / Combat</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>ATK</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>DEF</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>HP</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Δ ATK</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Δ DEF</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Δ HP</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '0.5em' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ day, event, combat, stats, delta, status }) => (
          <tr key={day}>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{day}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{event || combat}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{stats.atk}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{stats.def}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{stats.hp}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{delta?.atk ?? '-'}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{delta?.def ?? '-'}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{delta?.hp ?? '-'}</td>
            <td
              style={{
                padding: '0.5em',
                borderBottom: '1px solid #eee',
                color:
                  status === 'win' ? 'green' : status === 'lose' ? 'red' : '#555',
                fontWeight: 'bold',
              }}
            >
              {status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}