import { extractPhotos } from "../utils/extractPhotos";

const FALLBACK = "https://ftp.goit.study/img/campers-test-task/1-1.webp";

export default function CvrImg({ camper, width = 240, height = 160 }) {
  const photos = extractPhotos(camper);
  const src = photos[0] || FALLBACK;

  return (
    <img
      src={src}
      alt={`${camper?.name ?? "Camper"} cover`}
      width={width}
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={(e) => {
        if (src !== FALLBACK) e.currentTarget.src = FALLBACK;
        else e.currentTarget.style.display = "none";
      }}
    />
  );
}
