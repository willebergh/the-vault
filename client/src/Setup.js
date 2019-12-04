import React, { Component, useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";
import axios from "axios";
import LoginForm from "./components/forms/LoginForm";

class Setup extends Component {
    constructor() {
        super();
        this.state = {
            pwd: "",
            time: "",
            publicKey: "",
            privateKey: ""
        }
    }

    updateState = newState => {
        this.setState(newState);
    }

    render() {
        const { pwd, publicKey } = this.state;
        return (
            <div>
                <Switch>
                    <Route path="/setup/welcome" render={props => (
                        <Welcome {...props} />
                    )} />
                    <Route path="/setup/login" render={props => (
                        <Login {...props} updateState={this.updateState} />
                    )} />
                    <Route path="/setup/password" render={props => (
                        <Password {...props} updateState={this.updateState} />
                    )} />
                    <Route path="/setup/generate-keys" render={props => (
                        <GenerateKeys {...props} updateState={this.updateState} pwd={pwd} />
                    )} />
                    <Route path="/setup/done" render={props => (
                        <Done {...props} publicKey={publicKey} />
                    )} />
                </Switch>
            </div>
        );
    }
}

function Welcome(props) {
    return (
        <React.Fragment>
            <h1>Welcome to</h1>
            <h1>THE VAULT</h1>
            <button onClick={() => props.history.push("/setup/password")}>NEXT</button>
        </React.Fragment>
    )
}

function Login(props) {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

function Password(props) {
    const [pwd, setPwd] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        props.updateState({ pwd });
        props.history.push("/setup/generate-keys");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
            <button type="submit">-></button>
        </form>
    )
}

function GenerateKeys(props) {
    const [done, setDone] = useState(false);
    useEffect(() => {
        var crypt = new JSEncrypt({ default_key_size: 2048 });
        var dt = new Date();
        var time = -(dt.getTime());

        crypt.getKey();
        dt = new Date();

        time = `Generated in ${time + (dt.getTime())} ms`;
        const publicKey = crypt.getPublicKey();
        const privateKey = CryptoJS.AES.encrypt(crypt.getPrivateKey(), props.pwd).toString();
        localStorage.setItem("publicKey", publicKey);
        localStorage.setItem("privateKey", privateKey);
        props.updateState({ time, publicKey, privateKey });
        setDone(true);
    }, [props.pwd])
    return (
        <div>
            <h1>{done ? "Keys Generated!" : "Generating keys..."}</h1>
            {done ? <button onClick={() => props.history.push("/setup/done")}>NEXT</button> : null}
        </div>
    )
}

function Done(props) {
    return (
        <div>
            <h1>All done</h1>
            <h1>THE VAULT<br />is ready to use</h1>
            <button onClick={() => props.history.push("/app")}>ENTER</button>
        </div>
    )
}

export default Setup;