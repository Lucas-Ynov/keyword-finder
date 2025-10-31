
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="text-center p-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Analyse des données en cours...</p>
        <p className="text-sm text-slate-500">L'IA prépare votre rapport.</p>
    </div>
  );
};
