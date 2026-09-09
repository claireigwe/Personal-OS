import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "gradient-primary text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-xl",
        outline: "border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/5 rounded-xl",
        destructive: "bg-destructive text-white hover:bg-destructive/90 rounded-xl",
        gradient: "gradient-primary text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 rounded-2xl"
      },
      size: {
        default: "h-12 px-6 text-sm rounded-xl",
        sm: "h-10 px-4 text-sm rounded-lg",
        lg: "h-14 px-8 text-base rounded-2xl",
        icon: "h-11 w-11 rounded-xl",
        pill: "h-12 px-8 rounded-full text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
