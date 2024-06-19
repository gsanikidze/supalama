import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import WorkflowBuilder from "./screens/WorkflowBuilder";
import { useLayoutEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { appConfig, ollama } from '@/store'
import Chat from "./screens/Chat";
import MainLayout from "./components/MainLayout";
import ConditionalView from "./components/ConditionalView";
import OllamaHealthCheck from "./screens/OllamaHealthCheck";
import useOllama from "./hooks/useOllama";

export default function Router() {
  const conf = useSelector(appConfig.select)
  const { isInitialized, isServerRunning } = useSelector(ollama.select)
  const { init, subscribeOnStatus } = useOllama()

  const routes = useMemo(() => createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <ConditionalView
              conditions={[isServerRunning]}
              isLoading={!isInitialized}
              fallback={<Navigate to="/ollama-health-check" />}
            >
              <Outlet />
            </ConditionalView>
          ),
          children: [
            {
              path: '/',
              element: <Home />,
            },
            {
              path: '/build-workflow',
              element: <WorkflowBuilder />,
            },
            {
              path: '/chat',
              element: <Chat />,
            },
          ]
        },
        {
          path: "/ollama-health-check",
          element: (
            <OllamaHealthCheck />
          ),
        }
      ]
    }
  ]), [isInitialized, isServerRunning])

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(conf.theme);
  }, [conf.theme])

  useLayoutEffect(() => {
    init()
  }, [init])

  useLayoutEffect(() => subscribeOnStatus(), [subscribeOnStatus])

  return (
    <RouterProvider router={routes} />
  )
}