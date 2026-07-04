/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "sponsors-bg":'url("/images/home/Sponsors.png")',
      },
      colors: {
        customBlue: '#E6F2FF',
        textBlue : '#0080FF',
        textGrey : '#737272'
      },
    },
  },
  
  plugins: [
		require('@tailwindcss/line-clamp'),
		require("@tailwindcss/typography")
	],
};
