'use client';
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useState } from "react"
import TextField from "~/utils/component/field/text-field"
import DynamicForm from "~/utils/component/form/dynamic-form"

export const FormComponent = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    // additional fields
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState({});

  const HandleClick = () => {
    // validate form before submitting
    console.log(form);
  };

  return (
    <Card title="Simple Card">
      <DynamicForm form={form} setForm={setForm} errors={errors}>
        <TextField name="name" label="Nama Lengkap" />
        <TextField name="email" label="Alamat" type="email" />
      </DynamicForm>
      <Button label='Submit' onClick={HandleClick} />
    </Card>
  )
}