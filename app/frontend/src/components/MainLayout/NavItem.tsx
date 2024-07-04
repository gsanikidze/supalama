import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Button
} from "@/components/ui/button"
import { ReactNode, useState } from "react";
import { ChevronsDownUp } from "lucide-react";

interface Props {
  children: string;
  route: string;
  icon: ReactNode;
  subItems?: { title: string; route: string }[];
}

export default function NavItem({ icon, route, children, subItems = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="flex gap-2 justify-between select-none">
        <Link to={route} className="flex items-center gap-2 hover:text-primary">
          <div>{icon}</div>
          <p className="text-sm">{children}</p>
        </Link>
        {
          subItems.length > 0 && (
            <CollapsibleTrigger asChild>
              <ChevronsDownUp size={16} className="hover:text-primary cursor-pointer" />
            </CollapsibleTrigger>
          )
        }
      </div>

      <CollapsibleContent>
        <div className="ml-7 mt-2 py-4 border-y flex flex-col gap-2 text-sm">
          {
            subItems.map((i) => (
              <Link to={i.route} className="hover:text-primary">{i.title}</Link>
            ))
          }
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
