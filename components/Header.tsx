import { getHeaderData } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

import CardNav from "@/components/CardNav";

const Header = async () => {
  const data: HeaderType | null = await getHeaderData();

  const items = data?.navigationItems.map(({ title, image, links }, i) => {
    const colors = [
      "var(--color-primary-1)",
      "var(--color-primary-2)",
      "var(--color-primary-5)",
    ];

    return {
      label: title,
      bgColor: colors[i],
      image: image ? urlFor(image).url() : "",
      textColor: "#fff",
      links: links?.map(({ name, href }) => ({
        label: name,
        href: href,
        ariaLabel: name,
      })),
    };
  });

  return (
    <header>
      <CardNav
        logo="/logo/logo-horizontal-alt.svg"
        logoAlt="Logo"
        items={items}
        baseColor="oklch(92% 0.004 286.32)"
        menuColor="var(--color-primary-1)"
        buttonBgColor="var(--color-primary-1)"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </header>
  );
};

export default Header;
