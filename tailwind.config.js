/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'background-color': '#EDEDED', // zinc-150
        'background-color-muted': '#fafafa', // zinc-50
        'background-color-dark': '#09090b', // zinc-950
        'background-color-dark-muted': '#18181b', // zinc-900

        'accent-color': '#EDEDED', // zinc-100
        'accent-color-muted': '#DEDEE0', // zinc-200
        'accent-color-muted-darker': '#D4D4D8', // zinc-300
        'accent-color-dark': '#27272a', // zinc-800
        'accent-color-dark-muted': '#3f3f46', // zinc-700

        'text-muted': '#a1a1aa', // zinc-400
        'text-dark-muted': '#52525b', // zinc-600

        border: '#d4d4d8', // zinc-300
        'border-dark': '#3f3f46', // zinc-700

        'main-color-light': '#FFFBEB', // amber-50
        'main-color': '#F5AF0B', // amber-400
        'main-color-muted': '#f59e0b', // amber-500
        'main-color-dark': '#d97706', // amber-600
        'main-color-dark-muted': '#b45309' // amber-700
      },
      gridTemplateColumns: {
        mainGridXl: '15% auto',
        mainGridLg: '20% auto',
        mainGridMd: '25% auto',
        mainGridSm: '30% auto'
      },
      height: {
        header: '75px',
        footer: '70px',
        main: 'calc(100vh - 87px)',
        mainSm: 'calc(100vh - (91px + 75px))',
        dialog: 'calc(100vh - 75px)'
      },
      spacing: {
        header: '75px',
        '3-5': '13px'
      }
    }
  },
  plugins: []
}
