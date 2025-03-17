import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import { versionSystem } from "../../../package.json";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
//import { nomeEmpresa } from "../../../package.json";
import { AuthContext } from "../../context/Auth/AuthContext";
//import logo from "../../assets/logo.png";
import bk from "../../assets/bk.jpg";
import packageJson from "../../../package.json"; // Ajuste o caminho conforme necessário

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="textPrimary"
      align="center"
      style={{ marginTop: "-21px" }}
    >
      © {new Date().getFullYear()}
      {" - "}
      <Link color="inherit" href="#">
        {packageJson.nomeEmpresa} - v {packageJson.versionSystem}
      </Link>
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    //background: "linear-gradient(to right, #76EE00 , #76EE00 , #458B00)",
    background: `url(${bk}) center/cover no-repeat`, //imagem de fundo
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "100% 100%",
    // backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  paper: {
    backgroundColor:
      theme.palette.type === "dark"
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(255, 255, 255, 0.8)", // Fundo semi-transparente
    borderRadius: "35px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "6px solid transparent", // Adiciona uma borda transparente
    boxShadow: "0 0 180px rgba(0, 0, 0, 0.3)", // Adiciona um efeito de sombra azul
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "1.2em",
  },
  logo: {
    marginBottom: theme.spacing(4),
    width: "200px",
    height: "auto",
  },
  passwordIcon: {
    cursor: "pointer",
  },
  whatsappButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#25d366",
    "&:hover": {
      backgroundColor: "#128c7e",
    },
  },
  whatsappIcon: {
    fontSize: 40,
    color: "#fff",
  },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });

  const { handleLogin } = useContext(AuthContext);
  const [viewregister, setviewregister] = useState("disabled");

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchviewregister();
  }, []);

  const fetchviewregister = async () => {
    try {
      const responsev = await api.get("/settings/viewregister");
      const viewregisterX = responsev?.data?.value;
      // console.log(viewregisterX);
      setviewregister(viewregisterX);
    } catch (error) {
      console.error("Error retrieving viewregister", error);
    }
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  const logo = `${process.env.REACT_APP_BACKEND_URL}/public/logotipos/login.png`;
  const randomValue = Math.random(); // Generate a random number

  const logoWithRandom = `${logo}?r=${randomValue}`;

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <img
              style={{ margin: "0 auto", width: "80%" }}
              src={logoWithRandom}
              alt={`${process.env.REACT_APP_NAME_SYSTEM}`}
            />
          </div>
          {/*<Typography component="h1" variant="h5">
					{i18n.t("login.title")}
				</Typography>*/}
          <form className={classes.form} noValidate onSubmit={handlSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={i18n.t("login.form.email")}
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={i18n.t("login.form.password")}
              type="password"
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
            />

            {/* <Grid container justify="flex-end">
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Link component={RouterLink} to="/forgetpsw" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
            </Grid> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {i18n.t("login.buttons.submit")}
            </Button>
            {viewregister === "disable" && (
              <>
                <Grid container>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      component={RouterLink}
                      to="/signup"
                    >
                      {i18n.t("login.buttons.register")}
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </form>
        </div>
        {
          <Box mt={8}>
            <Copyright />
          </Box>
        }
      </Container>
    </div>
  );
};

export default Login;
