import { Grid, TextField } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton.tsx";
import "./RecuperacaoSenha.scss";
import { useState } from "react";
import { PopupMessage } from "../../components/popupMessage/PopupMessage.tsx";
import { Header } from "../../components/header/header.tsx";
import { recuperarSenha } from "../../services/FetchSenhaRecovery/FetchSenhaRecovery.ts";
import { FRONTEND_URL } from "../../config.ts";

export function RecuperacaoSenha() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

const handleConfirm = async () => {
  if (!validateEmail(email)) {
    setError("Digite um e-mail válido.");
    return;
  }

  setError("");

  try {
    await recuperarSenha(email , `${FRONTEND_URL}/mudar-senha`);
    setPopupOpen(true);
  } catch (err: any) {
    setError(err.message || "Erro ao enviar e-mail. Tente novamente.");
  }
};

  return (
    <>
      <Header />
      <Grid className="main-container">
        <Grid className="main-box">
          <p className="title">
            Recuperar <strong>Senha</strong>
          </p>
          <p className="info-text">
            Informe o e-mail cadastrado para{" "}
            <strong>redefinir sua senha</strong>
          </p>

          <TextField
            style={{
              width: "60%",
              marginTop: "10px",
            }}
            name="Email*"
            label="Email*"
            slotProps={{
              input: {
                sx: {
                  height: "60px",
                },
              },
            }}
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={`error-message ${error ? "show" : ""}`}>
            Por favor, digite um e-mail válido.
          </p>

          <Grid item xs={12}>
            <CustomButton
              text="Confirmar"
              onClick={handleConfirm}
              styles={{
                backgroundColor: "black",
                color: "white",
                width: "140px",
                fontSize: "16px",
              }}
            />

            <PopupMessage
              isOpen={popupOpen}
              message="Essa é uma mensagem de teste para o funcionamento do modal."
              onClose={() => setPopupOpen(false)}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
