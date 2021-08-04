import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme";


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

