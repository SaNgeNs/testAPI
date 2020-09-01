module.exports = {
  PORT: 3006,
  theme: {
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: { main: '#4384f5' },
      secondary: { main: '#3a343c' },
      error: {
        main: '#d32f2f',
        dark: '#efa842'
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          'body': {
            minWidth: '360px',
          },
        },
      },
    },
  },
};
