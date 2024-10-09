"use client";
import { Logo } from "@/components/logo";
import { Home, Package, List } from "lucide-react";
import NavItem from "./nav-items";

const Sidebar = () => {
  const items = [
    {
      label: "Dashboard",
      icon: <Home className="h-4 w-4 mr-2" />,
      href: "/admin/dashboard",
    },
    {
      label: "All Products",
      icon: <Package className="h-4 w-4 mr-2" />,
      href: "/admin/products",
    },
    {
      label: "Order List",
      icon: <List className="h-4 w-4 mr-2" />,
      href: "/admin/orders",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 bg-white h-full flex flex-col p-4">
      <Logo />
      <div className="space-y-2">
        {items.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
