import { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { USER_LOGIN } from "../Queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

type credentials = {
  username: string;
  password: string;
};

const InitState: credentials = {
  username: "",
  password: "",
};

const Login = (): JSX.Element => {
  let navigate = useNavigate();
  const { addToast } = useToasts();
  const [credentials, setCredentials] = useState<credentials>(InitState);

  const [login, { data, loading, error }] = useMutation(USER_LOGIN, {
    onCompleted: ({ login }) => {
      localStorage.setItem("token", login.token);
      navigate("/home");
    },
    onError: (error) => {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    },
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ): void => {
    setCredentials((creds) => ({ ...creds, [type]: e.target.value }));
  };

  const Cancel = () => {
    setCredentials(InitState);
  };

  const isEnabled = ({ username, password }: credentials): boolean => {
    return !(username?.length > 0 && password?.length > 0);
  };

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
            <Grid item xs={6} lg={6}></Grid>
            <Grid item xs={2} lg={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  Cancel();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={2} lg={2}>
              <Button
                variant="outlined"
                disabled={isEnabled(credentials)}
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
            <Grid item xs={2} lg={2}></Grid>
            <Grid item xs={12} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Login;
