import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        new: "border-transparent bg-warning text-warning-foreground",
        "ai-responding": "border-transparent bg-primary text-primary-foreground",
        "waiting-client": "border-transparent bg-warning/80 text-warning-foreground",
        complex: "border-transparent bg-destructive text-destructive-foreground",
        urgent: "border-transparent bg-destructive text-destructive-foreground",
        waiting: "border-transparent bg-muted text-muted-foreground",
        resolved: "border-transparent bg-success text-success-foreground",
        high: "border-transparent bg-destructive/20 text-destructive",
        medium: "border-transparent bg-warning/20 text-warning",
        low: "border-transparent bg-muted text-muted-foreground",
        done: "border-transparent bg-success/20 text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
