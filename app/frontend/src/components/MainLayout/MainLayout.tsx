import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { appConfig } from "@/store";
import classNames from "classnames";
import { Suspense } from "react";

export default function MainLayout() {
  const { isSidebarOpen } = useSelector(appConfig.select)

  return (
    <div className={classNames(
      'relative w-full h-full',
      {
        'grid grid-cols-12': isSidebarOpen,
      }
    )}>
      <div className={classNames({
        'col-span-3 h-full': isSidebarOpen
      })}>
        <Sidebar className="h-screen sticky top-0" />
      </div>
      <div className="col-span-9">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
