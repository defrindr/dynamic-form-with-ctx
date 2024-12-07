/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, Dispatch, SetStateAction, useContext } from 'react';

// Define the types for the context
interface FormContextType<T> {
  form: T;
  getError: (field: any) => any;
  setField: (field: any, value: any) => void;
  getField: (field: any) => any;
}

export interface FormProviderProps<T> {
  errors: any,
  form: T,
  setForm: Dispatch<SetStateAction<T>>,
  children?: React.ReactNode,
}

// Create the context
const FormContext = createContext<FormContextType<any> | undefined>(undefined);

// Create a custom hook to use the context
export const useFormContext = <T,>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as FormContextType<T>;
};

// Context Provider component
export const FormProvider = <T,>({ children, form, setForm, errors }: FormProviderProps<T>) => {
  const setField = (field: keyof T, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getField = (field: keyof T) => {
    return form[field];
  };

  const getError = (field: keyof T) => {
    return errors[field];
  };

  return (
    <FormContext.Provider value={{ form, setField, getField, getError }}>
      {children}
    </FormContext.Provider>
  );
};