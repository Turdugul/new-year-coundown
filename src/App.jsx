import Countdown from './Countdown';

function App() {
  return (
    <div className="container flex items-start mt-6 md:items-center justify-center h-screen">
      <div className="container flex items-center bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl sm:max-w-3xl md:max-w-2xl lg:max-w-xl xl:max-w-4xl">
        <Countdown />
      </div>
    </div>
  );
}

export default App;
