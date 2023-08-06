/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '1440': '1440px',
        '1280': '1280px',
        '1200': '1200px',
        '560': '560px',
        '746': '780px',
        '533': '470px',
        '410': '410px',
        '350': '350px'
      },
      height: {
        '700': '700px',
        '600': '600px',
        '500': '500px',
        '400': '400px',
        '410': '410px'
      },
      padding: {
        '18': '74px'
      },
      margin: {
        '520': '520px',
        '1920': '1920px'
      },
      colors: {
        'main': '#1c1b1b',
        'button': '#007DB5',
        'blackv2': '#000000e6',
        'green': '#00a650',
        'nose': '#f5f5f7'
      },
      screens: {
        'navbar': '1457px',
        'mobile': '435px',
        'mobile2': '388px',
        'xl2': '1331px',
        '1280': '1280px',
        '575': '575px',
        '400': '400px',
        '580': '580px',
        '420': '420px',
        '1250': '1250px',
        '1010': '1010px',
        '650': '650px',
        '1300': '1300px',
        '450': '450px',
        '480': '480px',
        '440': '440px',
        '402': '402px',
        '396': '396px',
        '450': '450px',
        '800': '800px',
        '500': '500px',
        '830': '830px'
      },
      fontSize: {
        '15': '15px'
      },
      boxShadow: {
        'det': '0 1px 8px 0px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      spacing: {
        '60': '60px',
        '57': '57px'
      }
    },
    fontFamily: {
      'poppins': ['poppins', 'system-ui', 'sans-serif'],
      'montserrat': ['montserrat', 'system-ui', 'sans-serif']
    }
  },
  plugins: [],
}
