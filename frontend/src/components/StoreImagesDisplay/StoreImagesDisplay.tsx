import React from 'react';
import './StoreImagesDisplay.scss';

interface Image {
  id: number;
  src: string;
  type: 'quadrada' | 'retangular-deitada' | 'retangular-em-pe';
}

interface StoreImagesDisplayProps {
  images: Image[];
  maxSize?: string; // Define o tamanho máximo do grid (ex: "500px", "80%")
  Size?: string; // Define o tamanho do grid (ex: "500px", "80%")
}

const StoreImagesDisplay: React.FC<StoreImagesDisplayProps> = ({ images, maxSize }) => {
  return (
    <div className="store-images-display" style={{ maxWidth: maxSize }}>
      {images.map((image) => (
        <div key={image.id} className={`image-container ${image.type}`}>
          <img src={image.src} alt={`Imagem ${image.id}`} />
        </div>
      ))}
    </div>
  );
};

export default StoreImagesDisplay;