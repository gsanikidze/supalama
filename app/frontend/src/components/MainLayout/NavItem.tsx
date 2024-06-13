import { Link } from "react-router-dom";

interface Props {
  children: string;
  route: string;
  icon: React.ReactNode;
}

export default function NavItem({ icon, route, children }: Props) {
  return (
    <Link to={route} className="flex items-center gap-2">
      <div>{icon}</div>
      <p className="text-sm">{children}</p>
    </Link>
  )
}
