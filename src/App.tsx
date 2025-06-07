import { useState } from 'react';
import { chapterSimulation, type ChapterDailyResult } from './logic/chapterSimulation';
import { simulateMultipleRuns, type AggregatedDay } from './logic/simulationAggregator';
import { StatsChart } from './components/StatsChart';
import { StatsTable } from './components/StatsTable';
import { AggregatedTable } from './components/AggregatedTable';
import { CHAPTERS_CONFIG } from './config/chaptersConfig';

const SIMULATION_CONFIG = CHAPTERS_CONFIG[1];

function App() {
  const [numRuns, setNumRuns] = useState(1);
  const [simulationData, setSimulationData] = useState<ChapterDailyResult[] | AggregatedDay[] | null>(null);

  const handleSimulate = () => {
    if (numRuns === 1) {
      const result = chapterSimulation(SIMULATION_CONFIG);
      setSimulationData(result);
    } else {
      const aggregated = simulateMultipleRuns(numRuns, SIMULATION_CONFIG);
      setSimulationData(aggregated);
    }
  };

  return (
    <div style={{ padding: '2em', maxWidth: 600, margin: 'auto' }}>
      <h1>Capybara Go – Chapter Simulation</h1>

      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="runs">Number of simulations: </label>
        <input
          id="runs"
          type="number"
          min="1"
          value={numRuns}
          onChange={(e) => setNumRuns(parseInt(e.target.value))}
          style={{ width: '4em', marginRight: '1em' }}
        />
        <button onClick={handleSimulate}>Simulate</button>
      </div>

      {simulationData && (
        <>
          {numRuns === 1 ? (
            <>
              <StatsTable data={simulationData as ChapterDailyResult[]} />
              <StatsChart data={simulationData as ChapterDailyResult[]} />
            </>
          ) : (
            <AggregatedTable aggregatedDays={simulationData as AggregatedDay[]} />
          )}
        </>
      )}
    </div>
  );
}

export default App;