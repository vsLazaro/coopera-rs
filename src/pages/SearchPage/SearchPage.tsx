import "./SearchPage.scss"
import Grid from "@mui/material/Grid2"
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import {HeaderCompleto} from "../../components/header/headerCompleto.tsx";
import {useState} from "react";
import {StoreExhibition} from "../../components/StoreExhibition/StoreExhibition.tsx";


export function SearchPage() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('Roupas e Tecidos');
    const categorias = ["Lojas", "Itens"];


    return (
        <Grid>
            <HeaderCompleto/>
            <Grid container
                  direction="column"
                  className="titleContainer"
            >
                <p className="p1">Encontre sua próxima conexão</p>
                <p className="subtitle">Descubra novas empresas na sua região</p>
            </Grid>
            <SearchBar/>

            <div className="categorias">
                {categorias.map((cat) => (
                    <button
                        key={cat}
                        className={`categoria-btn ${cat === categoriaSelecionada ? 'ativa' : ''}`}
                        onClick={() => setCategoriaSelecionada(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <StoreExhibition/>
        </Grid>
    );
}