// src/components/StatsTable.tsx

import { useState } from 'react';
import React from 'react';
import type { ChapterDailyResult } from '../logic/chapterSimulation';

type Props = {
  data: ChapterDailyResult[];
};

export function StatsTable({ data }: Props) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleExpand = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

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
        {data.map(({ day, event, combat, stats, delta, status, combatLog }) => (
          <React.Fragment key={day}>
            <tr>
              <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>
                {combatLog && (
                  <button onClick={() => toggleExpand(day)}>
                    {expandedDay === day ? '−' : '+'}
                  </button>
                )}{' '}
                {day}
              </td>
              <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>
                {event ? event : combat ? 'Combat' : ''}
              </td>
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
                  color: status === 'win' ? 'green' : status === 'lose' ? 'red' : '#555',
                  fontWeight: 'bold',
                }}
              >
                {status}
              </td>
            </tr>
            {expandedDay === day && combatLog && (
              <tr>
                <td colSpan={9} style={{ padding: '0.5em', background: '#f9f9f9' }}>
                  <p><strong>Enemy:</strong> {combat}</p>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Turn</th>
                        <th>Attacker</th>
                        <th>Enemy HP</th>
                        <th>Δ Enemy HP</th>
                        <th>Player HP</th>
                        <th>Δ Player HP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {combatLog.map((turn, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{turn.attacker}</td>
                          <td>{turn.enemyStats.hp}</td>
                          <td>{turn.enemyDelta.hp}</td>
                          <td>{turn.playerStats.hp}</td>
                          <td>{turn.playerDelta.hp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}