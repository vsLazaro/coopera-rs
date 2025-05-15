import CustomButton from "../../components/CustomButton/CustomButton";
import { Link } from "react-router";
import Grid from "@mui/material/Grid2";
import "@/pages/Login/Login.scss";
import { login } from "../../services/authService/authService";
import { Header } from "../../components/header/header";
import { useState } from "react";
import { useEffect } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    // Adiciona a classe 'login-page' ao body
    document.body.classList.add("login-page");

    // Remove a classe ao desmontar o componente
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = async () => {

    try {
      const response = await login(email, password);
      console.log("Login bem-sucedido", response);
      setError("");
      // redirecionamento
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao fazer login:", error.message);
        setError(error.message);
      }
    }
  };

  return (
    <>
      <Header />
      <Grid
        className="login-container"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="login-box" size={{ xs: 12, sm: 8, md: 6 }}>
          <h2>Faça o login</h2>
          <p>
            Não possui uma conta?{" "}
            <Link to="/cadastro" className="link">
              <strong>Cadastrar</strong>
            </Link>
          </p>
          {error && <p className="error-message-login">{error}</p>}
          <Grid
            container
            className="email-senha"
            rowSpacing={{ xs: 2 }}
            marginBottom={4}
          >
            <Grid size={{ xs: 12 }}>
              <TextField
                name="Email"
                label="Email"
                type="email"
                style={{ width: "250px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="Senha"
                label="Senha"
                type={showPassword ? "text" : "password"}
                style={{ width: "250px" }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePassword}
                          edge="end"
                          style={{
                            width: "28px",
                            height: "28px",
                            marginRight: "-8px",
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOff style={{ fontSize: "15px" }} />
                          ) : (
                            <Visibility style={{ fontSize: "15px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomButton
                text="Login"
                onClick={handleLogin}
                styles={{
                  backgroundColor: "black",
                  color: "white",
                  width: "140px",
                  fontSize: "16px",
                }}
              />
            </Grid>
          </Grid>
          <p>
            <Link to="/esqueceu-senha" className="link">
              <strong>Esqueceu sua senha?</strong>
            </Link>
          </p>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
