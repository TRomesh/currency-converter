import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { USER_LOGIN } from "../Queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [login, { data, loading, error }] = useMutation(USER_LOGIN);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ): void => {
    setCredentials((creds) => ({ ...creds, [type]: e.target.value }));
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.login.token);
      navigate("/home");
    }
  }, [loading]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Paper elevation={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} />
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                fullWidth
                value={credentials.username}
                onChange={(e) => handleOnChange(e, "username")}
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={credentials.password}
                onChange={(e) => handleOnChange(e, "password")}
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={() => {
                  login({
                    variables: {
                      username: credentials.username,
                      password: credentials.password,
                    },
                  });
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Login;
