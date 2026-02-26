import { motion } from 'framer-motion';
import type { GradientDirection, DirectionOption } from '../types/gradient.types';

const directions: DirectionOption[] = [
  { value: 'to top left', label: 'Top Left', arrow: '↖' },
  { value: 'to top', label: 'Top', arrow: '↑' },
  { value: 'to top right', label: 'Top Right', arrow: '↗' },
  { value: 'to left', label: 'Left', arrow: '←' },
  { value: 'to right', label: 'Right', arrow: '→' },
  { value: 'to bottom left', label: 'Bottom Left', arrow: '↙' },
  { value: 'to bottom', label: 'Bottom', arrow: '↓' },
  { value: 'to bottom right', label: 'Bottom Right', arrow: '↘' },
];

interface DirectionSelectorProps {
  direction: GradientDirection;
  onChange: (direction: GradientDirection) => void;
}

function DirectionSelector({ direction, onChange }: DirectionSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-sky-200/60">Direction</label>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {directions.map((dir) => {
          const isActive = direction === dir.value;
          return (
            <motion.button
              key={dir.value}
              type="button"
              onClick={() => onChange(dir.value)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border text-lg transition-colors ${
                isActive
                  ? 'border-sky-400 bg-sky-400/15 text-sky-300 shadow-sm shadow-sky-400/20'
                  : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white/70'
              }`}
              title={dir.label}
            >
              {dir.arrow}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default DirectionSelector;
