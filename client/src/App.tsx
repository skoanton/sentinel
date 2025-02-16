import RoombaList from "./components/RoombaList";
import SystemInformationCard from "./components/SystemInformationCard";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SystemInformationCard />
      <RoombaList />
      <WeatherCard />
    </div>
  );
}

export default App;
