import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "375px" },
        tablet: { max: "768px" },
        laptop: { max: "1024px" },
        desktop: { max: "1280px" },
      },
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      colors: {
        main: "#15B5BF",
        sub: "#AFE5E9",
        warn: "#ff4141",
      },
      boxShadow: {
        mapButtonShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
