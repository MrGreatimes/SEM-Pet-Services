import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3E6E8E",
        "primary-dark": "#2C516A",
        cream: "#FAF6EC",
        "cream-alt": "#F0E9D6",
        charcoal: "#2B2E33",
        "charcoal-soft": "#5C6470",
        gold: "#D4A537",
        "gold-light": "#F3E4B8",
        "gold-dark": "#9A7418",
        // Text on gold-light backgrounds (gold-dark is only 3.4:1 there; this is 4.98:1).
        "gold-ink": "#7A5B10",
        // Form field borders: 3.37:1 against white (WCAG non-text contrast needs 3:1).
        "field-border": "#948B7A",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
      },
      maxWidth: {
        site: "1100px",
      },
      borderRadius: {
        site: "16px",
      },
      boxShadow: {
        site: "0 8px 24px rgba(43, 46, 51, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
