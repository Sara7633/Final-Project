import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './features/product/ProductsList';
import OrderList from './features/order/OrderList';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Home from './components/Home';
import OkOrder from './features/order/OkOrder';
import ProductsManager from './features/product/ProductsManager';
import ManagerUsers from './features/manager/ManagerUsers';
import OrdersManager from './features/order/OrdersManager';
import Conclude from './features/users/Conclude';

function App() {
  return (
    <>
     <Routes path='/' element={<Home/>}>
          <Route index element={<Home/>} />
          <Route path='/user/products' element={<ProductsList />} />
          <Route path='/user/orders' element={<OrderList/>} />
          <Route path='/user/contact' element={<h1>contact</h1>} />
          <Route path='/user/okorder' element={<OkOrder />} />
          <Route path='/manager/products' element={<ProductsManager />} />
          
          <Route path='/manager/orders' element={<OrdersManager/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/user' element={<ProductsList />} />
          <Route path='/manager' element={<ProductsManager />} />

          <Route path='/manager/users' element={<ManagerUsers/>} />
          <Route path='/manager/conclude' element={<Conclude/>} />
      </Routes>
    </>
  );
}

export default App;
