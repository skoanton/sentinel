import Header from "@/components/Header";
import { Outlet } from "react-router";

type AppLayoutProps = {};

export default function AppLayout({}: AppLayoutProps) {
  return (
    <>
      <div className="h-screen flex gap-2">
        <Header />
        <main className="h-full p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
