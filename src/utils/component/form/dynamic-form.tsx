import { FormProvider, FormProviderProps } from "./context";

const DynamicForm = <T,>({ errors, form, setForm, children }: FormProviderProps<T>) => {

  return (
    <FormProvider errors={errors} form={form} setForm={setForm}>
      {children}
    </FormProvider>
  )
}

export default DynamicForm;