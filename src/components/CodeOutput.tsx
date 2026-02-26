import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeOutputProps {
  cssCode: string;
}

function CodeOutput({ cssCode }: CodeOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = cssCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-sky-200/60">CSS Code</label>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
        {/* Code display */}
        <pre className="overflow-x-auto px-5 py-4 text-sm leading-relaxed">
          <code className="font-mono text-emerald-400">{cssCode}</code>
        </pre>

        {/* Copy button */}
        <div className="flex items-center justify-end border-t border-white/5 px-4 py-2.5">
          <motion.button
            type="button"
            onClick={handleCopy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/5 text-sky-200/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  ✓ Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  📋 Copy to Clipboard
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default CodeOutput;
