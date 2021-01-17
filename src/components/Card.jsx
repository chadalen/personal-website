import React from 'react';
import clsx from "clsx";

export default function Card({ children, className, ...props }) {
  return (
    <div className={clsx("bg-white p-4 border-b border-gray-200 shadow rounded-lg", className)} {...props}>
      {children}
    </div>
  );
}
