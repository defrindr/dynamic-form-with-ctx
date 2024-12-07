import React from "react";


interface InputLabelProps {
  label: string;
  htmlFor?: string;
}
const InputLabel = ({ label, htmlFor }: InputLabelProps) => {
  if (!label) return (<></>);

  return (
    <label htmlFor={htmlFor}>{label}</label>
  )
}

export default InputLabel;