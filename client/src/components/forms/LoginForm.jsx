import React, { useState, useEffect } from "react";
import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";
import { Grid, withStyles, Typography, TextField, Button, InputAdornment } from "@material-ui/core";
import {
    Lock as LockIcon,
    VpnKey as VpnKeyIcon,
    ArrowForward as ArrowForwardIcon
} from "@material-ui/icons";

const styles = {
    button: {
        marginLeft: 16,
        minHeight: "100%",
    }
}

function LoginForm(props) {
    const [pwd, setPwd] = useState("");
    const [feedback, setFeedback] = useState("");


    const handleSubmit = e => {
        e.preventDefault();
        const publicKey = localStorage.getItem("publicKey");
        const privateKeyEncrypted = localStorage.getItem("privateKey");

        try {
            var privateKey = CryptoJS.AES.decrypt(privateKeyEncrypted, pwd).toString(CryptoJS.enc.Utf8);
        } catch (err) {
            props.updateAuthState(false);
            return setFeedback("Wrong password!");
        }

        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        var encrypted = encrypt.encrypt("Hello World!");

        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        var decrypted = decrypt.decrypt(encrypted);

        if (decrypted == "Hello World!") {
            props.updateAuthState(true);
            props.history.push("/app")
        } else {
            props.updateAuthState(false);
            return setFeedback("Something went wrong when validating keys!");
        }
    }

    const { classes } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center" alignContent="center">
                <Grid item>
                    <TextField
                        value={pwd}
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={e => setPwd(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                    >
                        <ArrowForwardIcon />
                    </Button>
                </Grid>
            </Grid>

            <Typography>{feedback}</Typography>
        </form>
    )
}

export default withStyles(styles)(LoginForm);