import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Every color is a CSS variable (RGB channels) defined in app/globals.css, with a
      // light set and a night set that switches automatically with the visitor's device
      // (prefers-color-scheme). Change the values there, not here.
      colors: {
        primary: token("primary"),
        // Light: darker blue for text/links. Night: a light blue, so text stays readable.
        "primary-dark": token("primary-dark"),
        // Primary button hover background (stays dark enough for white text in both modes).
        "primary-hover": token("primary-hover"),
        cream: token("cream"),
        "cream-alt": token("cream-alt"),
        // Section backgrounds (white in light mode).
        surface: token("surface"),
        // Cards and forms (white in light mode; lighter than surface at night, where
        // shadows don't show).
        card: token("card"),
        charcoal: token("charcoal"),
        "charcoal-soft": token("charcoal-soft"),
        gold: token("gold"),
        "gold-light": token("gold-light"),
        "gold-dark": token("gold-dark"),
        // Text on gold-light backgrounds (gold-dark is only 3.4:1 there; this is 4.98:1).
        "gold-ink": token("gold-ink"),
        // Form field borders: 3.37:1 against white (WCAG non-text contrast needs 3:1).
        "field-border": token("field-border"),
        // Rates page "If I Cancel" callout background.
        blush: token("blush"),
        // Form error text and borders.
        danger: token("danger"),
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
