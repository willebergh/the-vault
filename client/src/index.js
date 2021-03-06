import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Setup from "./Setup";
import { ThemeProvider } from "./components/Theme";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter>
    <ThemeProvider>
        <CssBaseline />
        <Switch>
            <Route path="/setup" component={Setup} />
            <Route component={App} />
        </Switch>
    </ThemeProvider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
