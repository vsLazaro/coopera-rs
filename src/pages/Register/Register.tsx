import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Grid from '@mui/material/Grid2';
import { Header } from '../../components/header/header';
import { TextField, IconButton, InputAdornment } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";
import "@/pages/Register/Register.scss";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerUser } from "../../services/FetchRegister/FetchRegister.ts";

function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: name.trim() === "",
      email: email.trim() === "" || !emailRegex.test(email),
      phone: phone.trim() === "",
      password: password.trim() === "",
      confirmPassword: !confirmPassword.trim() || confirmPassword !== password,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };


  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      setGeneralError("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    const payload = {
      name,
      phone: phone.replace(/\D/g, ""),
      email,
      password,
    };

    try {
      const result = await registerUser(payload);
      console.log("Cadastro bem-sucedido:", result);
      setGeneralError(null);
      setSuccessMessage("Cadastro realizado com sucesso!");
      // ex: navigate("/login");
    } catch (error: any) {
      setSuccessMessage(null); // limpa o sucesso em caso de erro
      if (error.message.includes("Failed to fetch")) {
        setGeneralError("Servidor fora do ar. Tente novamente mais tarde.");
      } else {
        setGeneralError(error.message || "Erro inesperado ao cadastrar.");
      }
    }

  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;

    if (digits.length >= 2) {
      formatted = `(${digits.slice(0, 2)}) `;
    }
    if (digits.length >= 7) {
      formatted += `${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else if (digits.length > 2) {
      formatted += digits.slice(2);
    }

    setPhone(formatted);
  };

  useEffect(() => {
    document.body.classList.add("register-page");
    return () => {
      document.body.classList.remove("register-page");
    };
  }, []);

  const passwordRequirements = [
    { label: "Mínimo 6 caracteres", valid: password.length >= 6 },
    { label: "Uma letra minúscula", valid: /[a-z]/.test(password) },
    { label: "Uma letra maiúscula", valid: /[A-Z]/.test(password) },
    { label: "Um número", valid: /\d/.test(password) },
    {
      label: "Um caractere especial",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <>
      <Header />
      <Grid className="register-container" justifyContent="center" alignItems="center">
        <Grid className="register-box" size={{ xs: 12, sm: 8, md: 6 }}>
          <h2>Faça o cadastro</h2>
          <p>
            Já possui uma conta?{" "}
            <Link to="/login" className="link">
              <strong>Entrar</strong>
            </Link>
          </p>
          <Grid className="register-inputtext" container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                className="text-field-input"
                name="Nome*"
                label="Nome*"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.name ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.name ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.name ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                className="text-field-input"
                name="Celular*"
                label="Celular*"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{ maxLength: 15 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.phone ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.phone ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.phone ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                className="text-field-input"
                name="E-mail*"
                label="E-mail*"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.email ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.email ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.email ? "red" : "default",
                    },
                  },
                }}
              />
              {email && errors.email && (
                <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
                  E-mail inválido
                </p>
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                className="text-field-input"
                name="Senha*"
                label="Senha*"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(password.length > 0)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.password ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.password ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.password ? "red" : "default",
                    },
                  },
                }}
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
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                className="text-field-input"
                name="Confirmar Senha*"
                label="Confirmar Senha*"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.confirmPassword ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.confirmPassword ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.confirmPassword ? "red" : "default",
                    },
                  },
                }}
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
              />
              {confirmPassword.length > 0 && confirmPassword !== password && (
                <ul className="password-requirements">
                  <li className="invalid">As senhas não coincidem</li>
                </ul>
              )}
            </Grid>
            <Grid>
              {(passwordFocused || password.length > 0) && (
                <ul className="password-requirements">
                  {passwordRequirements.map((req, index) => (
                    <li key={index} className={req.valid ? "valid" : "invalid"}>
                      {req.label}
                    </li>
                  ))}
                </ul>
              )}
            </Grid>
          </Grid>

          <Grid className="register-bottom" size={{ xs: 12, sm: 8, md: 6 }}>
            <p style={{ fontSize: "14px", marginBottom: "6px" }}>
              *Campos obrigatórios
            </p>
            <label>
              <input type="checkbox" style={{ marginRight: "6px" }} />
              Eu concordo com os{" "}
              <Link to="/termos">Termos de Condição de Uso</Link> e com os{" "}
              <Link to="/privacidade">Termos de Privacidade</Link>.
            </label>

            {/* ERRO GERAL */}
            {generalError && (
              <p style={{ color: "red", marginTop: "10px", fontSize: "16px" }}>
                {generalError}
              </p>
            )}
            {successMessage && (
              <p style={{ color: "green", marginTop: "10px", fontSize: "16px" }}>
                {successMessage}
              </p>
            )}


            <Grid size={{ xs: 12 }} marginTop={2}>
              <CustomButton
                text="Cadastrar"
                onClick={() =>
                  handleRegister(new Event("submit") as unknown as React.FormEvent)
                }
                styles={{
                  backgroundColor: "black",
                  color: "white",
                  width: "140px",
                  fontSize: "16px",
                  textAlign: "flex-start",
                  justifyContent: "flex-start",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
