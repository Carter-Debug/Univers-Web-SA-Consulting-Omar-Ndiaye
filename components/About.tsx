import React, { useState, useRef, useEffect } from 'react';
import { Founder } from '../constants';
import { CameraIcon, XIcon, RefreshCwIcon } from './Icons';

const defaultImage = "https://source.unsplash.com/300x300/?portrait,man,ceo,african,professional";

const About: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string>(defaultImage);
    const [showCamera, setShowCamera] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const openCamera = async () => {
        setError(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(streamData);
                setShowCamera(true);
            } catch (err) {
                console.error("Error accessing camera: ", err);
                setError("Impossible d'accéder à la caméra. Veuillez vérifier les autorisations de votre navigateur.");
            }
        } else {
             setError("La fonctionnalité de caméra n'est pas supportée par votre navigateur.");
        }
    };

    useEffect(() => {
        if (showCamera && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    }, [showCamera, stream]);

    const closeCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setShowCamera(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setImageSrc(dataUrl);
            }
            closeCamera();
        }
    };
    
    const resetPhoto = () => {
        setImageSrc(defaultImage);
    }

    // Unmount effect
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return (
        <>
            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">Qui Sommes-Nous ?</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                            Votre partenaire de confiance pour une présence en ligne qui fait la différence.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto bg-gray-50 p-8 md:p-12 rounded-lg border border-gray-200 shadow-sm">
                        <div className="md:w-1/3 text-center flex-shrink-0">
                            <div className="relative group w-48 h-48 mx-auto">
                                <img
                                    src={imageSrc}
                                    alt={Founder.name}
                                    className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white"
                                />
                                <button
                                    onClick={openCamera}
                                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    aria-label="Changer la photo de profil"
                                >
                                    <CameraIcon className="w-8 h-8" />
                                </button>
                            </div>
                             {imageSrc !== defaultImage && (
                                <button 
                                    onClick={resetPhoto} 
                                    className="mt-2 text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mx-auto"
                                >
                                    <RefreshCwIcon className="w-4 h-4" /> Réinitialiser
                                </button>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mt-4">{Founder.name}</h3>
                            <p className="text-indigo-600 font-semibold">{Founder.title}</p>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                        <div className="md:w-2/3 text-lg text-gray-700 space-y-4 text-center md:text-left">
                            <p>
                                Passionnés par le web et l'entrepreneuriat, nous avons fondé <strong>Univers Web SA Consulting</strong> avec une mission claire : rendre la technologie web accessible et efficace pour les entreprises, les ONG et les entrepreneurs au Sénégal et au-delà.
                            </p>
                            <p>
                                Notre approche est centrée sur le client. Nous prenons le temps de comprendre votre vision, vos objectifs et vos défis pour vous proposer des solutions sur mesure qui génèrent des résultats concrets. De la conception initiale au lancement et au-delà, nous sommes à vos côtés pour assurer votre succès.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {showCamera && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Prendre une photo</h3>
                            <button onClick={closeCamera} className="text-gray-500 hover:text-gray-800">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="bg-black rounded-md overflow-hidden">
                             <video ref={videoRef} className="w-full h-auto" playsInline muted></video>
                        </div>
                        <canvas ref={canvasRef} className="hidden"></canvas>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={capturePhoto}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center gap-2"
                            >
                                <CameraIcon className="w-5 h-5" />
                                Capturer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default About;