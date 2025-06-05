import { useState } from 'react'
import { SIMULATION_CONFIG } from './config/simulation';
import { runSimulation } from './logic/runSimulation';
import { GoldChart } from './components/GoldChart';

function App (){
  const[goldPerDay, setGoldPerDay] = useState(SIMULATION_CONFIG.defaultGoldPerDay);
  const data = runSimulation(goldPerDay, SIMULATION_CONFIG.days);

  return (
    <div style = {{ padding: '2em', maxWidth: 600, margin: 'auto'}}>
      <h1>Gold Accumulation Simulator</h1>
      <label>Gold Per Day</label>
      <input
        type='number'
        value={goldPerDay}
        onChange={(e) => setGoldPerDay(Number(e.target.value))}
        style={{ marginLeft: '1em' }}
      />
      <GoldChart data={data}/>
    </div>
  )
}

export default App;