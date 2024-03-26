import { ChangeEvent } from "react";

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LabelledInput = ({
  label,
  placeholder,
  type,
  onchange,
}: LabelledInputType) => {
  return (
    <>
      <div className="m-4">
        <label className="block mb-2 font-semibold text-md text-black text-left">
          {label}
        </label>
        <input
          onChange={onchange}
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
};
