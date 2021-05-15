
import * as React from "react";
import { WINNING_SYMBOL } from "../config";

function Legend(): React.ReactElement {
  return <div className="legend">
    <b>Legend</b>
    <div className="bg-user">User's pick</div>
    <div className="bg-monty">Monty's pick</div>
    <div>{WINNING_SYMBOL} Correct answer</div>
  </div>;
}

export default Legend;
