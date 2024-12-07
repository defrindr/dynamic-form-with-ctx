import { PrimeReactProvider } from 'primereact/api';
import { FormComponent } from './form';


export default function Home() {

  return (
    <PrimeReactProvider>
      <div style={{ padding: '200px' }}>
        <FormComponent />
      </div>
    </PrimeReactProvider>
  );
}
