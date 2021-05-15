import * as React from "react";
import { render } from "react-dom";
import Box from "./Box";
import Scoreboard from "./Scoreboard";
import { NUM_BOXES } from "./config";
import { asAnimatedBoxes, DEFAULT_GAME_STATE, useStats, generateGameState } from "./state";

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
    window.setTimeout(() => {
      stats.addResult(userFinalPick === winningIndex);
      setCounter(v => v+1);

    }, delay*(NUM_BOXES+2));
  }, [isRunning, sequence]);

  return (
    <div>
      <div>Winning index: {winningIndex}</div>
      <Scoreboard {...stats} />
      <div style={{ display: "flex" }}>
        {boxes.map(box => <Box key={box.index} index={box.index} isWinning={box.index === winningIndex} pickedBy={box.pickedBy} />)}
      </div>
      <button onClick={isRunning ? endSimulation : startSimulation}>{isRunning ? "Stop" : "Start"}</button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
