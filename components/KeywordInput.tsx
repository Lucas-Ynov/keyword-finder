
import React from 'react';

interface KeywordInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);


export const KeywordInput: React.FC<KeywordInputProps> = ({ query, setQuery, onSearch, isLoading }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Entrez un mot-clé, ex: 'recette facile'"
        className="w-full pl-4 pr-32 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 shadow-sm"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center justify-center m-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : (
           <SearchIcon />
        )}
        <span className="hidden sm:inline ml-2">{isLoading ? 'Recherche...' : 'Rechercher'}</span>
      </button>
    </form>
  );
};
