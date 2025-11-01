import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function getChatResponse(history: string): Promise<string> {
    if (!API_KEY) return "Désolé, ma connexion est actuellement indisponible.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: history,
            config: {
                systemInstruction: "Tu es UniversIA, un assistant IA amical et professionnel pour Univers Web SA Consulting. Ton but est d'aider les visiteurs du site, de répondre à leurs questions sur les services de création de sites web (Vitrine, Entreprise, ONG, E-commerce) et de les guider. Sois concis, utile et encourage-les à demander un devis. Ne réponds pas aux questions hors sujet. Parle en français.",
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error getting chat response:", error);
        return "Je rencontre un petit problème technique. Veuillez réessayer plus tard.";
    }
}

export async function getTextToSpeech(text: string): Promise<string | null> {
    if (!API_KEY) return null;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // Female voice
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;
    } catch (error) {
        console.error("Error getting TTS:", error);
        return null;
    }
}