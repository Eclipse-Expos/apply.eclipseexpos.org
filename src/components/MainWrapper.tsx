import { cn } from "@/utils/cn";

interface MainWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function MainWrapper({
  className,
  children,
}: MainWrapperProps): JSX.Element {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center p-24",
        className,
      )}
    >
      {children}
    </main>
  );
}
