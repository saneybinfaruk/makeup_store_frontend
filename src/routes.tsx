import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import SignUpPage from "./pages/SignUpPage";
import ProductDetails from "./pages/ProductDetailsPage";
import ProductCartPage from "./pages/ProductCartPage";
import FavoriteProductsPage from "./pages/FavoriteProductsPage";
import MyProfilePage from "./pages/MyProfilePage";
import AccountMain from "./component/profile/AccountMain";
import AllOrders from "./component/profile/AllOrders";
import AddressBook from "./component/profile/AddressBook";
import CheckOutPage from "./pages/CheckOutPage";
import ProtectedRoute from "./component/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ProductsPage />,
      },
      {
        path: "/signUp",

        element: (
          <ProtectedRoute
            component={SignUpPage}
            redirectedTo="/"
            reverse={true}
          />
        ),
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/cartPage",
        element: <ProductCartPage />,
      },
      {
        path: "/favoriteProducts",
        element: <FavoriteProductsPage />,
      },
      // {
      //   path: "/payment",
      //   element: <Payment />,
      // },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute component={CheckOutPage} redirectedTo="/signUp" />
        ),
      },
      {
        path: "/me",
        element: (
          <ProtectedRoute component={MyProfilePage} redirectedTo="/signUp" />
        ),
        children: [
          {
            index: true,
            element: <AccountMain />,
          },
          {
            path: "orders",
            element: <AllOrders />,
          },
          {
            path: "address",
            element: <AddressBook />,
          },
        ],
      },
    ],
  },
]);

export default router;
