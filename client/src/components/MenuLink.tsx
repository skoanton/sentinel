import { Link } from "react-router";

type MenuLinkProps = {
  path: string;
  title: string;
};

export default function MenuLink({ path, title }: MenuLinkProps) {
  return (
    <>
      <Link to={path}>
        <p className="text-xl font-semibold uppercase hover:bg-primary hover:text-secondary p-2 rounded">
          {title}
        </p>
      </Link>
    </>
  );
}
