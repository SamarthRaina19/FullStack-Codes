import Dashboard from "./components/Dashboard";
import { lazy, Suspense } from "react";
const Dash = lazy(() => import("./components/Dashboard"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><h1>Loading Dashboard...</h1></div>}>
        <h1>Lazy Loading in React</h1>
        <Dash />
      </Suspense>
    </div>
  );
}
import React from "react";

export default App;
