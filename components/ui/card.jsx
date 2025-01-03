import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }) => {
  return (
    <div
      className={cn("border-b p-4", className)}
      {...props}
    />
  );
};

export const CardTitle = ({ className, ...props }) => {
  return (
    <h2
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
};

export const CardContent = ({ className, ...props }) => {
  return (
    <div
      className={cn("p-4", className)}
      {...props}
    />
  );
};
