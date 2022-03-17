import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import {Home} from './components/Home';

function App() {
  return (
    <>
      <Router>
      <div className="App" style={{ backgroundImage: "url(./circle.jpg)" }}>
      
        <Routes>
          <Route exact path="/" element={<Home/>} />
          
         
        </Routes>
      </div>
    
    </Router>
    </>
  );
}

export default App;
