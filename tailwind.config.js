/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "exact-360x740": { "min-width": "360px", "max-height": "740px" },
      },
    },
  },
  plugins: [],
};
