/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Dashboard,
  ListCatalog,
  AddCatalog,
  EditCatalog,
  ListProduct,
  AddProduct,
  EditProduct,
  ListOrder,
} from "./views";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/catalog",
    name: "Catalog",
    icon: "nc-icon nc-layout-11",
    component: ListCatalog,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/catalog/create",
    name: "Add Catalog",
    component: AddCatalog,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/catalog/edit/:id",
    name: "Edit Catalog",
    component: EditCatalog,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/product",
    name: "Product",
    icon: "nc-icon nc-cart-simple",
    component: ListProduct,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/product/create",
    name: "Add Product",
    component: AddProduct,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/product/edit/:id",
    name: "Edit Product",
    component: EditProduct,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/order",
    name: "Order",
    icon: "nc-icon nc-bag-16",
    component: ListOrder,
    layout: "/admin",
    sidebar: true,
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  //   sidebar: true,
  // },
];
export default routes;
