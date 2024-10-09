import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  icon: JSX.Element;
}
const NavItem = ({ href, label, icon }: NavItemProps) => {
  return (
    <Button asChild size="lg" variant="ghost" className="w-full justify-start">
      <Link href={href} className="flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </Link>
    </Button>
  );
};

export default NavItem;
