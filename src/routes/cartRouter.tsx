import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>
const Cart = lazy(() => import("../pages/cart/CartPage"))


const cartRouter = {

    path: "/cart",
    children: [

        {
            path: "list",
            element: <Suspense fallback={Loading}><Cart/></Suspense>
        },
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        }

    ]

};

export default cartRouter
