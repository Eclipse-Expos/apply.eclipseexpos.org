"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";

type InputType = "text" | "email" | "password";
type InputProps = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  type?: InputType;
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
        className="peer w-full rounded-none border-2 border-primary bg-background p-3 font-sans font-light text-primary outline-none transition-all duration-200 ease-out placeholder:opacity-50 focus:border-primary disabled:opacity-50"
        type={props.type}
        disabled={props.disabled}
        maxLength={props.maxLength}
        required={props.required}
        spellCheck={true}
        value={value}
        onChange={(e) => {
          const targetValue: string = e.target.value;

          props.onChange?.(targetValue);

          setValue(targetValue);
        }}
      />

      <span
        className={cn(
          "font-display pointer-events-none absolute left-0 top-2 z-20 mx-2 my-2 px-2 text-sm font-light tracking-wider text-primary transition-all duration-200 ease-in-out before:absolute before:left-0 before:top-1/2 before:z-[-1] before:h-2 before:w-full before:-translate-y-[1px] before:bg-background before:transition-colors before:duration-300 before:ease-out before:content-[''] peer-focus:-top-[1.2rem] peer-focus:left-1 peer-focus:mx-2 peer-focus:px-2 peer-focus:text-sm",
          value && // Keep the label up if there's a value
            "left-1 top-[-1.2rem] mx-2 px-2 text-sm",
        )}
      >
        {props.placeholder}
      </span>
    </div>
  );
}
