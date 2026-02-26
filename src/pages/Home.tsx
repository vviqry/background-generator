import { useState } from 'react';
import { motion } from 'framer-motion';
import type { GradientDirection } from '../types/gradient.types';
import GradientPreview from '../components/GradientPreview';
import ColorPicker from '../components/ColorPicker';
import DirectionSelector from '../components/DirectionSelector';
import CodeOutput from '../components/CodeOutput';

function Home() {
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [direction, setDirection] = useState<GradientDirection>('to right');

  // Generate CSS code
  const cssValue = `linear-gradient(${direction}, ${color1}, ${color2})`;
  const cssCode = `background: ${cssValue};`;

  // Random gradient
  const randomColor = () =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  const handleRandom = () => {
    setColor1(randomColor());
    setColor2(randomColor());
  };

  // Swap colors
  const handleSwap = () => {
    setColor1(color2);
    setColor2(color1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 font-sans md:py-20">
      {/* Main container card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto w-full max-w-2xl space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            CSS Gradient Generator
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Pilih warna, arah gradasi, dan salin kode CSS-nya.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 space-y-8">
          {/* Preview */}
          <GradientPreview cssValue={cssValue} />

          {/* Color pickers row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ColorPicker label="Color 1" color={color1} onChange={setColor1} />
            <ColorPicker label="Color 2" color={color2} onChange={setColor2} />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={handleSwap}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
            >
              ⇄ Swap Colors
            </motion.button>
            <motion.button
              type="button"
              onClick={handleRandom}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
            >
              🎲 Random
            </motion.button>
          </div>

          {/* Direction selector */}
          <DirectionSelector direction={direction} onChange={setDirection} />

          {/* Code output */}
          <CodeOutput cssCode={cssCode} />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          Built with React + TypeScript + Tailwind CSS
        </p>
      </motion.div>
    </div>
  );
}

export default Home;
