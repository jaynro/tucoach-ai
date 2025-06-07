import React, { useState } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

const VideoDemo = ({ videoUrl, thumbnailUrl, title = "TuCoach AI Demo" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // If no video URL is provided, show placeholder
  if (!videoUrl) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden aspect-video shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <PlayCircleIcon className="w-20 h-20 text-primary mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 text-lg mb-2">Video demo próximamente</p>
              <p className="text-sm text-gray-500">
                Aquí se mostrará tu video de demostración
              </p>
              <div className="mt-4 p-4 bg-white/80 rounded-lg backdrop-blur-sm max-w-sm mx-auto">
                <p className="text-xs text-gray-600">
                  Para agregar tu video, proporciona la URL en el componente VideoDemo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video shadow-xl">
        {!isPlaying ? (
          // Thumbnail with play button
          <div className="relative w-full h-full">
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-lg opacity-90">Haz clic para reproducir</p>
                </div>
              </div>
            )}
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="group bg-black/50 hover:bg-black/70 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                aria-label="Reproducir video"
              >
                <PlayCircleIcon className="w-16 h-16 text-white group-hover:text-primary transition-colors" />
              </button>
            </div>
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          // Actual video player
          <video
            controls
            autoPlay
            className="w-full h-full"
            poster={thumbnailUrl}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <p className="text-white p-4">
              Tu navegador no soporta el elemento de video. 
              <a href={videoUrl} className="text-primary underline ml-1">
                Descargar el video
              </a>
            </p>
          </video>
        )}
      </div>
      
      {/* Video description */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          Descubre cómo TuCoach AI puede ayudarte a perfeccionar tus habilidades de entrevista
        </p>
      </div>
    </div>
  );
};

export default VideoDemo;