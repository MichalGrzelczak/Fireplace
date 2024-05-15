import React from "react";

const Tag = React.forwardRef<HTMLDivElement, any>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`p-1 text-sm overflow-hidden select-none inline-flex items-center rounded max-h-size-16 shrink-0 bg-background-neutral font-bold ${className}`}
      ></div>
    );
  },
);

Tag.displayName = "Tag";

export { Tag };
