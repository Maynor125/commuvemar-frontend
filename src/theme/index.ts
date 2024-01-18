
//paleta de colores a usar.
export const colorTokens = {
    grey: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#DBD8D8",
        100: "#D9D9D9",
        200: "#C2C2C2",
        300: "#909090",
        400: "#858585",
        500: "#666666",
        600: "#343438",
        700: "#464651",
        800: "#23262F",
        900: "#0F0F15",
        1000: "#000000",
      },
      primary:{
        50: "#E6FBFF",
        100: "#CCF7FE",
        200: "#99EEFD",
        300: "#00A2DC",
        400: "#D3BEBE",
        500: "#EE4623",
        600: "#E83D21",
        700: "#BEF9C1",
        800: "#42C37D",
        900: "#4FBD55",
      }
}

//creacion del tema.
export const themeSettings =(mode:string)=> {
 return{
    palette:{
        mode:mode,
        ...(mode === "dark"?{
          // valores de la paleta para el dark mode
          primary:{
            dark:colorTokens.primary[300],
           main:colorTokens.primary[600],
           light:colorTokens.primary[900]
           },
           neutral: {
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
        }:
        {
          // palette values for light mode
          primary: {
            dark: colorTokens.primary[300],
            main: colorTokens.primary[600],
            light: colorTokens.primary[900],
          },
          neutral: {
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          },
        })
    }
 }
}