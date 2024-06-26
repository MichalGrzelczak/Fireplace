import { FaSpinner } from "react-icons/fa";

import { Button, ButtonProps } from "@/components/ui/button";

export default function ButtonLoading({
  children,
  isLoading,
  type,
  variant,
  size,
  className,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  type: "submit" | "button";
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={isLoading}
      className={className}
    >
      {isLoading && (
        <FaSpinner
          width={18}
          className="mr-space-2 h-size-16 w-size-16 animate-spin"
        />
      )}
      {children}
    </Button>
  );
}
