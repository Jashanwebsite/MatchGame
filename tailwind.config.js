/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend:{
    boxShadow: {
      "button":"#8bb1ab 0 -25px 18px -14px inset,#8bb1ab 0 1px 2px,#8bb1ab 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,#8bb1ab 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px"
    }
   }
  },
  plugins: [],
}
