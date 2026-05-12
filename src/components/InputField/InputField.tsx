import { useState } from "react";
import type { InputProps } from "../../types/InputProps";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const InputField = ({
  label,
  value,
  onChange,
  icon,
  error,
  type = "text",
  className = "",
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`relative w-full ${className}`} dir="rtl">
      <input
        type={isPassword && !showPassword ? "password" : "text"}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full h-12 border rounded-lg pr-2 pl-5  leading-none outline-none transition-all
        ${error ? "border-red-500" : focused ? "border-(--main-color)" : "border-gray-300"}`}
      />
      <label
        className={`absolute right-10 transition-all duration-200 pointer-events-none
        ${
          focused || value
            ? "-translate-y-1/2 top-0 text-xs text-gray-500 bg-white px-2"
            : "top-3 text-gray-500"
        }`}
      >
        {label}
      </label>
      {icon && (
        <div className="absolute right-2 top-3 text-gray-500">
          {icon}
        </div>
      )}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute left-2 top-3 text-gray-500"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 pr-1">{error}</p>
      )}
    </div>
  );
};