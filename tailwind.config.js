/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./shop.html",
    "./product.html",
    "./checkout.html",
    "./success.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        ovena: {
          cream: '#F6EBDD',
          card: '#FCFCFA',
          soft: '#F6F1E9',
          red: '#981C0A',
          'red-dark': '#801708',
          dark: '#2C201B',
          muted: '#72665D',
          border: '#E7DDD2',
          footer: '#4A3327',
          'footer-light': '#F5EDE3',
          gold: '#D78A41',
        },
        cocoa: {
          DEFAULT: '#2C201B',
          deep: '#1A120E',
          surface: '#382820',
          light: '#4A352A',
          muted: '#72665D',
        },
        brown: {
          DEFAULT: '#4A3327',
          rich: '#382419',
          warm: '#5C3F2F',
        },
        caramel: {
          DEFAULT: '#981C0A',
          light: '#B22A16',
          dark: '#801708',
          glow: 'rgba(152, 28, 10, 0.25)',
        },
        cream: {
          DEFAULT: '#F6EBDD',
          soft: '#FCFCFA',
          dark: '#E7DDD2',
        },
        'warm-white': '#FCFCFA',
        gold: {
          DEFAULT: '#D78A41',
          light: '#E5A467',
          dark: '#B56D28',
          glow: 'rgba(215, 138, 65, 0.3)',
        }
      },
      fontFamily: {
        display: ['"Bungee"', '"Archivo Black"', 'sans-serif'],
        serif: ['"Bungee"', '"Playfair Display"', 'serif'],
        sans: ['"Instrument Sans"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
        'fluid-hero': 'clamp(2rem, 7.2vw, 6.5rem)',
        'fluid-h1': 'clamp(1.75rem, 5vw, 4.5rem)',
        'fluid-h2': 'clamp(1.5rem, 3.8vw, 3.25rem)',
        'fluid-h3': 'clamp(1.15rem, 2.5vw, 2.25rem)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(30, 18, 12, 0.05)',
        'elevated': '0 20px 40px -15px rgba(30, 18, 12, 0.12)',
        'glow-caramel': '0 0 40px -10px rgba(192, 133, 82, 0.35)',
        'glow-gold': '0 0 35px -8px rgba(201, 166, 107, 0.4)',
        'inner-caramel': 'inset 0 2px 4px 0 rgba(201, 166, 107, 0.2)',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
};
