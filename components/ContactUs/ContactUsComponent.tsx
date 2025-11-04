"use client";

import { useState } from "react";
import Link from "next/link";

import { addToast } from "@heroui/react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ContactUsComponentProps {
  settings: SettingsType | null;
}

interface FormDataType {
  fullname: string;
  phone: string;
  email?: string;
  message: string;
}

const ContactUsComponent = ({ settings }: ContactUsComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    fullname: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addToast({
          title: "تم الإرسال بنجاح",
          description: "شكراً لتواصلك معنا سنرد عليك فى أقرب وقت",
          color: "success",
        });

        // Reset form
        setFormData({
          fullname: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("فشل في إرسال الرسالة");
      }
    } catch (error) {
      addToast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        color: "danger",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 lg:px-0">
      <h2 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">
        تواصل معنا
      </h2>

      <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
        <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
          <div>
            <h3 className="mb-3 text-lg font-semibold">رقم الهاتف</h3>
            <Link
              dir="ltr"
              href={`tel:${settings?.phone}`}
              className="text-lg text-primary-4 hover:underline dark:text-primary-4"
            >
              {settings?.phone}
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
          <div>
            <h3 className="mb-3 text-lg font-semibold">البريد الإلكترونى</h3>
            <Link
              href={`mailto:${settings?.email}`}
              className="text-lg text-primary-4 hover:underline dark:text-primary-4"
            >
              {settings?.email}
            </Link>
          </div>
        </div>
      </div>

      <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
      <form
        className="border px-4 py-12 lg:px-0 lg:py-24"
        onSubmit={handleSubmit}
      >
        <Card className="mx-auto max-w-lg p-8 sm:p-16">
          <h3 className="text-xl font-semibold">للاستفسارات والحجوزات</h3>

          <div className="**:[&>label]:block mt-4 space-y-6 *:space-y-3">
            <div>
              <Label htmlFor="name" className="space-y-2">
                الإسم
              </Label>
              <Input
                type="text"
                id="name"
                value={formData.fullname}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="space-y-2">
                رقم الهاتف
              </Label>
              <Input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="space-y-2">
                البريد الإلكترونى
              </Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="message" className="space-y-2">
                الرسالة
              </Label>
              <Textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                required
              />
            </div>
            <Button className="w-full" disabled={isLoading}>
              إرسال
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default ContactUsComponent;
