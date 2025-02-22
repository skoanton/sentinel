import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-5 h-full items-center justify-center">
      <p className="font-bold text-2xl">Template made by skoanton</p>
      <Button>Click me</Button>
    </div>
  );
}
