import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import WorkflowBuilder from "./screens/WorkflowBuilder";
import { useLayoutEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { appConfig } from '@/store'

export default function Router() {
  const conf = useSelector(appConfig.select)

  const routes = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/build-workflow',
      element: <WorkflowBuilder />,
    },
  ]), [])

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(conf.theme);
  }, [conf.theme])

  return (
    <RouterProvider router={routes} />
  )
}