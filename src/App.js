import "./App.css";
import { GoalProvider } from "./contexts/GoalContext";
import Home from "./pages/Home";

function App() {
  return (
    <GoalProvider>
      <Home />
    </GoalProvider>
  );
}

export default App;
