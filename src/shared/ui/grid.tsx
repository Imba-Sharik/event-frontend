import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

export function Grid({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid grid-cols-12 gap-x-6 gap-y-8", className)}
      {...props}
    />
  );
}
