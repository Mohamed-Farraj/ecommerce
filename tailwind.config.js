/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    container:{
      center:true,
      width: "90%",
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}

