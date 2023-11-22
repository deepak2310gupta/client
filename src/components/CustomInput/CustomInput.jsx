import React from "react";
import TextField from "@mui/material/TextField";

export default function CustomInput({
  name,
  required,
  label,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div>
      <TextField
        required={required}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
      />

      {!!error && (
        <div style={{ fontSize: "12px", color: "red", marginTop: "5px" }}>
          {error}
        </div>
      )}
    </div>
  );
}
