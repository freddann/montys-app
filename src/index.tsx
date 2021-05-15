import * as React from "react";
import { render } from "react-dom";
import { NUM_BOXES } from "./config";
import { generateSequence, range, getRandomElement } from "./utils";

function App() {
  const [counter, setCounter] = React.useState(0);
  const [delay, setDelay] = React.useState(200);
  const boxRange = React.useMemo(() => range(NUM_BOXES), [range, NUM_BOXES]);
  const winningIndex = React.useMemo(() => getRandomElement(boxRange), [counter, boxRange]);
  const sequence = React.useMemo(() => generateSequence(winningIndex, boxRange), [counter, boxRange]);
  return (
    <div>
      <div>Winning index: {winningIndex}</div>
      {sequence.map(event => <div key={event.name}>{event.name}<span>{event.index}</span></div>)}
      <button onClick={() => setCounter(v => v+1)}>Retry</button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
