import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import AdminLayout from '../Layout/AdminLayout'
import Categoryes from '../admin/manage_category/Categoryes'
import AddCategory from '../admin/manage_category/AddCategory'
import UpdateCategory from '../admin/manage_category/UpdateCategory'
import AddProduct from '../admin/manage_products/AddProduct'
import UpdateProduct from '../admin/manage_products/UpdateProduct'
import Users from '../admin/manage_users/Users'
import DashboardSide from '../components/DashboardSide'
import ProductManage from '../admin/manage_products/ProductManage'
import NotFound from '../NotFound/NoteFound'
import Header2 from '../Layout/userLayout/header2'
import Test from '../test/Test'
import Likes from '../admin/manage_likes/Likes'
import Questions from '../admin/manage_questions/Questions'
import Discount from '../admin/manage_discount/Discount'
import AddDiscount from '../admin/manage_discount/AddDiscount'
import UpdateDiscount from '../admin/manage_discount/UpdateDiscount'
import CartManage from '../admin/manage_cart/CartManage'
const AdminRoutes = () => {

  return (
        <AdminLayout>
        <Routes>
        {/* categores routes  */}
        <Route path='/categores' element={<Categoryes/>} />
        <Route path='/create_category' element={<AddCategory/>} />
        <Route path='/update_category/:id' element={<UpdateCategory/>} />
        {/* categores routes  */}

        {/* products routes  */}
        <Route path='/create_product' element={<AddProduct/>} />
        <Route path='/products/manage' element={<ProductManage/>} />
        <Route path='/Update_product/:id' element={<UpdateProduct/>} />
        {/* products routes  */}


        {/* users rutes  */}
        <Route path='/users' element={<Users/>} />
        <Route path='/test' element={<Test/>} />
        {/* users rutes  */}

        {/* not found routes  */}
        <Route path='/*' element={<NotFound/>} />
        {/* not found routes  */}


        {/* Favorit route  */}
        <Route path='/likes' element={<Likes/>} />
        {/* Favorit route  */}


        {/* Questions route  */}
        <Route path='/questions' element={<Questions/>} />
        {/* Questions route  */}

        {/* dicount route  */}
        <Route path='/discount' element={<Discount/>} />
        <Route path='/create_discount' element={<AddDiscount/>} />
        <Route path='/update_discount/:id' element={<UpdateDiscount/>} />
        {/* dicount route  */}

        {/* cart route  */}
        <Route path='/cart' element={<CartManage/>} />
        {/* cart route  */}


        </Routes>
        </AdminLayout>
  )
}

export default AdminRoutes
