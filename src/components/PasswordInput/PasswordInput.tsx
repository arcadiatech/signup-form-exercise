import { forwardRef, useState } from "react";
import "./PasswordInput.css";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <span className="password-input-container">
      <input type={showPassword ? "text" : "password"} ref={ref} {...props} />
      <button
        className="password-input-toggle"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </span>
  );
});
