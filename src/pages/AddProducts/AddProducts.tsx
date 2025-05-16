import FileInput from "../../components/FileInput/FileInput";
import {HeaderCompleto} from "../../components/header/headerCompleto";
import "./AddProducts.scss";
import Grid from "@mui/material/Grid2";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
    Tooltip
} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HelpIcon from '@mui/icons-material/HelpOutline';
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import {useState} from "react";
import {AssignCharacteristics} from "../../components/AssignCharacteristics/AssignCharacteristics.tsx";

export function AddProducts() {
    const [subCategoryIds, setSubCategoryIds] = useState<number[]>([0]);
    const [idCounter, setIdCounter] = useState(1);
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    const [characteristicsByIndex, setCharacteristicsByIndex] = useState<Record<number, string[]>>({});

    const handlePreviewFileChange = (files: any[]) => {
        console.log("Arquivos recebidos do FileInput:", files);
    };

    const handleOpenModal = (id: number) => {
        setOpenModalIndex(id);
        setCharacteristicsByIndex(prev => ({
            ...prev,
            [id]: prev[id] || [""]
        }));
    };

    const updateCharacteristics = (id: number, newValues: string[]) => {
        setCharacteristicsByIndex(prev => ({
            ...prev,
            [id]: newValues
        }));
    };

    const handleRemoveSubCategory = (id: number) => {
        setSubCategoryIds(prev => prev.filter(i => i !== id));
        setCharacteristicsByIndex(prev => {
            const updated = {...prev};
            delete updated[id];
            return updated;
        });
        if (openModalIndex === id) {
            setOpenModalIndex(null);
        }
    };

    const categoriasPlaceholder = "Categorias";
    const tooltip = "O preço padrão define um valor geral para o produto, mas pode ser ajustado individualmente em cada variação após clicar em \"Concluir\"."
    return (
        <Grid>
            <HeaderCompleto/>
            <p className="title">Adicionar <b>item</b> à loja</p>

            <Grid container spacing={2} direction="column" className="mainContainer">
                <Grid container direction="row">
                    <div className="fileInput">
                        <FileInput onChange={handlePreviewFileChange} limit={1}/>
                    </div>

                    <Grid container direction="column" className="productDescriptionContainer">
                        <TextField label="Nome" variant="outlined"/>
                        <TextareaAutosize
                            className="productDescription"
                            minRows={3}
                            placeholder="Descrição do produto"
                        />
                    </Grid>
                </Grid>

                <Grid container
                      className="categorySelector"
                      direction="column">
                    <p><b>Categorias</b></p>

                    <FormControl>
                        <InputLabel>{categoriasPlaceholder}</InputLabel>
                        <Select label={categoriasPlaceholder}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                        >
                            <MenuItem value={10}>Categoria 1</MenuItem>
                            <MenuItem value={20}>Categoria 2</MenuItem>
                            <MenuItem value={30}>Categoria 3</MenuItem>
                            <MenuItem value={40}>Categoria 4</MenuItem>
                            <MenuItem value={50}>Categoria 5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <p><b>Sub-Categorias</b></p>

                {subCategoryIds.map((id, i) => (
                    <Grid container direction="column" className="subcategoryMainContainer" key={id}>
                        <div className="subcategoryContainer">
                            <TextField
                                variant="outlined"
                                label={`Ex: Cor`} 
                                className="subcategorySelector"
                            />

                            {i === subCategoryIds.length - 1 && (
                                <AddCircleIcon
                                    className="addButton"
                                    onClick={() => {
                                        setSubCategoryIds(prev => [...prev, idCounter]);
                                        setIdCounter(prev => prev + 1);
                                    }}
                                    style={{cursor: "pointer"}}
                                />
                            )}
                            {subCategoryIds.length > 1 && (
                                <CancelIcon
                                    className="excludeSubcategoryButton"
                                    onClick={() => handleRemoveSubCategory(id)}
                                    style={{cursor: "pointer"}}
                                />
                            )}
                        </div>

                        <Grid container direction="row" className="atribuirCaracteristicas">
                            <p><b>Atribuir Características</b></p>
                            <IconButton onClick={() => handleOpenModal(id)}>
                                <ChevronRightIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}

                {openModalIndex !== null && (
                    <AssignCharacteristics
                        isOpen={true}
                        onClose={() => setOpenModalIndex(null)}
                        state={characteristicsByIndex[openModalIndex] || [""]}
                        setState={(newState) => updateCharacteristics(openModalIndex, newState)}
                    />
                )}

                <Grid container direction="row" className="precoContainer">
                    <p>Preço padrão</p>
                    <TextField
                        className="precoTextField"
                        label="Reais (R$)"
                        type="number"
                        variant="outlined"
                    />
                    <Tooltip title={tooltip}
                             placement={"top-start"}>
                        <HelpIcon style={{cursor: 'pointer'}}/>
                    </Tooltip>
                </Grid>

                <Button
                    className="confirmButton"
                    variant="contained"
                    onClick={() => {
                    }}
                >
                    Concluir
                </Button>
            </Grid>
        </Grid>
    );
}
