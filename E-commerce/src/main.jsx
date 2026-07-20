import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./Store/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  CardInfo,
  Home,
  Signup,
  Login,
  Allcart,
  OrderInfo,
  Collection,
  About,
  Contactus,
  AllOrders,
  AdminLogin,
  AuthRoutes,
  ProtectedRoutes,
  AdminDashboard,
  UserDashboard
} from "./export.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<UserDashboard />} />

      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/product/:id" element={<CardInfo />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/cart" element={<Allcart />} />
        <Route path="/order" element={<AllOrders />} />
        <Route path="/orderinfo" element={<OrderInfo />} />
      </Route>

      <Route element={<ProtectedRoutes isAdmin={true} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>,
  ),
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>,
);
