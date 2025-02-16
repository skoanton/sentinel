import { Link } from "react-router";
import MenuLink from "./MenuLink";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  return (
    <header className="flex flex-col gap-5 bg-secondary text-primary p-10">
      <h1 className="text-3xl font-bold">Sentinel</h1>
      <MenuLink path="/" title="Dashboard" />
      <MenuLink path="/roomba" title="Roomba" />
      <MenuLink path="/contact" title="Contact" />
    </header>
  );
}
