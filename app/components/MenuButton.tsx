import { Link } from "@remix-run/react";
type MenuButtonProps = {
  path: string;
  text: string;
  isPage: boolean;
  icon?: JSX.Element;
};

export default function MenuButton({ path, text, isPage, icon }: MenuButtonProps) {
  return (
    <>
      <Link to={path}>
        <li
          className={`flex gap-3 items-center font-bold px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 text-white 
      ${
        isPage
          ? "bg-gradient-to-r from-blue-500 to-blue-400 shadow-blue-500/50 shadow-lg scale-105"
          : "bg-gray-800 hover:bg-gradient-to-r hover:from-gray-800 hover:to-blue-400 hover:shadow-blue-500/50 hover:shadow-lg hover:scale-105"
      }`}
        >
          <span className="text-lg">{icon}</span>
          <span className="text-lg">{text}</span>
        </li>
      </Link>
    </>
  );
}
