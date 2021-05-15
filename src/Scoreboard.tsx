
import * as React from "react";
import { Stats } from "./types";

function Scoreboard({ wins, losses }: Stats): React.ReactElement {
  return <div style={{ height: 100, width: 100 }}>
    <div>{wins}/{wins+losses}</div>
    <div>{100*wins / (wins+losses)}%</div>
  </div>;
}

export default Scoreboard;
