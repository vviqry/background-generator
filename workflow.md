# 🎨 CSS Gradient Generator — Workflow & Arsitektur

Dokumentasi lengkap alur kerja project **CSS Gradient Generator** dari awal sampai tuntas.

---

## 📦 Tech Stack

| Teknologi | Versi | Fungsi |
|---|---|---|
| **React** | 19.2 | Library UI berbasis komponen |
| **TypeScript** | 5.9 | Superset JavaScript dengan type safety |
| **Vite** | 7.3 | Build tool & dev server (super cepat) |
| **Tailwind CSS** | 4.2 | Utility-first CSS framework |
| **Framer Motion** | 12.x | Library animasi deklaratif |
| **React Router** | 7.13 | Client-side routing |

### State Management

Project ini **tidak pakai Zustand/Redux**. Cukup pakai `useState` bawaan React karena:
- State-nya sederhana (hanya 3 variabel: `color1`, `color2`, `direction`)
- Semua state ada di 1 page (Home.tsx), dikirim ke child components via props
- Tidak ada kebutuhan global state lintas halaman

---

## 🗂 Struktur Folder

```
background-generator/
├── index.html             ← Entry point HTML
├── vite.config.ts         ← Konfigurasi Vite (React + Tailwind v4)
├── tsconfig.json          ← TypeScript config
├── package.json           ← Dependencies & scripts
├── public/
│   └── favicon.ico        ← Icon tab browser
└── src/
    ├── main.tsx           ← ⭐ Entry point React
    ├── App.tsx            ← ⭐ Root component + Router
    ├── index.css          ← Global CSS + Tailwind + Google Fonts
    ├── types/
    │   └── gradient.types.ts  ← 📝 TypeScript types (GradientDirection, dll)
    ├── pages/
    │   └── Home.tsx       ← 📄 Halaman utama (state + compose components)
    └── components/
        ├── GradientPreview.tsx   ← 🖼 Kotak preview gradient besar
        ├── ColorPicker.tsx       ← 🎨 Input warna (color picker + hex text)
        ├── DirectionSelector.tsx ← ↗ Tombol arah gradasi (8 arah)
        └── CodeOutput.tsx        ← 📋 Output kode CSS + tombol Copy
```

---

## 🔄 Alur Kerja Lengkap (Data Flow)

```
User buka browser → index.html → main.tsx → App.tsx → Home.tsx
                                                         │
                    ┌────────────────────────────────────┘
                    │
              Home.tsx (STATE OWNER)
              ┌─────────────────────────────────┐
              │  const [color1, setColor1]       │
              │  const [color2, setColor2]       │
              │  const [direction, setDirection] │
              └──────┬──────────────────────────┘
                     │
       ┌─────────────┼──────────────┬──────────────┐
       ▼             ▼              ▼              ▼
  GradientPreview  ColorPicker×2  DirectionSelector  CodeOutput
  (baca cssValue)  (onChange→     (onChange→          (baca cssCode)
                    setColor)      setDirection)
```

### Alur saat user berinteraksi:

```
1. User pilih warna di ColorPicker
   → onChange() → setColor1() atau setColor2()
   → State berubah → React re-render

2. cssValue di-generate ulang:
   cssValue = `linear-gradient(${direction}, ${color1}, ${color2})`

3. Semua komponen yang baca state ikut update:
   → GradientPreview: background berubah (dengan animasi Framer Motion)
   → CodeOutput: teks CSS code berubah

4. User klik Copy → navigator.clipboard.writeText(cssCode)
   → Tombol berubah "✓ Copied!" selama 2 detik
```

---

## 📄 Penjelasan Tiap File

### 1. `src/types/gradient.types.ts` — TypeScript Types

```ts
type GradientDirection = 'to right' | 'to left' | 'to bottom' | ... ;

interface GradientState {
  color1: string;     // Hex color, misal "#667eea"
  color2: string;     // Hex color, misal "#764ba2"
  direction: GradientDirection;
}

interface DirectionOption {
  value: GradientDirection;
  label: string;      // "Top Left", "Bottom Right", dll
  arrow: string;      // Unicode: ↖, ↗, ↓, dll
}
```

**Konsep:**
- **Union type** (`'to right' | 'to left' | ...`) → hanya boleh isi salah satu dari daftar yang ditentukan
- Kalau kamu typo `'to righ'` (tanpa t), TypeScript langsung error

---

### 2. `src/pages/Home.tsx` — Halaman Utama (State Owner)

```tsx
const [color1, setColor1] = useState('#667eea');
const [color2, setColor2] = useState('#764ba2');
const [direction, setDirection] = useState<GradientDirection>('to right');

const cssValue = `linear-gradient(${direction}, ${color1}, ${color2})`;
const cssCode = `background: ${cssValue};`;
```

**Fitur tambahan:**
- **Swap Colors** → tukar `color1` ↔ `color2`
- **Random** → generate 2 warna random pakai `Math.random()`

**Konsep:**
- **Lifting state up** → state ada di parent (Home), dikirim ke children via props
- **Derived state** → `cssValue` dan `cssCode` dihitung dari state, bukan state sendiri
- **Desain Preline UI** → white card `rounded-xl shadow-sm` di atas `bg-gray-50`

---

