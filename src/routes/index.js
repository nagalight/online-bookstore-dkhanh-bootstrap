import React from "react";

export const routes = [
    {
        path: "*",
        component: React.lazy(() => import("../pages/NotFoundPage")),
    },
    {
        path: "/",
        component: React.lazy(() => import("../pages/HomePage/index")),
    },
    {
        path: "/home",
        component: React.lazy(() => import("../pages/HomePage/index")),
    },
    {
        path: "/404",
        component: React.lazy(() => import("../pages/NotFoundPage")),
    },
    {
        path: "/inconstruction",
        component: React.lazy(() => import("../pages/InconstructionPage")),
    },
]