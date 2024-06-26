import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { FaWandSparkles, FaX } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-space-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 drop-shadow-md text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type MultiSelectOptions = Array<{
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}>;

interface MultiSelectFormFieldProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  asChild?: boolean;
  options: MultiSelectOptions;
  defaultValue?: string[];
  disabled?: boolean;
  placeholder: string;
  className?: string;
  animation?: number;
  onValueChange: (value: string[]) => void;
}

const MultiSelectFormField = React.forwardRef<
  HTMLButtonElement,
  MultiSelectFormFieldProps
>(
  (
    {
      className,
      variant,
      asChild = false,
      options,
      defaultValue,
      onValueChange,
      disabled,
      placeholder,
      animation = 0,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      defaultValue || [],
    );
    const selectedValuesSet = React.useRef(new Set(selectedValues));
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(animation > 0);

    React.useEffect(() => {
      setSelectedValues(defaultValue || []);
      selectedValuesSet.current = new Set(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (event: any) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.target.value) {
        selectedValues.pop();
        setSelectedValues([...selectedValues]);
        selectedValuesSet.current.delete(
          selectedValues[selectedValues.length - 1],
        );
        onValueChange([...selectedValues]);
      }
    };

    const toggleOption = (value: string) => {
      if (selectedValuesSet.current.has(value)) {
        selectedValuesSet.current.delete(value);
        setSelectedValues(selectedValues.filter((v) => v !== value));
      } else {
        selectedValuesSet.current.add(value);
        setSelectedValues([...selectedValues, value]);
      }
      onValueChange(Array.from(selectedValuesSet.current));
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="min-h-size-24 h-auto w-full items-center justify-between"
          >
            {selectedValues.length > 0 ? (
              <div
                className="flex justify-between items-center w-full"
                aria-label={"Scroll for more"}
              >
                <div className="flex items-center gap-space-2 whitespace-nowrap overflow-x-auto overflow-y-hidden scroll-hide overscroll-x-contain">
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <span
                        key={value}
                        className={cn(
                          "bg-background-neutral rounded-radii-2 pl-space-1 pr-space-3 relative ",
                        )}
                      >
                        {IconComponent && (
                          <IconComponent className="h-size-12 w-size-12 mr-space-1 inline-block" />
                        )}
                        <span className={"truncate"}>{option?.label}</span>
                        <FaX
                          role={"button"}
                          aria-label={`Remove filter by ${option?.label}`}
                          className="h-size-8 w-size-8 cursor-pointer absolute right-space-1 top-1/2 -translate-y-1/2 bg-background-neutral"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <FaChevronDown className="h-size-16 cursor-pointer ml-space-2 text-fontSize-1" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span>{placeholder}</span>
                <FaChevronDown className="h-size-16 cursor-pointer ml-space-2 text-fontSize-1" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-space-0 drop-shadow-sm"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
              aria-label={"Search"}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValuesSet.current.has(
                    option.value,
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className="cursor-pointer"
                    >
                      <span
                        role="checkbox"
                        aria-checked={isSelected ? "true" : "false"}
                        className={cn(
                          "mr-space-2 flex h-size-12 w-size-12 items-center justify-center border-2 rounded-sm",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <FaCheck className="h-size-16 w-size-16 text-fontSize-1" />
                      </span>
                      {option.icon && (
                        <option.icon className="mr-space-1 h-size-16 w-size-16" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <FaWandSparkles
            className={cn(
              "cursor-pointer my-space-2 text-foreground bg-background w-size-12 h-size-12",
              isAnimating ? "" : "",
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  },
);

MultiSelectFormField.displayName = "MultiSelectFormField";

export default MultiSelectFormField;
