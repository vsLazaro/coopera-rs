import "./AssignCharacteristics.scss";
import Grid from "@mui/material/Grid2";
import {TextField} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";

export interface AssignmentProps {
    isOpen: boolean;
    onClose: () => void;
    state: string[];
    setState: (value: string[]) => void;
}

export function AssignCharacteristics({isOpen, onClose, state, setState}: AssignmentProps) {
    if (!isOpen) return null;

    const handleAdd = () => setState([...state, ""]);

    const handleChange = (index: number, value: string) => {
        const updated = [...state];
        updated[index] = value;
        setState(updated);
    };

    const handleRemove = (index: number) => {
        const newState = state.filter((_, i) => i !== index);
        setState(newState);
    };

    return (
        <Grid container
              className="modalBackground">
            <Grid container
                  direction="column"
                  className="modalWindow">
                <p className="assignTitle">Atribuir Características</p>

                {state.map((value, i) => (
                    <Grid container
                          direction="row"
                          className="characteristicsContainer"
                          key={i}>

                        <div className="textFieldContainer">
                            <TextField
                                className="characteristicsField"
                                variant="outlined"
                                label={`Característica ${i + 1}`}
                                value={value}
                                onChange={(e) => handleChange(i, e.target.value)}
                            />

                            {state.length > 1 && (
                                <CancelIcon className="excludeCharacteristicButton" onClick={() => handleRemove(i)}/>
                            )}
                        </div>

                        {i === state.length - 1 && (
                            <AddCircleIcon
                                className="addCharacteristicButton"
                                onClick={handleAdd}
                                style={{cursor: "pointer"}}
                            />
                        )}
                    </Grid>
                ))}

                <Grid container
                      className="buttonContainer"
                      spacing={4}>
                    <Button className="assignButton"
                            variant="contained"
                            onClick={onClose}>
                        Atribuir
                    </Button>
                    <Button className="cancelButton"
                            variant="contained"
                            onClick={() => {
                                setState([""])
                                onClose()
                            }}>
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
