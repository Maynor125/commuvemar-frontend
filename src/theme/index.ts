//paleta de colores a usar.
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#FDFDFD",
    50: "#F9FAFB",
    100: "#E4E5E7",
    200: "#C2C2C2",
    300: "#909090",
    400: "#858585",
    500: "#666666",
    600: "#343438",
    700: "#141822",
    800: "#23262F",
    900: "#0F0F15",
    1000: "#121219",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#00A2DC",
    400: "#D3BEBE",
    500: "#EE4623",
    600: "#00A2DC",
    700: "#BEF9C1",
    800: "#42C37D",
    900: "#4FBD55",
  },
  error: {
    main: "#CC0000",
    dark: "#CC0000",
    light: "#CC0000",
  },
  warning: {
    main: "#FFC107",
    dark: "#FF8C00",
    light: "#FFD700",
  },
  success: {
    main: "#4CAF50",
    dark: "#388E3C",
    light: "#81C784",
  },
};

type PaletteMode = "dark" | "light";

//creacion del tema.
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // valores de la paleta para el dark mode
            primary: {
              dark: colorTokens.primary[300],
              main: colorTokens.primary[600],
              light: colorTokens.primary[900],
            },
            secondary: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              contrastText: colorTokens.grey[400],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[100],
            },
            background: {
              default: colorTokens.grey[900],
              paper: colorTokens.grey[1000],
              extra: colorTokens.grey[700]
            },
            error: {
              main: colorTokens.error.dark,
              light: colorTokens.error.light,
            },
            warning: {
              main: colorTokens.warning.dark,
              light: colorTokens.warning.light,
            },
            success: {
              main: colorTokens.success.dark,
              light: colorTokens.success.light,
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[300],
              main: colorTokens.primary[600],
              light: colorTokens.primary[900],
            },
            secondary: {
              dark: colorTokens.grey[800],
              main: colorTokens.grey[500],
              contrastText: colorTokens.grey[500],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[10],
              paper: colorTokens.grey[50],
              extra: colorTokens.grey[100]
            },
            error: {
              main: colorTokens.error.main,
              light: colorTokens.error.light,
            },
            warning: {
              main: colorTokens.warning.main,
              light: colorTokens.warning.light,
            },
            success: {
              main: colorTokens.success.main,
              light: colorTokens.success.light,
            },
          }),
    },
  };
};
