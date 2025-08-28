import React, { type AllHTMLAttributes } from "react";
import './Alert.css';

interface AlertProps extends AllHTMLAttributes<HTMLDivElement> {
  variant?: "success" | "error" | "info" | "warning";
  children: React.ReactNode;
}

export const Alert = ({ variant, children, ...props }: AlertProps) => {
  return <div className={`alert-container ${variant}`} {...props}>{children}</div>;
};
