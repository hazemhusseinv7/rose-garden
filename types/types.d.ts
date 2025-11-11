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

type SettingsType = {
  email: string;
  phone: string;
  twitter?: string;
  tiktok?: string;
  instagram?: string;
  snapchat?: string;
  whatsapp?: string;
  enableCompetition: boolean;
};

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
  images: ImageType[];
}

interface FacilitiesType {
  accordions: {
    title: string;
    items?: string[];
    images?: ImageType[];
  }[];
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
