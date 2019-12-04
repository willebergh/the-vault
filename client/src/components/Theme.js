import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MUThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: "#ff5136",
            main: "#d10308",
            dark: "#970000",
        },
        background: {
            default: "#101010",
            red: "#d10308"
        }
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
})

function ThemeProvider({ children }) {
    return (
        <MUThemeProvider theme={theme}>
            {children}
        </MUThemeProvider>
    )
}

export { ThemeProvider, theme }