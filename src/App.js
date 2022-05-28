import "./App.css";
import { AlertProvider } from "./contexts/AlertContext";
import { DailyProvider } from "./contexts/DailyActivityContext";
import { GoalProvider } from "./contexts/GoalContext";
import Home from "./pages/Home";
import AlertComponent from "./components/AlertComponent";

function App() {
  return (
    <AlertProvider>
      <GoalProvider>
        <DailyProvider>
          <AlertComponent />
          <Home />
        </DailyProvider>
      </GoalProvider>
    </AlertProvider>
  );
}

export default App;
