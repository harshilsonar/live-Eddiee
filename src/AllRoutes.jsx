import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Topseller from './pages/Topseller';
import Shopmen from './pages/Shopmen';
import Shopwomen from './pages/Shopwomen';
import Jackets from './pages/Jackets';
import Dresses from './pages/Dresses';
import Tshirts from './pages/Tshirts';
import Swim from './pages/Swim';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';

function AllRoutes() {
  return (
    <Routes>
 <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />      <Route path="/topseller/" element={<Topseller/>} />
      <Route path="/shopmen/" element={<Shopmen/>} />
      <Route path="/shopwomen/" element={<Shopwomen/>} />
      <Route path="/jacket/" element={<Jackets/>} />
      <Route path="/dresses/" element={<Dresses/>} />
      <Route path="/tshirts/" element={<Tshirts/>} />
      <Route path="/swim/" element={<Swim/>} />
      <Route path="/product/:type/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  );
}

export default AllRoutes;