import {createBrowserRouter, Outlet} from "react-router-dom";
import {lazy, Suspense} from "react";
import BaseLayout from "../layouts/BaseLayout"; // BaseLayout 임포트
import memberRouter from "./memberRouter";
import productRouter from "./productRouter";
import cartRouter from "./cartRouter";
import paymentRouter from "./paymentRouter";
import GoogleMapsPage from "../pages/map/GoogleMapsPage";
import ThemePage from "../pages/theme/ThemePage";
import sidebarRouter from "./sidebarRouter.tsx";
import OrderRouter from "./orderRouter.tsx";


const LoadingPage = lazy(() => import("../pages/LoadingPage"));
const PickupPage = lazy(() => import("../pages/pickup/PickupPage"));
const MapPage = lazy(() => import("../components/luggage/luggage.tsx"));
const DestinationPage = lazy(() => import("../pages/destination/DestinationPage"));
const MainPage = lazy(() => import("../pages/MainPage"));

const Loading = <LoadingPage/>;

const mainRouter = createBrowserRouter([
    {
        // 최상위 경로에 BaseLayout을 공통 레이아웃으로 추가
        element: (
            <BaseLayout>
                <Outlet/> {/* 자식 컴포넌트를 여기에 렌더링 */}
            </BaseLayout>
        ),
        children: [

            {
                path: "/main",
                element: <Suspense fallback={Loading}><MainPage/></Suspense>
            },
            {
                path: "/luggage",
                element: <Suspense fallback={Loading}><MapPage/></Suspense>
            },
            {
                path: "/pickup",
                element: <Suspense fallback={Loading}><PickupPage/></Suspense>
            },
            {
                path: "/maps",
                element: <Suspense fallback={Loading}><GoogleMapsPage/></Suspense>
            },

            {
                path: "/destination",
                element: <Suspense fallback={Loading}><DestinationPage/></Suspense>
            },
            productRouter,
            memberRouter,
            cartRouter,
            paymentRouter,
            sidebarRouter,
            OrderRouter
        ],
    },

    {
        path: "/",
        element: <Suspense fallback={Loading}><DestinationPage/></Suspense>
    },
    {
        path: "/theme",
        element: <Suspense fallback={Loading}><ThemePage/></Suspense>
    },
]);

export default mainRouter;