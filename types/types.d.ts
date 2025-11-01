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

interface HeaderType {
  navigationItems: {
    title: string;
    image?: ImageType;
    links?: { name: string; href: string }[];
  }[];
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

interface TestimonialsType {
  testimonials: { name: string; content: string }[];
}
