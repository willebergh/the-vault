import React, { useState, useEffect } from 'react';
import { Grid, withStyles, Typography, TextField, Button, InputAdornment } from "@material-ui/core";
import { Lock as LockIcon, Mail as MailIcon } from "@material-ui/icons";
import axios from "axios";

const styles = {
    container: {
        maxWidth: "100%",
        margin: 0,
    },
    textField: {
        minWidth: "100%",
    }
}

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/api/login", { email, password, apiKey: true })
            .then(res => {
                setFeedback(res.data)
            })
    }

    const { classes } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center" direction="column" spacing={3} className={classes.container}>
                <Grid item className={classes.textField}>
                    <TextField
                        fullWidth
                        value={email}
                        type="text"
                        label="Email"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <MailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item className={classes.textField}>
                    <TextField
                        fullWidth
                        value={password}
                        type="password"
                        label="Password"
                        variant="outlined"
                        className={classes.textField}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <Typography>{feedback}</Typography>
        </form>
    )
}

export default withStyles(styles)(LoginForm);