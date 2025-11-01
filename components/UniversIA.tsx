import React, { useState, useRef, useEffect } from 'react';
import { BotIcon, MicIcon, SendIcon, XIcon } from './Icons';
import { ChatMessage } from '../types';
import { getChatResponse, getTextToSpeech } from '../services/geminiService';
import { useAudio } from '../hooks/useAudio';

const UniversIA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const { play, isPlaying } = useAudio();
  
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'fr-FR';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map(m => `${m.role}: ${m.text}`).join('\n');
      const responseText = await getChatResponse(chatHistory);
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMessage]);
      
      const audioData = await getTextToSpeech(responseText);
      if (audioData) {
        await play(audioData);
      }
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { role: 'model', text: 'Désolé, une erreur est survenue.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 z-50"
        aria-label="Ouvrir l'assistant IA"
      >
        {isOpen ? <XIcon/> : <BotIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full max-w-sm h-[600px] bg-white border border-gray-300 rounded-lg shadow-2xl flex flex-col z-40 text-gray-900">
          <header className="p-4 bg-gray-100 flex justify-between items-center rounded-t-lg border-b border-gray-200">
            <h3 className="text-lg font-bold">UniversIA - Votre Assistant</h3>
            <button onClick={() => setIsOpen(false)}><XIcon className="w-5 h-5"/></button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-white">
            <div className="space-y-4">
              <div className="flex gap-2.5">
                <div className="p-3 rounded-lg bg-indigo-600 text-white max-w-[80%]">
                  <p className="text-sm">Bonjour ! Je suis UniversIA. Comment puis-je vous aider avec votre projet web aujourd'hui ?</p>
                </div>
              </div>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-gray-200 text-gray-800' : 'bg-indigo-600 text-white'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
               {isLoading && (
                <div className="flex gap-2.5">
                    <div className="p-3 rounded-lg bg-indigo-600">
                        <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span>
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '400ms'}}></span>
                        </div>
                    </div>
                </div>
                )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <footer className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 bg-transparent px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
                disabled={isLoading}
              />
              <button onClick={toggleVoice} className={`p-2 rounded-full ${isListening ? 'bg-red-500/20' : 'hover:bg-gray-200'}`} disabled={isLoading || !recognitionRef.current} aria-label="Utiliser le micro">
                <MicIcon className={`w-6 h-6 ${isListening ? 'text-red-500' : 'text-gray-600'} ${isPlaying ? 'text-green-500' : ''}`}/>
              </button>
              <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()} className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50" aria-label="Envoyer">
                <SendIcon className="w-6 h-6 text-indigo-600"/>
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default UniversIA;