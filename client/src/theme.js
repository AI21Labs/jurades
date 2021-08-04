import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#14D160",
            dark: "#09893C"
        },
        text: {
            primary: "#727272"
        }
    },
    typography: {
        h1: {
            fontSize: 142,
            fontWeight: "normal"
        },
        h2: {
            fontSize: 48,
            fontWeight: 500,
        },
        h3: {
            fontSize: 42,
            fontWeight: "bold"
        },
        h4: {
            fontSize: 28
        }
    },
    overrides: {
        MuiButton: {
            containedPrimary: {
                color: 'white',
                fontSize: 24,
                padding: "4px 12px"
            },
            sizeLarge: {
                fontSize: 32,
                borderRadius: 8
            }
        },
    }
});

export default theme;
