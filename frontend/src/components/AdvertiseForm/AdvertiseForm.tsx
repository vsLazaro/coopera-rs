import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
  TextareaAutosize,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import "./AdvertiseForm.scss";
import CustomButton from "../CustomButton/CustomButton";
import { Header } from "../header/header";
import FileInput from "../FileInput/FileInput";

export const AdvertiseForm = () => {
  const [form, setForm] = useState({
    cnpj: "",
    nome: "",
    descricao: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    imagensBase64: [] as string[],
    termosAceitos: false,
  });

  const [errors, setErrors] = useState({
    cnpj: false,
    nome: false,
    descricao: false,
    cep: false,
    endereco: false,
    numero: false,
  });

  const validateForm = () => {
    const newErrors = {
      cnpj: form.cnpj.trim() === "",
      nome: form.nome.trim() === "",
      descricao: form.descricao.trim() === "",
      cep: form.cep.trim() === "",
      endereco: form.endereco.trim() === "",
      numero: form.numero.trim() === "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const fetchCep = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, "");

    const res = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    if (!res.ok) throw new Error("Erro ao buscar CEP");
    const data = await res.json();

    if ("erro" in data) {
      throw new Error("CEP não encontrado");
    }

    return data;
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "cep" && value.length >= 8) {
      const cleanCep = value.replace(/\D/g, "");

      try {
        const data = await fetchCep(cleanCep);

        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            endereco: data.logradouro || "",
          }));
        }
      } catch (error) {
        console.warn("Erro ao buscar o CEP:", error);
      }
    }
  };

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files) return;

    const readers = Array.from(files).map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject("Erro ao ler arquivo");
        reader.readAsDataURL(file);
      });
    });

    const base64Files = await Promise.all(readers);

    setForm((prev) => ({
      ...prev,
      imagensBase64: base64Files,
    }));
  };

  const handlePreviewFileChange = (files: any[]) => {
    console.log("Arquivos recebidos do FileInput:", files);
    // Se quiser converter em base64 aqui também, pode adaptar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("cadastro falhou!");
      return;
    }

    if (!form.termosAceitos) {
      alert("Você precisa aceitar os termos.");
      return;
    }

    try {
      await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Empresa cadastrada com sucesso!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao cadastrar empresa");
      } else {
        console.error("Erro desconhecido");
      }
    }
  };

  return (
    <div className="body-form">
      <Header />
      <div className="form-wrapper">
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="form-container"
        >
          <Typography variant="h5" align="center" mb={2}>
            Anuncia sua <strong>empresa</strong>
          </Typography>

          <Grid container spacing={2} className="form-row">
            <Grid item xs={6}>
              <TextField
                name="cnpj"
                label="CNPJ"
                fullWidth
                value={form.cnpj}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.cnpj ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.cnpj ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.cnpj ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="nome"
                label="Nome da Empresa"
                fullWidth
                value={form.nome}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.nome ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.nome ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.nome ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          <TextareaAutosize
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className="form-textarea"
            minRows={3}
          />

          <Grid container spacing={2} className="form-row">
            <Grid item xs={6}>
              <TextField
                name="cep"
                label="CEP"
                fullWidth
                value={form.cep}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.cep ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.cep ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.cep ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="endereco"
                label="Endereço"
                fullWidth
                value={form.endereco}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.endereco ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.endereco ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.endereco ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className="form-row">
            <Grid item xs={6}>
              <TextField
                name="numero"
                label="Número"
                fullWidth
                value={form.numero}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.numero ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.numero ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.numero ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="complemento"
                label="Complemento"
                fullWidth
                value={form.complemento}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box className="upload-box">
            <Typography
              className="upload-box-field-alias"
              variant="subtitle1"
              fontWeight={500}
            >
              Galeria
            </Typography>
            <input
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={handleFileInputChange}
            />
            <FileInput onChange={handlePreviewFileChange} limit={4} />
            <Typography fontSize={14} color="gray">
              Arraste ou selecione um arquivo PNG ou JPEG
            </Typography>
          </Box>

          <FormControlLabel
            className="checkbox-label"
            control={
              <Checkbox
                checked={form.termosAceitos}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    termosAceitos: e.target.checked,
                  }))
                }
              />
            }
            label={
              <Typography fontSize={14}>
                Eu concordo com os{" "}
                <Link
                  color="#431ADA"
                  href="#"
                  underline="hover"
                  fontWeight="bold"
                >
                  Termos de Condição de Uso
                </Link>{" "}
                e com os{" "}
                <Link
                  color="#431ADA"
                  href="#"
                  underline="hover"
                  fontWeight="bold"
                >
                  Termos de Privacidade
                </Link>{" "}
                da plataforma Coopera RS
              </Typography>
            }
          />
          <div className="submit-container">
            <CustomButton
              type="submit"
              styles={buttonStyles}
              text={"Anunciar"}
              onClick={() => console.log(11)}
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

const buttonStyles = {
  padding: "4px 30px",
  borderRadius: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  textTransform: "capitalize",
  backgroundColor: "#000000",
};

export default AdvertiseForm;
