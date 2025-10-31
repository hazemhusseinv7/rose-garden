interface VideoType {
  url: string;
  originalFilename?: string;
  mimeType?: string;
  size?: number;
}

interface HeroType {
  title: string;
  backgroundVideo: {
    asset: VideoType;
  };
  videoAltText?: string;
}
