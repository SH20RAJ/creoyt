/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Design system colors
        primary: {
          DEFAULT: "#7C5CFC",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F4F4F4",
          foreground: "#2C2C2C",
        },
        background: "#F8F8F8",
        foreground: "#2C2C2C",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2C2C2C",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#2C2C2C",
        },
        muted: {
          DEFAULT: "#F4F4F4",
          foreground: "#9B9B9B",
        },
        accent: {
          DEFAULT: "#FF7043",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        border: "#E0E0E0",
        input: "#E0E0E0",
        ring: "#7C5CFC",
        progress: "#A192F8",
        'text-primary': "#2C2C2C",
        'text-secondary': "#9B9B9B",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'small': "8px",
        'medium': "16px", 
        'large': "24px",
      },
      spacing: {
        'small': '8px',
        'medium': '16px',
        'large': '24px',
      },
      fontSize: {
        'heading': ['24px', { fontWeight: '700' }],
        'subheading': ['18px', { fontWeight: '600' }],
        'body': ['14px', { fontWeight: '400' }],
        'caption': ['12px', { fontWeight: '400' }],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
