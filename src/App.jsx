import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/gigs/Gigs";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Add from "./pages/add/Add";
import MyGigs from "./pages/myGigs/MyGigs";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const queryClient = new QueryClient();

  const { currentUser } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: currentUser ? <Orders /> : <Navigate to="/login" />,
        },
        {
          path: "/my-gigs",
          element: currentUser ? <MyGigs /> : <Navigate to="/login" />,
        },
        {
          path: "/add",
          element: currentUser ? <Add /> : <Navigate to="/login" />,
        },
        {
          path: "/messages",
          element: currentUser ? <Messages /> : <Navigate to="/login" />,
        },
        {
          path: "/message/:id",
          element: currentUser ? <Message /> : <Navigate to="/login" />,
        },
        {
          path: "/login",
          element: currentUser ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/register",
          element: currentUser ? <Navigate to="/" /> : <Register />,
        },
        {
          path: "/pay/:id",
          element: currentUser ? <Pay /> : <Navigate to="/login" />,
        },
        {
          path: "/success",
          element: currentUser ? <Success /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
