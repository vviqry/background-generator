import { motion } from 'framer-motion';

interface GradientPreviewProps {
  cssValue: string;
}

function GradientPreview({ cssValue }: GradientPreviewProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-sky-200/60">Preview</label>
      <motion.div
        className="w-full h-56 md:h-72 rounded-xl border border-white/10 shadow-inner"
        animate={{ background: cssValue }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ background: cssValue }}
      />
    </div>
  );
}

export default GradientPreview;
