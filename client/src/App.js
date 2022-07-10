import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Authentication from './Pages/Authentication/Authentication';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
