import { useState } from 'react';
import SYNAForm from './components/SYNAForm';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 24px' }}>
      <h1>SYNA</h1>
      <p>Your mood. Your music. Your art.</p>
      <SYNAForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

export default App;
