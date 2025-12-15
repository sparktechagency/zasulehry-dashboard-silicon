import { IoIosArrowDown } from "react-icons/io";

const years = ["2023", "2024", "2025"];
interface Props {
  selectedYear: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function YearDropdown({ selectedYear, onChange }: Props) {
  return (
    <div className="inline-block relative">
      <select
        className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-1 px-4 pr-8 text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-[12px]"
        value={selectedYear}
        onChange={(e) => onChange(e.target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Arrow */}
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <IoIosArrowDown size={12} />
      </span>
    </div>
  );
}
