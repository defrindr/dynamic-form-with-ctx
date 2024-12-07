import { InputText, InputTextProps } from "primereact/inputtext";
import React from "react";
import { useFormContext } from "../form/context";
import InputError from "./atomic/input-error";
import InputLabel from "./atomic/input-label";

interface TextFieldProps extends InputTextProps {
  label: string;
  name: string;
}

function TextField({ label, name, ...props }: TextFieldProps) {
  const { setField, getField, getError } = useFormContext();

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setField(name, (event.target as HTMLInputElement).value);
  };

  return (
    <div className="field" key={name}>
      <InputLabel htmlFor={name} label={label} />
      <InputText {...props} id={name} name={name} onChange={handleOnChange} value={getField(name) || ''} />
      <InputError error={getError(name)} />
    </div>
  );
};

export default TextField;