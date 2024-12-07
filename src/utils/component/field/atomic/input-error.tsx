import React from "react";

interface InputErrorProps {
  error: string[]
}
const InputError = ({ error }: InputErrorProps) => {
  if (!error) return (<></>);
  return (
    <>
      {
        error.map(
          (message: string, index: number) =>
            <small key={index} className={`p-error block`}>{message}</small>
        )
      }
    </>
  )
}

export default InputError;