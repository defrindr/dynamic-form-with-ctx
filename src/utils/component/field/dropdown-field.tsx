/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, DropdownChangeEvent, DropdownProps } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { IResponseList } from "~/types/response";
import { useFormContext } from "../form/context";
import InputError from "./atomic/input-error";
import InputLabel from "./atomic/input-label";

interface DropdownOptionProps {
  label: string;
  value: any;
  disabled?: boolean;
}

interface DropdownFieldProps<T> extends DropdownProps {
  label: string;
  name: string;
  apiUrl?: string;
  selected?: any;
  apiMapping?: (data: IResponseList<T>) => DropdownOptionProps[]
}

function DropdownField<T>({ label, selected, name, apiUrl, apiMapping, ...props }: DropdownFieldProps<T>) {
  const { setField, getField, getError } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any>(props.options ?? null);
  const [debouncedSearch, setDebouncedSearch] = useState(false);

  const handleOnChange = (event: DropdownChangeEvent) => {
    if (event.value) {
      setField(name, event.value);
    } else {
      fetchOptions();
    }
  };


  const handleFilterChange = (e: { filter: string }) => {
    setDebouncedSearch(false);
    setDebouncedSearch(true);
    setTimeout(() => {
      if (debouncedSearch) {
        if (apiUrl) {
          fetchOptions(e.filter);
        }
      }
    }, 300);
  };


  const fetchOptions = async (query: string = '') => {
    setLoading(true);
    try {
      // build query string
      const params = new URLSearchParams({
        search: query,
        // additional filters
      });

      const response = await fetch(`${apiUrl}?${params.toString()}`); // URL API
      const data = await response.json();
      const formattedData = apiMapping ? await apiMapping(data) : data;
      setOptions(formattedData);  // Menyimpan data hasil filter
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);  // Mengubah status loading
    }
  };

  useEffect(() => {
    const initial = async () => {
      if (apiUrl) {
        await fetchOptions()
        if (selected) {
          setOptions(() => ([...options, selected]))
        }
      }

    }
    initial();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="field" key={name}>
      <InputLabel htmlFor={name} label={label} />
      <Dropdown {...props} onFilter={handleFilterChange} loading={loading} options={options} id={name} name={name} onChange={handleOnChange} value={getField(name) || ''} />
      <InputError error={getError(name)} />
    </div>
  );
};

export default DropdownField;