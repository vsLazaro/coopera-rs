export async function getUserLocation(): Promise<GeolocationPosition | null> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            console.error("Geolocalização não é suportada pelo navegador.");
            resolve(null);
        } else {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        }
    });
}

export async function getCoordinatesFromAddress(address: string): Promise<{ lat: number; lon: number } | null> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        } else {
            console.error('Endereço não encontrado:', address);
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
        return null;
    }
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;

    const R = 6371; // Raio da Terra em km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
}