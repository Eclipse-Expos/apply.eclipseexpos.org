import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface MainWrapperProps {
  className?: string;
  children: ReactNode;
}

export default function MainWrapper(props: MainWrapperProps): JSX.Element {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center p-24",
        props.className,
      )}
    >
      {props.children}
    </main>
  );
}
