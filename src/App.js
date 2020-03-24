import React from "react";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import marked from "marked";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { AppBar, Typography, Toolbar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#9a67ea",
      main: "#673ab7",
      dark: "#320b86",
      contrastText: "#fff"
    },
    secondary: {
      light: "#66fff8",
      main: "#03dac5",
      dark: "#00a895",
      contrastText: "#000"
    }
  }
});

const CHANGE = "CHANGE";

const placeholder = `# Bienvenido a mi vista de marcado con React

## Esto es un subtitulo...
### Y aquí hay otra cosa cool...
  
Algo de código, \`<div></div>\`, entre 2 backticks.

\`\`\`
// Esto es codigo multilinea:

function otroEjemplo(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
Tú puedes además poner  **negritas**... wuuuuu!
O _italica_.
O... espera... **_ambos!_**
Sientete libre de incluso ~~tachar texto~~.

Aquí hay una referencia:  [links](https://www.freecodecamp.com), y
> ¡Citas!

Si quieres de verdad tener libertad, prueba tambien tablas:

Encabezado Salvaje | Encabezado loco | ¿Otro encabezado?
------------ | ------------- | ------------- 
Aquí tu contenido | puede estar aquí y... | también aquí...
Y aquí... | Okey. | Creo que ya lo entendimos.

-Y por supuesto hay listas desordenas.
  - Con algunos puntos.
     - Con diferentes niveles de sangría.
        - Es algo tal que así.


1. Y hay listas ordenas.
1. Utiliza solos 1s si gustas. 
1. Y la lista seguirá
- Incluso si usas guiones y astericos.
* Y por ultimo no olvides las imágenes:

![React Logo w/ Text](https://cdn.worldvectorlogo.com/logos/react-2.svg)
`;
const defaultState = { html: marked(placeholder), text: placeholder };

const changeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE: {
      return { html: marked(action.text), text: action.text };
    }
    default: {
      return state;
    }
  }
};

const actChange = text => {
  return { type: CHANGE, text };
};

const store = createStore(changeReducer);

const mapStateToProps = state => {
  return { text: state.text, preview: state.html };
};
const mapDispatchToProps = dispatch => {
  return { changePreview: text => dispatch(actChange(text)) };
};

let App = props => {
  return (
    <Box py="4rem">
      <Editor defaultText={props.text} onChangePreview={props.changePreview} />
      <Preview preview={props.preview} />
    </Box>
  );
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              MarkApp
            </Typography>
          </Toolbar>
        </AppBar>
        <Box bgcolor={"background.default"}>
          <Container />
        </Box>
      </ThemeProvider>
    </Provider>
  );
};
