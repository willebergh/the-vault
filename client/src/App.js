import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles, CssBaseline, Grid, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { ThemeProvider, theme } from "./components/Theme";

import LoginForm from "./components/forms/LoginForm";
const styles = {
    root: {
        minHeight: "100vh",
    },
    login: {
        minHeight: "100vh",
        //backgroundColor: theme.palette.background.red,
    }
}

const notes = [
    {
        name: "Todo",
        content: "Hello World"
    },
    {
        name: "Secrets",
        content: "Hello World"
    },
    {
        name: "Passwords",
        content: "Hello World"
    }
]

function App(props) {
    const [isAuthenticated, updateAuthState] = useState(true);

    const { classes } = props;
    return (
        <div className={classes.root}>
            <ThemeProvider>
                <CssBaseline />
                <Route path="/login" render={props => (
                    isAuthenticated ? <Redirect to="/app" /> : (
                        <Grid className={classes.login} container justify="center" alignContent="center">
                            <Grid item>
                                <LoginForm {...props} updateAuthState={updateAuthState} />
                            </Grid>
                        </Grid>
                    )
                )} />
                <Route path="/app" render={props => (
                    !isAuthenticated ? <Redirect to="/login" /> : (
                        <Grid container>
                            <Grid item>
                                <List component="nav">
                                    {notes.map((a, b) => (
                                        <React.Fragment>
                                            {b !== 0 ? <Divider /> : null}
                                            <ListItem button key={b}>
                                                <ListItemText>{a.name}</ListItemText>
                                            </ListItem>
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    )
                )} />
            </ThemeProvider>
        </div>
    );
}

export default withStyles(styles)(App);