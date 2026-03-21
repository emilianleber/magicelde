import { useState, useEffect } from "react";

interface AnimatedWordsProps {
  words: string[];
  className?: string;
}

const AnimatedWords = ({ words, className = "" }: AnimatedWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={`inline-flex overflow-hidden h-[1.1em] align-bottom ${className}`}>
      <span
        className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {words.map((word, i) => (
          <span key={i} className="h-[1.1em] flex items-end underline-primary">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
};

export default AnimatedWords;
