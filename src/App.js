import "./App.css";
import { DailyProvider } from "./contexts/DailyActivityContext";
import { GoalProvider } from "./contexts/GoalContext";
import Home from "./pages/Home";

function App() {
  return (
    <GoalProvider>
      <DailyProvider>
        <Home />
      </DailyProvider>
    </GoalProvider>
  );
}

export default App;
