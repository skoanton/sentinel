import SystemInformationCard from "./components/SystemInformationCard";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="flex gap-4 p-4">
      <div>
        <SystemInformationCard />
      </div>
      <div className="ml-auto">
        <WeatherCard />
      </div>
    </div>
  );
}

export default App;
