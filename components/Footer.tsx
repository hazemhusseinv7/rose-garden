import Image from "next/image";
import Link from "next/link";

import { getSettingsData } from "@/lib/sanity/queries";

import {
  FaXTwitter,
  FaTiktok,
  FaInstagram,
  FaRegCopyright,
} from "react-icons/fa6";
import { RiWhatsappLine } from "react-icons/ri";

const Footer = async () => {
  const settings: SettingsType | null = await getSettingsData();

  const links = [
    {
      title: "المرافق والأنشطة",
      href: "#",
    },
    {
      title: "المدونة",
      href: "/blog",
    },
    {
      title: "احجز الآن",
      href: "/reservation",
    },
    {
      title: "تواصل معنا",
      href: "#",
    },
  ];

  const socialMedia = [
    {
      name: "Twitter",
      link: settings?.twitter,
      icon: FaXTwitter,
    },
    {
      name: "Tiktok",
      link: settings?.tiktok,
      icon: FaTiktok,
    },
    {
      name: "Instagram",
      link: settings?.instagram,
      icon: FaInstagram,
    },
    {
      name: "Whatsapp",
      link: settings?.whatsapp,
      icon: RiWhatsappLine,
    },
  ].filter((item) => item.link);

  return (
    <footer className="py-16 md:py-20 relative">
      {/* Copper Forge Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(96, 108, 56, 0.25), transparent 70%)",
        }}
      />
      {/* Your Content/Components */}

      <div className="mx-auto max-w-5xl px-6 relative">
        <Link href="/" aria-label="Home" className="mx-auto block size-fit">
          <Image
            src="/logo/logo-horizontal.svg"
            width={180}
            height={180}
            alt="Logo"
            className="w-45 h-auto"
          />
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {socialMedia.map(({ name, link, icon: Icon }, i) => (
            <Link
              key={i}
              href={link!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-muted-foreground hover:text-primary block transition-colors duration-300"
            >
              <Icon className="size-6" />
            </Link>
          ))}
        </div>
        <span className="flex items-center justify-center gap-1 text-muted-foreground text-center text-sm">
          {" "}
          <FaRegCopyright className="inline" /> {new Date().getFullYear()} جميع
          الحقوق محفوظة.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
