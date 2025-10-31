
import React from 'react';
import type { KeywordData } from '../types';
import { Loader } from './Loader';

interface KeywordResultsProps {
  results: KeywordData[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

const getDifficultyClass = (difficulty: number): string => {
  if (difficulty <= 29) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'; // Very Easy / Easy
  if (difficulty <= 49) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'; // Medium
  if (difficulty <= 69) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'; // Hard
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'; // Very Hard
};

const getDifficultyText = (difficulty: number): string => {
  if (difficulty <= 14) return 'Très facile';
  if (difficulty <= 29) return 'Facile';
  if (difficulty <= 49) return 'Possible';
  if (difficulty <= 69) return 'Difficile';
  return 'Très difficile';
};

const formatVolume = (volume: number): string => {
  return new Intl.NumberFormat('fr-FR').format(volume);
};


export const KeywordResults: React.FC<KeywordResultsProps> = ({ results, isLoading, error, hasSearched }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center p-8 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">{error}</div>;
  }
  
  if (!hasSearched) {
      return (
        <div className="text-center p-8 md:p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-slate-900 dark:text-white">Prêt à trouver des mots-clés ?</h3>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Lancez une recherche pour voir les résultats s'afficher ici.</p>
        </div>
      );
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
        <h3 className="text-xl font-medium">Aucun résultat</h3>
        <p className="text-slate-500 dark:text-slate-400">Aucun mot-clé trouvé pour votre recherche. Essayez un autre terme.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800/50 shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Mot-clé</th>
                <th className="p-4 text-right font-semibold text-slate-600 dark:text-slate-300">Volume mensuel</th>
                <th className="p-4 text-right font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">Difficulté (KD)</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {results.map((item) => (
                <tr key={item.keyword} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{item.keyword}</td>
                    <td className="p-4 text-right text-slate-600 dark:text-slate-300">{formatVolume(item.volume)}</td>
                    <td className="p-4 text-right text-slate-600 dark:text-slate-300 hidden sm:table-cell">{item.difficulty}</td>
                    <td className="p-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyClass(item.difficulty)}`}>
                            {getDifficultyText(item.difficulty)}
                        </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
};
