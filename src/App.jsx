import { useState } from 'react';
import SYNAForm from './components/SYNAForm';
import SavedExperiences from './components/SavedExperiences';
import { useSavedExperiences } from './useSavedExperiences';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // saveExperience isn't called yet — whoever wires up the results view (ResultsContainer)
  // should call it once a playlist is generated, so it stays in sync with this sidebar.
  const { experiences, deleteExperience } = useSavedExperiences();

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #eee' }}>
        <SavedExperiences experiences={experiences} onDelete={deleteExperience} />
      </aside>

      <main style={{ flex: 1, maxWidth: '600px', margin: '60px auto', padding: '0 24px' }}>
        <h1>SYNA</h1>
        <p>Your mood. Your music. Your art.</p>
        <SYNAForm onSubmit={handleSubmit} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
