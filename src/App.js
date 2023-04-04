import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Gallery from './component/Gallery';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Gallery/>}/>
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
