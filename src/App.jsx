import AllRoutes from './AllRoutes';
import './App.css';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
      <Navbar />
      <AllRoutes /> 
      <Footer />
    </>
  );
}

export default App;
