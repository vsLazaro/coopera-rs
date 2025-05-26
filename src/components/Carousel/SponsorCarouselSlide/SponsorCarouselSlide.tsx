import "./SponsorCarouselSlide.scss"

interface SponsorCarouselSlideProps {
  image: string;
  link: string;
  date: string;
}

export function SponsorCarouselSlide({ image, link }: SponsorCarouselSlideProps) {
  return (
    <a
      className="sponsorPhotoLink"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      aria-label="Ir para página do patrocinador"
    >
      <img className="sponsorPhoto" src={image} alt="Sponsor" />
    </a>
  );
}