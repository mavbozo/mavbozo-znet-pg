"use client";

import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

export const toggleMachine = createMachine(
  {
    id: "Toggle",
    initial: "Off",
    states: {
      On: {
        on: {
          Toggle: {
            target: "Off",
          },
        },
      },
      Off: {
        on: {
          Toggle: {
            target: "On",
          },
        },
      },
    },
    schema: { events: {} as { type: "Toggle" } },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {},
    services: {},
    guards: {},
    delays: {},
  }
);

function Toggle() {
  const [current, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send("Toggle")}>
      {current.matches("Off") ? "Off" : "On"}
    </button>
  );
}

export default Toggle;