### 3. `src/components/GradientPreview.tsx` — Preview Box

```tsx
<motion.div
  animate={{ background: cssValue }}
  transition={{ duration: 0.5, ease: 'easeInOut' }}
  style={{ background: cssValue }}
/>
```

**Apa yang dilakukan:**
- Kotak besar dengan `h-56 md:h-72`
- Background = value `linear-gradient(...)` yang di-generate
- **Framer Motion animate** → transisi smooth saat warna berubah

**Konsep:** Framer Motion bisa animate properti CSS `background` secara langsung. Hasilnya smooth gradient transition tanpa custom code.

---

### 4. `src/components/ColorPicker.tsx` — Input Warna

```tsx
<input type="color" value={color} onChange={...} />  // Native color picker
<input type="text" value={color.toUpperCase()} />     // Hex text editable
```

**Apa yang dilakukan:**
- `<input type="color">` → buka native color picker dari browser
- Input teks untuk edit hex code manual (misal ketik `#FF0000`)
- Regex validasi: `/^#[0-9A-Fa-f]{0,6}$/` → hanya terima format hex yang valid

**Styling custom:**
- `[&::-webkit-color-swatch-wrapper]:p-0` → hilangkan padding internal Chrome
- `[&::-webkit-color-swatch]:rounded-md` → bikin swatch jadi kotak rounded

---

### 5. `src/components/DirectionSelector.tsx` — Tombol Arah

```tsx
const directions = [
  { value: 'to top left', arrow: '↖' },
  { value: 'to top', arrow: '↑' },
  { value: 'to top right', arrow: '↗' },
  // ... 8 arah total
];
```

**Apa yang dilakukan:**
- 8 tombol dalam grid `grid-cols-4 sm:grid-cols-8`
- Tombol aktif: highlight indigo (`border-indigo-500 bg-indigo-50`)
- **Framer Motion**: `whileHover={{ scale: 1.08 }}`, `whileTap={{ scale: 0.92 }}`

**Konsep:** Unicode arrows (`↖↑↗←→↙↓↘`) dipakai sebagai icon — tidak perlu library icon tambahan.

---

### 6. `src/components/CodeOutput.tsx` — Output CSS + Copy

```tsx
const handleCopy = async () => {
  await navigator.clipboard.writeText(cssCode);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
```

**Apa yang dilakukan:**
- Dark code block: `bg-gray-900` dengan teks `text-green-400` (terminal style)
- Font: **JetBrains Mono** (monospace, khusus untuk kode)
- Tombol Copy: pakai `navigator.clipboard.writeText()` (modern API)
- Fallback: `document.execCommand('copy')` untuk browser lama
- Feedback: `AnimatePresence` dari Framer Motion untuk animasi "✓ Copied!"

**Konsep:**
- **Clipboard API** → `navigator.clipboard` adalah API modern pengganti `execCommand`
- **AnimatePresence** → handle animasi masuk/keluar elemen yang mount/unmount

---

## 🔗 Hubungan Antar File (Dependency Graph)

```
       gradient.types.ts (semua type definitions)
          ╱          ╲
DirectionSelector   Home.tsx
                      │
                      ├── GradientPreview (props: cssValue)
                      ├── ColorPicker ×2  (props: color, onChange)
                      ├── DirectionSelector (props: direction, onChange)
                      └── CodeOutput (props: cssCode)
                      │
                   App.tsx (routing)
                      │
                   main.tsx (mount ke DOM)
```

---

## ⚡ Teknik & Pattern yang Digunakan

### 1. Lifting State Up
State ada di `Home.tsx`, dikirim ke child components via props. Child komponen tidak punya state sendiri (kecuali `CodeOutput` untuk `copied` flag).

### 2. Derived State
`cssValue` dan `cssCode` **bukan state** — mereka dihitung ulang setiap render dari state yang ada. Ini menghindari state yang tidak sinkron.

### 3. Props Down, Events Up
- **Props down**: `Home` → kirim `color`, `direction`, `cssValue`, `cssCode` ke children
- **Events up**: Children → panggil `onChange()` yang update state di `Home`

### 4. Controlled Components
Semua input (color picker, hex text) adalah **controlled** — value-nya dikontrol oleh React state, bukan DOM.

### 5. Graceful Fallback (Clipboard)
Coba modern API dulu (`navigator.clipboard`), kalau gagal fallback ke `execCommand`.

### 6. Responsive Design
Grid layout: `grid-cols-4 sm:grid-cols-8` untuk direction buttons. Color pickers: `grid-cols-1 sm:grid-cols-2`.

---

## 🚀 Cara Jalankan

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production
```

---

## 📝 Checklist Fitur

- [x] Preview gradient besar (live update)
- [x] 2 Color Picker (native picker + hex text input)
- [x] 8 Direction buttons (Unicode arrows)
- [x] CSS code output (monospace, dark theme)
- [x] Copy to Clipboard (dengan feedback animasi)
- [x] Swap Colors button
- [x] Random Colors button
- [x] Framer Motion animasi (transisi gradient, tombol hover/tap)
- [x] Desain Preline UI (white card, rounded-xl, shadow-sm, bg-gray-50)
- [x] Responsive design (mobile + desktop)
- [x] TypeScript type safety
- [x] Google Fonts (Inter + JetBrains Mono)
