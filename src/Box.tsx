import * as React from "react";
import { Box } from "./types";

function Box({ pickedBy, isWinning }: Box & { isWinning: boolean }): React.ReactElement {
  return <div style={{ height: 100, width: 100 }}>
    <div>{pickedBy}</div>
    <div>{isWinning}</div>
  </div>;
}

export default Box;
