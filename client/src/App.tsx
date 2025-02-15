import Header from "./components/Header";
import SystemInformationCard from "./components/SystemInformationCard";

function App() {
  return (
    <>
      <Header />
      <main className="h-full p-4">
        <SystemInformationCard />
      </main>
    </>
  );
}

export default App;
