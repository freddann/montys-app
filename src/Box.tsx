import * as React from "react";
import { WINNING_SYMBOL } from "./config";
import { Box } from "./types";

const classNames = (list: any[]): string => list.filter(v => !!v).join(" ");

function Box({ pickedBy, isWinning }: Box & { isWinning: boolean }): React.ReactElement {
  return <div className={classNames(["box", pickedBy])}>
    <div className="box-result">{isWinning && WINNING_SYMBOL}</div>
    <div className={classNames(["door", pickedBy && "open"])} />
  </div>;
}

export default Box;
