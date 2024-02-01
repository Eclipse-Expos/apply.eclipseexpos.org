import { cn } from "@/utils/cn";

interface ButtonProps {
  children: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Button component
 * @param children - The text inside the button
 * @param className - The class name of the button
 * @param onClick - The function to run when the button is clicked
 * @returns JSX.Element
 */
export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(
        "border-2 border-primary bg-primary px-2 py-3 text-sm tracking-wider text-slate-900 outline-2 outline-primary duration-300 ease-in-out hover:border-primary hover:bg-background hover:text-primary hover:outline-primary disabled:opacity-50",
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
