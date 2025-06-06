import { useState } from 'react';
import { chapterSimulation, type ChapterDailyResult } from './logic/chapterSimulation';
import { simulateMultipleRuns, type AggregatedDay } from './logic/simulationAggregator';
import { StatsChart } from './components/StatsChart';
import { StatsTable } from './components/StatsTable';
import { AggregatedTable } from './components/AggregatedTable';

const SIMULATION_CONFIG = {
  days: 10,
};

function App() {
  const [numRuns, setNumRuns] = useState(1);
  const [simulationData, setSimulationData] = useState<ChapterDailyResult[] | AggregatedDay[] | null>(null);

  const handleSimulate = () => {
    if (numRuns === 1) {
      const result = chapterSimulation(SIMULATION_CONFIG.days);
      setSimulationData(result);
    } else {
      const aggregated = simulateMultipleRuns(numRuns, SIMULATION_CONFIG.days);
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
            <AggregatedTable data={simulationData as AggregatedDay[]} />
          )}
        </>
      )}
    </div>
  );
}

export default App;