import { Link, useLocation } from "@remix-run/react";
import MenuButton from "./MenuButton";
import { Disc2, User } from "lucide-react";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const location = useLocation();

  const isContacts = location.pathname.startsWith("/contacts");
  const isProjects = location.pathname.startsWith("/projects");
  const isInvoices = location.pathname.startsWith("/invoices");
  const isRoomba = location.pathname.startsWith("/roomba");

  return (
    <header className="flex flex-col gap-5 p-4 shadow-lg sticky bg-gray-800 top-0 w-72 left-0 h-full">
      <Link to={"/"}>
        <h1 className="text-3xl text-center font-extrabold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text drop-shadow-md">
          Sentinel app
        </h1>
      </Link>
      <MenuButton path="/roomba" text="Roomba" isPage={isRoomba} icon={<Disc2 />} />
      <MenuButton path="/contacts" text="Contacts" isPage={isContacts} icon={<User />} />
      <MenuButton path="/projects" text="Projects" isPage={isProjects} icon={<User />} />
      <MenuButton path="/invoices" text="Invoices" isPage={isInvoices} icon={<User />} />
    </header>
  );
}
