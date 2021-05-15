import * as React from "react";

function NumberControl({ value, onChange, label }: { value: number, label: string, onChange: (value: number) => void }): React.ReactElement {
  return <div>
    <div>{label}</div>
    <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} />
  </div>;
}

export default NumberControl;
