/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [


    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'cardo': ['"Cardo"'],
      'lato': ['"Lato"'],
    },
    extend: {
      colors: {
        'bgcream': '#e9e7e7',
        'dark': '#232323'
      },
    },
  },
  plugins: [],
}

