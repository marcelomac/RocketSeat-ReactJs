import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {App} from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


/*
import { render } from "react-dom";
import { App } from "./App";

render(<App />, document.getElementById("root"));
*/