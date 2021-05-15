import * as React from "react";
import { render } from "react-dom";
import Box from "./Box";
import Scoreboard from "./Scoreboard";
import { NUM_BOXES } from "./config";
import { asAnimatedBoxes, DEFAULT_GAME_STATE, useStats, generateGameState } from "./state";
import NumberControl from "./NumberControl";
import "./main.css";

function App() {
  const stats = useStats();
  const [counter, setCounter] = React.useState(0);
  const [delay, setDelay] = React.useState(500);
  const startSimulation = () => { setCounter(1); stats.reset(); };
  const endSimulation = () => setCounter(iterations+1);

  const [iterations, setIterations] = React.useState(10);
  const isRunning = counter > 0 && counter <= iterations;

  const { boxRange, sequence, userFinalPick, winningIndex } = React.useMemo(() => isRunning ? generateGameState(NUM_BOXES) : DEFAULT_GAME_STATE, [isRunning, counter, NUM_BOXES]);
  const boxes = asAnimatedBoxes(sequence, boxRange, delay);
  React.useEffect(() => {
    if (!isRunning) return;
    const timerId = window.setTimeout(() => {
      stats.addResult(userFinalPick === winningIndex);
      setCounter(v => v+1);
    }, delay*(NUM_BOXES+2));
    return () => window.clearTimeout(timerId);
  }, [isRunning, sequence]);

  return (
    <div className="container">
      <h1>Monty Hall Simulation</h1>
      <Scoreboard {...stats} />
      <div className="boxes">
        {boxes.map(box => <Box key={box.index} index={box.index} isWinning={box.index === winningIndex} pickedBy={box.pickedBy} />)}
      </div>
      <div className="controls">
        <NumberControl value={iterations} onChange={setIterations} label="Iterations" />
        <NumberControl value={delay} onChange={setDelay} label="Animation delay (ms)" />
        <button onClick={isRunning ? endSimulation : startSimulation}>{isRunning ? "Stop" : "Start"}</button>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
