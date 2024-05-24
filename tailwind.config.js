/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hindi: ["Hind Siliguri", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        noto: ["Noto Serif", "sans-serif"],
        mysuru: ["Hind Mysuru", "sans-serif"],
        hindi_outfit: ["Hind Siliguri", "Outfit", "sans-serif"],
        hindi_poppins: ["Hind Siliguri", "Poppins", "sans-serif"],
        hindi_inter: ["Hind Siliguri", "Inter", "sans-serif"],
        li_ador: ["Li Ador Noirrit", "sans-serif"],
        content: ["Content", "sans-serif"],
        hindi_content: ["Hind Siliguri", "Content", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      padding: {
        18: "72px",
        25: "100px",
        30: "120px",
      },
    },
  },
  plugins: [],
};
