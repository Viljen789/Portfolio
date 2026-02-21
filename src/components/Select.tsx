import type { ChangeEvent } from "react";

const Select = ({
  value,
  onChange,
  options,
  label,
  isDisabled,
}: {
  value: string | number;
  label: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
  isDisabled: boolean;
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-xs text-gray-300 ml-1" htmlFor={label}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className="bg-gray-700 cursor-pointer hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] rounded-md sm:min-w-full"
        id={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
