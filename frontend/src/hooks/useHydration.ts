import { useEffect, useState } from 'react';

/**
 * Hook para evitar hydration mismatch con stores que usan localStorage
 * Retorna true solo después de que el componente se monta en el cliente
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
