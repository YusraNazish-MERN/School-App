import React from "react";

export default function SearchFilter({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      className="form-control mb-3"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}