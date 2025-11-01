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
  backgroundVideoMobile?: {
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

interface CategoryType {
  title: string;
  description?: any[];
}

interface AuthorType {
  name: string;
  image?: any;
  bio?: any[];
}
interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: any;
  publishedAt?: string;
  body: any[];
  author?: AuthorType;
  categories?: CategoryType[];
}
