import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuth";
import routes from "./routes";
import axios from "axios";
import Default from "./layouts/Default";
import CheckAccessToken from "./pages/CheckAccessToken";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import config from "./config";
import themes from "./themes";
import CreateForm from "./pages/CreateForm";
import EditForm from "./pages/EditForm";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import Feedbacks from "./pages/Feedbacks";
import Users from "./pages/Users";

function IsAuth() {
    const { auth } = useUserAuth();
    return auth ? <Outlet /> : <Navigate to={routes.checkAccessToken} />;
}

function App() {

    const toastOptions = {
        position: "top-right",
        duration: 4000,
        style: {
            borderRadius: 0,
            boxShadow: "none",
            backgroundColor: themes.light,
        },
        error: {
            iconTheme: {
                primary: themes.tertiary
            }
        },
        success: {
            iconTheme: {
                primary: themes.secondary
            }
        }
    };

    const { accessToken } = useUserAuth();
    const sessionStorageAccessToken = sessionStorage.getItem("access_token");

    axios.defaults.headers.common["Authorization"] = "Bearer " + (accessToken ? accessToken : sessionStorageAccessToken);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.checkAccessToken} element={<CheckAccessToken />} />
                <Route element={<IsAuth />}>
                    <Route element={<Default />}>
                        <Route path={routes.dashboard} element={<Dashboard />} />
                        <Route path={routes.userProfile} element={<UserProfile />} />
                        <Route path={routes.cart} element={<Cart />} />
                        <Route path={routes.customers}>
                            <Route index={true} element={<Customers />} />
                            <Route path={routes.edit} element={<EditForm config={config.customers} />} />
                            <Route path={routes.create} element={<CreateForm config={config.customers} />} />
                        </Route>
                        <Route path={routes.products}>
                            <Route index={true} element={<Products />} />
                            <Route path={routes.edit} element={<EditForm config={config.products} />} />
                            <Route path={routes.create} element={<CreateForm config={config.products} />} />
                        </Route>
                        <Route path={routes.categories}>
                            <Route index={true} element={<Categories />} />
                            <Route path={routes.edit} element={<EditForm config={config.categories} />} />
                            <Route path={routes.create} element={<CreateForm config={config.categories} />} />
                        </Route>
                        <Route path={routes.orderDetails} element={<OrderDetails config={config.orders} />} />
                        <Route path={routes.orders}>
                            <Route index={true} element={<Orders />} />
                            <Route path={routes.edit} element={<EditForm config={config.orders} />} />
                            <Route path={routes.create} element={<Navigate to={routes.cart} />} />
                        </Route>
                        <Route path={routes.feedbacks}>
                            <Route index={true} element={<Feedbacks />} />
                            <Route path={routes.edit} element={<EditForm config={config.feedbacks} />} />
                            <Route path={routes.create} element={<Navigate to={routes.home} />} />
                        </Route>
                        <Route path={routes.users}>
                            <Route index={true} element={<Users />} />
                            <Route path={routes.edit} element={<EditForm config={config.users} />} />
                            <Route path={routes.create} element={<CreateForm config={config.users} />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
            <Toaster toastOptions={toastOptions} />
        </BrowserRouter>
    );
}

export default App;
