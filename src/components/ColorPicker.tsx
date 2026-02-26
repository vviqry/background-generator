interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-sky-200/60">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        {/* Native color input styled as rounded square */}
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-10 cursor-pointer appearance-none rounded-lg border-2 border-white/20 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-none"
          />
        </div>

        {/* Hex code input */}
        <input
          type="text"
          value={color.toUpperCase()}
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              onChange(val);
            }
          }}
          maxLength={7}
          className="flex-1 bg-transparent text-sm font-mono font-medium text-white outline-none placeholder:text-white/30"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

export default ColorPicker;
