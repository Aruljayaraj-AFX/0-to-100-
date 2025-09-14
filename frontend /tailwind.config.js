export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // custom dotted pattern
        'dots': "radial-gradient(#d3d3d3 1px, transparent 1px)",
      },
      
    },
  },
  plugins: [],
};
