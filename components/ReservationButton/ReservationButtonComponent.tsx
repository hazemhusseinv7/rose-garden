"use client";

import { Button } from "@heroui/react";

import { RiWhatsappFill } from "react-icons/ri";

const ReservationButtonComponent = ({ whatsapp }: { whatsapp: string }) => {
  return (
    <Button
      as="a"
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      color="success"
      endContent={<RiWhatsappFill className="size-4" />}
      className="fixed bottom-4 start-4 z-100"
    >
      للحجز عن طريق الواتساب
    </Button>
  );
};

export default ReservationButtonComponent;
