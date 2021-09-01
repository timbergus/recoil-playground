import logo from './logo.svg';
import './App.css';

import ImmutableForm from './components/immutable-form/immutable-form';
import { useRecoilValue } from 'recoil';
import { fullNameSelector } from './App.selectors';

function App() {
  const fullName = useRecoilValue(fullNameSelector);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ImmutableForm />
        <div>{`${fullName.name} ${fullName.surname}`}</div>
      </header>
    </div>
  );
}

export default App;
