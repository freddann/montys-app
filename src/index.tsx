import * as React from "react";
import { render } from "react-dom";
import Box from "./Box";
import Scoreboard from "./Scoreboard";
import { NUM_BOXES } from "./config";
import { asAnimatedBoxes, useStats } from "./state";
import { generateSequence, range, getRandomElement } from "./utils";

function App() {
  const stats = useStats();
  const [counter, setCounter] = React.useState(0);
  const [delay, setDelay] = React.useState(500);
  const boxRange = React.useMemo(() => range(NUM_BOXES), [range, NUM_BOXES]);
  const winningIndex = React.useMemo(() => getRandomElement(boxRange), [counter, boxRange]);
  const { sequence, userFinalPick } = React.useMemo(() => generateSequence(winningIndex, boxRange), [counter, boxRange]);
  const boxes = asAnimatedBoxes(sequence, boxRange, delay);
  React.useEffect(() => {
    stats.addResult(userFinalPick === winningIndex);
  }, [sequence]);

  return (
    <div>
      <div>Winning index: {winningIndex}</div>
      <Scoreboard {...stats} />
      <div style={{ display: "flex" }}>
        {boxes.map(box => <Box key={box.index} index={box.index} isWinning={box.index === winningIndex} pickedBy={box.pickedBy} />)}
      </div>
      <button onClick={() => setCounter(v => v+1)}>Retry</button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
