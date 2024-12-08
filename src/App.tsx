import React from "react";
import "./App.css";
import * as Popper from "./components/popper";
import * as Select from "./components/select";

function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Select.Root>
        <Select.Trigger>
          <button>OPEN SELECT</button>
        </Select.Trigger>
        <Select.Content>
          <div
            style={{
              background: "#333",
              color: "#fff",
              padding: "10px",
              borderRadius: "4px",
              position: "relative",
              display: "inline-block",
            }}>
            <button onClick={() => setOpen(false)}>close</button>
            <p style={{ margin: 0 }}>Popper is a tool tip</p>
          </div>
        </Select.Content>
      </Select.Root>
      <Popper.Root>
        <Popper.Anchor>
          <button onClick={() => setOpen(true)}>OPEN POPPER</button>
        </Popper.Anchor>
        {open && (
          <Popper.Content>
            <div
              style={{
                background: "#333",
                color: "#fff",
                padding: "10px",
                borderRadius: "4px",
                position: "relative",
                display: "inline-block",
              }}>
              <button onClick={() => setOpen(false)}>close</button>
              <p style={{ margin: 0 }}>Popper is a tool tip</p>
            </div>
          </Popper.Content>
        )}
      </Popper.Root>
    </>
  );
}

export default App;
