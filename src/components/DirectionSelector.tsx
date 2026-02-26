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
      <label className="block text-sm font-medium text-gray-500">Direction</label>
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
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
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
