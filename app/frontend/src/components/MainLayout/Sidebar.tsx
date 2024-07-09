import {
  BotMessageSquare,
  Drill,
  HeartPulse,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import ThemeToggler from "./ThemeToggler";
import { useDispatch, useSelector } from "react-redux";
import { appConfig } from "@/store";
import { Button } from "../ui/button";
import useSidebar from "./useSidebar";

type Props = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function Sidebar({ className = "", ...props }: Props) {
  const dispatch = useDispatch();
  const { chats } = useSidebar();
  const { isSidebarOpen } = useSelector(appConfig.select);

  if (!isSidebarOpen) {
    return (
      <Button
        size="icon"
        variant="secondary"
        onClick={() => dispatch(appConfig.actions.openSidebar())}
        className="fixed bottom-4 left-4 z-10"
      >
        <PanelLeftOpen size={18} />
      </Button>
    );
  }

  return (
    <nav {...props} className={`relative bg-card border-r ${className}`}>
      <div className="flex justify-center py-2 border-b sticky top-0">
        <Logo />
      </div>
      <div
        className="p-4 flex flex-col gap-4 overflow-y-auto"
        style={{
          height: "calc(100% - 94px)",
        }}
      >
        <NavItem
          route="/"
          icon={<BotMessageSquare size={18} />}
          subItems={chats}
        >
          New Chat
        </NavItem>
        <NavItem route="/build-workflow" icon={<Drill size={18} />}>
          Build Workflow
        </NavItem>
        <NavItem route="/ollama-health-check" icon={<HeartPulse size={18} />}>
          Ollama Health
        </NavItem>
      </div>
      <div className="border-t px-4 py-3 flex justify-between items-center">
        <ThemeToggler />
        <PanelLeftClose
          onClick={() => dispatch(appConfig.actions.closeSidebar())}
          size={18}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
}
