
import React, { useState, useCallback } from 'react';
import type { KeywordData } from './types';
import { fetchKeywordData } from './services/geminiService';
import { KeywordInput } from './components/KeywordInput';
import { KeywordResults } from './components/KeywordResults';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<KeywordData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError("Veuillez entrer un mot-clé.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);

    try {
      const data = await fetchKeywordData(searchQuery);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la récupération des données. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
           <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              SEO Keyword Finder
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Découvrez de nouvelles opportunités de mots-clés. Obtenez le volume de recherche et le score de difficulté pour le marché français.
            </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <KeywordInput
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <KeywordResults 
            results={results}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
          />
        </div>
      </main>

       <footer className="text-center p-4 mt-8 text-slate-500 dark:text-slate-400 text-sm">
        <p>Propulsé par l'IA de Google. Données SEO à titre indicatif.</p>
      </footer>
    </div>
  );
};

export default App;
