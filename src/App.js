import logo from './logo.svg';
import './App.css';
import CoinList from './components/coinList.js';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CoinList />
      </header>
    </div>
  );
}

export default App;
