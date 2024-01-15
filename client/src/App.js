import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import "./App.css"
import "./Style/Authstyle.css"
import Register from './pages/Auth/Register';
import Login from './pages/Auth/login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import CreateCatagory from './pages/Admin/CreateCatagory';
import CreateProduct from './pages/Admin/CreateProduct';

import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Cartpage from './pages/Cartpage'
import AdminOrders from './pages/Admin/AdminOrders';
function App(){  
  return (
    <>
    <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/product/:slug' element={<ProductDetails/>} />
    <Route path='/categories' element={<Categories/>} />
    <Route path='/cart' element={<Cartpage/>} />

    <Route path='/category/:slug' element={<CategoryProduct/>} />


    <Route path='/search' element={<Search/>} />
    <Route path='/dashboard' element={<PrivateRoute/>} >
    <Route path='user' element={<Dashboard/>} />
    <Route path='user/orders' element={<Orders/>} />
    <Route path='user/profile' element={<Profile/>} />
 </Route>
 <Route path='/dashboard' element={<AdminRoute/>} >
    <Route path='admin' element={<AdminDashboard/>} />
    <Route path='admin/create-category' element={<CreateCatagory/>} />
    <Route path='admin/create-product' element={<CreateProduct/>} />
    <Route path='admin/product/:slug' element={<UpdateProduct/>} />
    <Route path='admin/products' element={<Products/>} />
 
    <Route path='admin/orders' element={<AdminOrders/>} />

 </Route>
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/forgot-password' element={<ForgotPassword/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/policy' element={<Policy/>} />
    <Route path='*' element={<PageNotFound/>} />
    </Routes> 
    </>
  );
}
export default App;
