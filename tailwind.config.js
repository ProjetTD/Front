module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        theme: {
          main: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(59,59,59,1) 50%, rgba(19,19,19,1) 100%)',
        },
        wedevus: {
          primary: '#6D1330',
          secondary: '#921330',
          dark: {
            secondary: '#141414',
            primary: '#0C0C0C'
          },
          blue: {
            primary: '#0F151C',
            secondary: '#191F26'
          },
          gray: {
            primary: '#25282C',
            dark: '#2B2B2B',
            light: '#3b3b3b',
          },
          red: {
            primary: '#7A0000',
            secondary: '#E90000'
          }
        },
        minecraft: {
          4: '#AA0000',
          c: '#FF5555',
          6: '#FFAA00',
          e: '#FFFF55',
          2: '#00AA00',
          a: '#55FF55',
          b: '#55FFFF',
          3: '#00AAAA',
          1: '#0000AA',
          9: '#5555FF',
          d: '#FF55FF',
          5: '#AA00AA',
          f: '#FFFFFF',
          7: '#AAAAAA',
          8: '#555555',
          0: '#000000'
        }
      },
      fontFamily: {
        'sans': 'Montserrat, sans-serif'
      },
      margin: {
        '22': '5.25rem'
      }
    }
  },
  plugins: []
}
