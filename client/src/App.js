import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/'  />
          <Route path='/home' element={<HomePage />} />
      </Routes>
      
    </div>
  );
}

export default App;
