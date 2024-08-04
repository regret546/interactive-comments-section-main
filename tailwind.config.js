/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"], // Add your desired output folder path here
  theme: {
    extend: {
      colors: {
        /* Primary */
        "moderate-blue": "hsl(238, 40%, 52%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "light-grayish-blue": "hsl(239, 57%, 85%)",
        "pale-red": "hsl(357, 100%, 86%)",

        /*  Neutral */
        "dark-blue": "hsl(212, 24%, 26%)",
        "grayish-blue": "hsl(211, 10%, 45%)",
        "light-gray": "hsl(223, 19%, 93%)",
        "very-light-gray": "hsl(228, 33%, 97%)",
      },
      fontWeight: {
        "fw--bold1": 400,
        "fw--bold2": 500,
        "fw--bold3": 700,
      },
      gridTemplateColumns: {
        custom: "50px 500px 50px",
      },
    },
  },
  variants: {
    fill: ["hover", "focus"],
  },
  plugins: [],
};
