// components/InputField.js
// Reusable input with label and small description support
export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  children, // for icon button
}) {
  return (
    <div className="w-full mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-md px-4 py-3 outline-none text-sm
                     bg-white placeholder-gray-400
                     focus:ring-2 focus:ring-opacity-60 focus:ring-red-400
                     border-gray-200"
        />
        {children && <div className="absolute right-3 top-3">{children}</div>}
      </div>
    </div>
  );
}
