// src/App.tsx

import { chapterSimulation, type SimulationResult } from './logic/chapterSimulation';
import { StatsChart } from './components/StatsChart';
import { StatsTable } from './components/StatsTable';

const SIMULATION_CONFIG = {
  days: 10,
};

function App() {
  const simulationData: SimulationResult[] = chapterSimulation(SIMULATION_CONFIG.days);

  return (
    <div style={{ padding: '2em', maxWidth: 600, margin: 'auto' }}>
      <h1>Capybara Go – Chapter Simulation</h1>
      <StatsTable data={simulationData} />
      <StatsChart data={simulationData} />
    </div>
  );
}

export default App;