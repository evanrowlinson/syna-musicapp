import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'syna_saved_experiences';

function loadExperiences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useSavedExperiences() {
  const [experiences, setExperiences] = useState(loadExperiences);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(experiences));
    } catch (err) {
      console.error('Failed to persist saved experiences:', err.message);
    }
  }, [experiences]);

  const saveExperience = useCallback((experience) => {
    const entry = {
      id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      savedAt: new Date().toISOString(),
      ...experience,
    };
    setExperiences((prev) => [entry, ...prev]);
    return entry.id;
  }, []);

  const deleteExperience = useCallback((id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  }, []);

  return { experiences, saveExperience, deleteExperience };
}
