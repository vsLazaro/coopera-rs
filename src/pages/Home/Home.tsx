import { useState, useEffect, ReactElement } from "react";
import { getUserLocation, calculateDistance, getCoordinatesFromAddress } from "../../services/LocationService/LocationService";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.scss";
import { Carousel } from '../../components/Carousel/Carousel.tsx';
import { HeaderCompleto } from "../../components/header/headerCompleto";
import { SponsorCarouselSlide } from "../../components/Carousel/SponsorCarouselSlide/SponsorCarouselSlide.tsx";
import { StoreMenuCarouselSlide } from "../../components/Carousel/StoreMenuCarouselSlide/StoreMenuCarouselSlide.tsx";
import Grid from "@mui/material/Grid2";
import { lojasMock } from "../../mocks.tsx";

const categorias = [
    "Roupas e Tecidos",
    "Eletrônicos",
    "Outlets",
    "Móveis e Decoração",
];

const patrocinadores = [
    {
        image: 'https://i.scdn.co/image/ab6775700000ee859f67648c277f519d6598f3dc',
        link: 'https://portal.pucrs.br/ensino-e-pesquisa/',
        date: '2025-05-05',
    },
    {
        image: 'https://picsum.photos/200/300',
        link: 'https://example.com/2',
        date: '2025-05-04',
    },
    {
        image: 'https://picsum.photos/200/300',
        link: 'https://example.com/3',
        date: '2025-05-03',
    },
    {
        image: 'https://picsum.photos/300/300',
        link: 'https://example.com/4',
        date: '2025-05-02',
    },
];


export default function Home() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('Roupas e Tecidos');
    const [/* termoPesquisa */, setTermoPesquisa] = useState('');
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [distances, setDistances] = useState<{ [storeName: string]: number }>({});

    useEffect(() => {
        // Captura o parâmetro "search" da URL
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get('search') || '';
        setTermoPesquisa(searchQuery);
    }, []);

    useEffect(() => {
        async function fetchUserLocation() {
            const position = await getUserLocation();
            if (position) {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            }
        }
        fetchUserLocation();
    }, []);

    useEffect(() => {
        async function calculateDistances() {
            if (userLocation) {
                const calculatedDistances: { [storeName: string]: number } = {};

                for (const store of lojasMock) {
                    const coordinates = await getCoordinatesFromAddress(store.address);
                    if (coordinates) {
                        const distance = calculateDistance(
                            userLocation.lat,
                            userLocation.lon,
                            coordinates.lat,
                            coordinates.lon
                        );
                        calculatedDistances[store.name] = distance;
                    }
                }

                setDistances(calculatedDistances);
            }
        }
        calculateDistances();
    }, [userLocation]);

    const handleSearch = (query: string) => {
        setTermoPesquisa(query);
    };

    const patrocinadoresOrdenados = patrocinadores
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const sponsorCarouselSlides: ReactElement[] = patrocinadoresOrdenados.map((sponsor) => (
        <SponsorCarouselSlide
            image={sponsor.image}
            link={sponsor.link}
            date={sponsor.date}
        />
    ));

    const lojasCarouselSlides: ReactElement[] = [];

    lojasMock
        .filter(loja => loja.category === categoriaSelecionada)
        .forEach((loja, index) => {
            lojasCarouselSlides.push(
                <StoreMenuCarouselSlide
                    store={loja}
                    key={index}
                    distance={distances[loja.name]} // Passa a distância calculada
                />
            );
        });

    return (
        <>
            <HeaderCompleto />
            <Grid container direction="column" className="hero">
                <h1 className="hero-title">Encontre sua próxima conexão</h1>
                <p className="hero-subtitle">Descubra novas empresas na sua região</p>
            </Grid>
            <SearchBar onSearch={handleSearch} />

            <Grid container className="categorias-container">
                <Grid className="categorias">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            className={`categoria-btn ${cat === categoriaSelecionada ? 'ativa' : ''}`}
                            onClick={() => setCategoriaSelecionada(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </Grid>
            </Grid>
            <Carousel content={lojasCarouselSlides} rows={1} maxSlidesPerView={3} spaceBetween={20} />

            <Grid className="patrocinadores-container">
                <h1>Nossos Patrocinadores</h1>
                <Carousel content={sponsorCarouselSlides} rows={1} maxSlidesPerView={3} spaceBetween={20} />
            </Grid>
        </>
    );
}