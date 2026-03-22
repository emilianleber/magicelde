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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!words.length) return;

    const timer = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 250);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  if (!words.length) return null;

  return (
    <span className="block w-full text-center">
      <span
        className={`inline-block min-w-[6ch] transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0"
        }`}
      >
        {words[index]}
      </span>
    </span>
  );
};

export default AnimatedWords;
