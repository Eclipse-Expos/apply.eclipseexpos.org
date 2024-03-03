import { useEffect, useState } from "react";

export default function useAwaited<T>(
  promise: Promise<T>,
  dependencies = [],
): T | null {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    promise.then((result) => {
      setValue(result);
    });
  }, dependencies);

  return value;
}
