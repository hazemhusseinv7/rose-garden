interface ImageType {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}
interface VideoType {
  url: string;
  originalFilename?: string;
  mimeType?: string;
  size?: number;
}

interface SettingsType {
  twitter?: string;
  tiktok?: string;
  instagram?: string;
  whatsapp?: string;
}

interface HeroType {
  title: string;
  backgroundVideo: {
    asset: VideoType;
  };
  videoAltText?: string;
}

interface AboutUsType {
  image: ImageType;
}
