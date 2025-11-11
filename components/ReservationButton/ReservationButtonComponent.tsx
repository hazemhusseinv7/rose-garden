"use client";

import { useTranslations } from "next-intl";

import { Button } from "@heroui/react";

import { RiWhatsappFill } from "react-icons/ri";

const ReservationButtonComponent = ({ whatsapp }: { whatsapp: string }) => {
  const t = useTranslations("ReservationButton");

  return (
    <Button
      as="a"
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      color="success"
      endContent={<RiWhatsappFill className="size-4" />}
      className="fixed bottom-4 start-4 z-90"
    >
      {t("content")}
    </Button>
  );
};

export default ReservationButtonComponent;
