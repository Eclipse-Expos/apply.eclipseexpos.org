"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type InputProps = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  type?: "text" | "email" | "password";
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
};

export default function Input(props: InputProps) {
  const [value, setValue] = useState(props.defaultValue || "");

  return (
    <div className={cn("group relative", props.className)}>
      <input
        type={props.type}
        disabled={props.disabled}
        className="peer w-full rounded-none border-2 border-white bg-black p-3 font-sans font-light text-white outline-none transition-all duration-200 ease-out placeholder:opacity-50 focus:border-white disabled:opacity-50"
        maxLength={props.maxLength}
        onChange={(e) =>
          props.onChange &&
          (setValue(e.target.value), props.onChange(e.target.value))
        }
        required={props.required}
        spellCheck={true}
      />

      <span
        className={cn(
          "font-display pointer-events-none absolute left-0 top-2 z-20 mx-2 my-2 px-2 text-sm font-light tracking-wider text-white transition-all duration-200 ease-in-out before:absolute before:left-0 before:top-1/2 before:z-[-1] before:h-1 before:w-full before:-translate-y-[1px] before:bg-black before:transition-colors before:duration-300 before:ease-out before:content-[''] peer-focus:-top-[1.2rem] peer-focus:left-1 peer-focus:mx-2 peer-focus:px-2 peer-focus:text-sm",
          value && // Keep the label up if there's a value
            "left-1 top-[-1.2rem] mx-2 px-2 text-sm",
        )}
      >
        {props.placeholder}
      </span>
    </div>
  );
}
