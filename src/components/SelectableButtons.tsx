import * as React from "react";
import { useState, useCallback } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoMdAdd, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { TbX } from "react-icons/tb";

type Option = string | { label: string; value: string };

interface SelectableButtonsProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onOptionsChange?: (options: Option[]) => void;
  className?: string;
  multiple?: boolean;
  addMoreLabel?: string;
  allowAddMore?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const getOptionLabel = (option: Option) =>
  typeof option === "string" ? option : option.label;

const getOptionValue = (option: Option) =>
  typeof option === "string" ? option : option.value;

const SelectableButtons: React.FC<SelectableButtonsProps> = ({
  options: initialOptions,
  selected,
  onChange,
  onOptionsChange,
  className = "",
  addMoreLabel = "Other",
  allowAddMore = false,
  placeholder = "Enter option",
  disabled = false,
}) => {
  const [internalOptions, setInternalOptions] = useState(initialOptions);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const options = onOptionsChange ? initialOptions : internalOptions;

  const removeSelected = (value: string) => {
    if (disabled) return;
    onChange(selected.filter((v) => v !== value));
  };

  const handleAddOption = useCallback(() => {
    const newOption = inputValue.trim();
    if (!newOption) return;

    if (options.some((opt) => getOptionValue(opt) === newOption)) {
      setShowInput(false);
      setInputValue("");
      return;
    }

    const updatedOptions = [...options, newOption];

    if (onOptionsChange) {
      onOptionsChange(updatedOptions);
    } else {
      setInternalOptions(updatedOptions);
    }

    onChange([...selected, newOption]);
    setInputValue("");
    setShowInput(false);
  }, [inputValue, options, selected, onChange, onOptionsChange]);

  const visibleOptions = options.filter(
    (option) => !selected.includes(getOptionValue(option))
  );

  return (
    <div className={`space-y-3 ${className}`}>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => (
            <Badge
              key={value}
              className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 cursor-pointer"
            >
              {value}
              {!disabled && (
                <button type="button" onClick={() => removeSelected(value)}>
                  <TbX />
                </button>
              )}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {!disabled &&
          visibleOptions.map((option) => {
            const value = getOptionValue(option);
            const label = getOptionLabel(option);

            return (
              <Badge
                key={value}
                onClick={() => !disabled && onChange([...selected, value])}
                variant="secondary"
                className="cursor-pointer px-2 py-1 md:px-4 md:py-2 text-sm"
              >
                {label}
              </Badge>
            );
          })}

        {/* Add more */}
        {allowAddMore && !showInput && !disabled && (
          <Badge
            onClick={() => setShowInput(true)}
            variant="secondary"
            className="cursor-pointer px-2 py-1 md:px-4 md:py-2 text-sm flex items-center gap-1"
          >
            <IoMdAdd className="w-4 h-4" />
            {addMoreLabel}
          </Badge>
        )}
      </div>

      {/* Add input */}
      {allowAddMore && showInput && !disabled && (
        <div className="flex items-center gap-2 max-w-md">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddOption();
              }
            }}
            autoFocus
          />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={handleAddOption}
            disabled={!inputValue.trim()}
          >
            <IoMdCheckmark />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => {
              setShowInput(false);
              setInputValue("");
            }}
          >
            <IoMdClose />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectableButtons;
