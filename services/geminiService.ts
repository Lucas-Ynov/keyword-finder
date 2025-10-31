
import { GoogleGenAI, Type } from "@google/genai";
import type { KeywordData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const keywordSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      keyword: {
        type: Type.STRING,
        description: "Le mot-clé analysé.",
      },
      volume: {
        type: Type.INTEGER,
        description: "Le volume de recherche mensuel estimé pour ce mot-clé en France.",
      },
      difficulty: {
        type: Type.INTEGER,
        description: "Un score de difficulté du mot-clé de 0 (très facile) à 100 (très difficile).",
      },
    },
    required: ["keyword", "volume", "difficulty"],
  },
};

export const fetchKeywordData = async (query: string): Promise<KeywordData[]> => {
  const prompt = `Agis comme un expert SEO et un outil de recherche de mots-clés de classe mondiale comme SEMrush ou Ahrefs. Pour le mot-clé "${query}", génère une liste de 15 mots-clés associés pertinents pour le marché français. Pour chaque mot-clé (y compris le mot-clé original en première position), fournis une estimation réaliste du "volume de recherche mensuel" en France et un score de "difficulté du mot-clé" (sur une échelle de 0 à 100, où 0 est très facile et 100 est très difficile). Assure-toi que les données sont crédibles et représentatives des métriques SEO actuelles.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: keywordSchema,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);

    // Sort by volume descending
    data.sort((a: KeywordData, b: KeywordData) => b.volume - a.volume);

    return data as KeywordData[];
  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to retrieve keyword data from the AI model.");
  }
};
