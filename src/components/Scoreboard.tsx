
import * as React from "react";
import { Stats } from "../types";

function Scoreboard({ wins, losses }: Stats): React.ReactElement {
  return <div className="scoreboard">
    <b>Scoreboard</b>
    <div>{wins}/{wins+losses} (wins/total)</div>
    <div>{(100*wins / (wins+losses)).toFixed(2)}% success rate</div>
  </div>;
}

export default Scoreboard;
