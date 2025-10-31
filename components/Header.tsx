import CardNav from "./CardNav";

const Header = () => {
  const items = [
    {
      label: "About",
      bgColor: "var(--color-primary-1)",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "#" },
        { label: "Careers", ariaLabel: "About Careers", href: "#" },
      ],
    },
    {
      label: "Projects",
      bgColor: "var(--color-primary-2)",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "#" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#" },
      ],
    },
    {
      label: "Contact",
      bgColor: "var(--color-primary-4)",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "#" },
        { label: "Twitter", ariaLabel: "Twitter", href: "#" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "#" },
      ],
    },
  ];

  return (
    <header>
      <CardNav
        logo="/logo/logo-horizontal.svg"
        logoAlt="Company Logo"
        items={items}
        baseColor="rgba(255,255,255,0.85)"
        menuColor="#000"
        buttonBgColor="var(--color-primary-1)"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </header>
  );
};

export default Header;
