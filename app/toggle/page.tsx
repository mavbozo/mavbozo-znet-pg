"use client";

import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

export const toggleMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2UoBswDoDyAdgMRobYDaADALqKgAOqsAlgC7OoF0gAeiAjAFYAzDkrjxADkkA2AOwAWScIVyANCACeiSfxz8ZhuTIXCAnHLOD+AXxsbSWXHgBmLkuidVaSEIxbsnNx8CPyqYhKUZpQKMgBMFsKSGtqhljiGhmZm-MLGcpRyknYOntj4xAAWAIaYLgAKAE5wsN7c-mwcXL4h5nE4wjLZcZSCOYaCCoIpAumZBblKVoUKJSCO5dUAVtWNRM3Y1bBgTS1tvh2B3aAhcTKiBcJ3poKCurkzCCMKYsrmo6ZJIIhsV7OsyrhtrsiDU6qdYK0aO0mJ0gj1EABaBRmDJxJSPSzGaRmT5xSRyAbCKmKUaCORxO7COxggioCBwbgbMDIgJdYKYiy4-GUPIWGSSElaTGCHDZOUi4T8fiWIYyNZcio81HXXiIO56OSCcRCOIFXSDT4SnCG43WET8BIyWxgjWuFxaq78hAYvSZeSTeTxOn06ZShBWHBxI2UIR-cVTVYuiE4KGND189GhSYDQ0OuRK8WDfik8mU6kKWn0u7MmxAA */
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

      ajar: {
        on: {
          releasePress: "On",
          halfPress: "Off",
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
