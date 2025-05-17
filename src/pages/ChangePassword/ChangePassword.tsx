import { useState, useEffect } from "react";
import { TextInput } from "../../components/TextInput/TextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Header } from "../../components/header/header";
import Grid from "@mui/material/Grid2";
import "./ChangePassword.scss";
import { changePassword } from "../../services/ChangePasswordService/ChangePasswordService.ts";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [token, setToken] = useState<string | null>(null);

    const passwordRequirements = [
        { label: "Mínimo 6 caracteres", valid: newPassword.length >= 6 },
        { label: "Uma letra minúscula", valid: /[a-z]/.test(newPassword) },
        { label: "Uma letra maiúscula", valid: /[A-Z]/.test(newPassword) },
        { label: "Um número", valid: /\d/.test(newPassword) },
        { label: "Um caractere especial", valid: /[!@#$%^&*(),.?\":{}|<>]/.test(newPassword) },
    ];

    useEffect(() => {
        document.body.classList.add('changePassword-page');
        // Pegando o token da URL manualmente
        const params = new URLSearchParams(window.location.search);
        setToken(params.get("token"));
        return () => {
            document.body.classList.remove('changePassword-page');
        };
    }, []);

    const handlePasswordChange = async () => {
        if (!token) {
            setErrorMessage("Token inválido ou expirado.");
            return;
        }

        const allRequirementsMet = passwordRequirements.every((req) => req.valid);

        if (!allRequirementsMet) {
            setErrorMessage("Senha inválida. Verifique os requisitos.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        setErrorMessage("");
        try {
            await changePassword(token, newPassword);
            setSuccessMessage("Senha alterada com sucesso!");
        } catch (err: any) {
            setErrorMessage(err.message || "Erro ao alterar senha.");
        }
    };

    return (
        <>
            <Header />
            <Grid className="change-password-container" justifyContent="center" alignItems="center">
                <Grid className="change-password-box" size={{ xs: 12, sm: 8, md: 6 }}>
                    <h2>Cadastrar <strong>nova senha</strong></h2>
                    <Grid className="change-password-inputtext" container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextInput
                                placeholder="Nova Senha*"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(newPassword.length > 0)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextInput
                                placeholder="Confirmar Senha*"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {confirmPassword.length > 0 && confirmPassword !== newPassword && (
                                <ul className="password-requirements">
                                    <li className="invalid">Senha não coincide</li>
                                </ul>
                            )}
                        </Grid>
                        <Grid>
                            {(passwordFocused || newPassword.length > 0) && (
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <Grid size={{ xs: 12 }} marginTop={2}>
                        <CustomButton
                            text="Confirmar"
                            onClick={handlePasswordChange}
                            styles={{
                                backgroundColor: "black",
                                color: "white",
                                width: "140px",
                                fontSize: "16px",
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default ChangePassword;