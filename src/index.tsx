import * as React from "react";
import { render } from "react-dom";
import { NUM_BOXES } from "./config";
import { generateSequence, getRandomIndex } from "./utils";

function App() {
  const [counter, setCounter] = React.useState(0);
  const winningIndex = React.useMemo(() => getRandomIndex(NUM_BOXES), [counter]);
  const sequence = React.useMemo(() => generateSequence(winningIndex), [counter]);
  return (
    <div>
      <div>Winning index: {winningIndex}</div>
      {sequence.map(event => <div key={event.name}>{event.name}<span>{event.index}</span></div>)}
      <button onClick={() => setCounter(v => v+1)}>Retry</button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
