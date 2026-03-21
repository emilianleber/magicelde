import { useState } from "react";
import { Play, X } from "lucide-react";

interface VideoHeroProps {
  posterSrc: string;
  videoUrl?: string;
  alt: string;
  className?: string;
}

const VideoHero = ({ posterSrc, videoUrl, alt, className = "" }: VideoHeroProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative rounded-[2rem] overflow-hidden ${className}`}>
      {!playing ? (
        <>
          <img
            src={posterSrc}
            alt={alt}
            className="w-full h-[400px] md:h-[560px] lg:h-[640px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
          {videoUrl && (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-20 h-20 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-foreground ml-1" />
              </div>
            </button>
          )}
        </>
      ) : (
        <div className="relative w-full h-[400px] md:h-[560px] lg:h-[640px]">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-transform"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoHero;
