import { DetailedHTMLProps, HTMLAttributes } from "react";

const Tag = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  return (
    <div
      {...props}
      className="p-1 text-sm overflow-hidden select-none inline-flex items-center rounded max-h-size-16 shrink-0 bg-background-neutral font-bold"
    ></div>
  );
};

export { Tag };
