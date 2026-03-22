import { useEffect, useState } from "react";

interface AnimatedWordsProps {
  words: string[];
  interval?: number;
}

const AnimatedWords = ({
  words,
  interval = 2200,
}: AnimatedWordsProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  if (!words.length) return null;

  return (
    <span className="block w-full text-center">
      <span className="inline-block min-w-[6ch]">
        {words[index]}
      </span>
    </span>
  );
};

export default AnimatedWords;
