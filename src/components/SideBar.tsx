"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", path: "/cms" },
  { name: "Content", path: "/cms/content" },
];

const SideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-screen bg-gray-900 text-white flex flex-col p-6 box-border">
      <div className="mb-8 text-center">
        <Image
          src="/logo/logo-light.png"
          alt="Logo"
          className="w-12 h-12 mb-2 mx-auto"
          height={48}
          width={48}
        />
        <h2 className="text-xl font-bold m-0">My App</h2>
      </div>
      <nav>
        <ul className="list-none p-0 m-0">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded-md text-base transition-colors ${
                  pathname === item.path
                    ? "bg-gray-800 text-blue-300 font-bold"
                    : "hover:bg-gray-800 font-normal"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
