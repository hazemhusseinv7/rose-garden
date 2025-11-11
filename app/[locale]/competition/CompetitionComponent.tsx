"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { addToast } from "@heroui/react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface CompetitionComponentProps {
  settings: SettingsType | null;
}

interface FormDataType {
  fullname: string;
  city: string;
  phone: string;
  email: string;
  specialization: string;
  portfolio: string;
  agreeToTerms: boolean;
}

const CompetitionComponent = ({ settings }: CompetitionComponentProps) => {
  const t = useTranslations("Competition");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    fullname: "",
    city: "",
    phone: "",
    email: "",
    specialization: "",
    portfolio: "",
    agreeToTerms: false,
  });

  const handleInputChange = (
    field: keyof FormDataType,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      addToast({
        title: t("messages.error.title"),
        description: t("messages.error.checkbox"),
        color: "danger",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/competition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addToast({
          title: t("messages.success.title"),
          description: t("messages.success.description"),
          color: "success",
        });

        // Reset form
        setFormData({
          fullname: "",
          city: "",
          phone: "",
          email: "",
          specialization: "",
          portfolio: "",
          agreeToTerms: false,
        });
      } else {
        throw new Error(t("messages.error.title"));
      }
    } catch (error) {
      addToast({
        title: t("messages.error.title"),
        description: t("messages.error.description"),
        color: "danger",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <h2 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">
          {t("title")}
        </h2>

        <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
          <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
            <div>
              <h3 className="mb-3 text-lg font-semibold">
                {t("cards.card-1")}
              </h3>
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
              <h3 className="mb-3 text-lg font-semibold">
                {t("cards.card-2")}
              </h3>
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
            <h3 className="text-xl font-semibold">{t("form.title")}</h3>

            <div className="**:[&>label]:block mt-4 space-y-6 *:space-y-3">
              <div>
                <Label htmlFor="fullname" className="space-y-2">
                  {t("form.fullname")}
                </Label>
                <Input
                  type="text"
                  id="fullname"
                  value={formData.fullname}
                  onChange={(e) =>
                    handleInputChange("fullname", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="city" className="space-y-2">
                  {t("form.city")}
                </Label>
                <Input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="space-y-2">
                  {t("form.phone")}
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
                  {t("form.email")}
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <Select
                  dir={direction}
                  value={formData.specialization}
                  onValueChange={(value) =>
                    handleInputChange("specialization", value)
                  }
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("form.specialization.label")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t("form.specialization.participation.label")}
                      </SelectLabel>
                      <SelectItem value="Photographer">
                        {t("form.specialization.participation.item-1")}
                      </SelectItem>
                      <SelectItem value="Videographer">
                        {t("form.specialization.participation.item-2")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="portfolio" className="space-y-2">
                  {t("form.portfolio")}
                </Label>
                <Input
                  type="text"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) =>
                    handleInputChange("portfolio", e.target.value)
                  }
                  required
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeToTerms", checked as boolean)
                  }
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  {t("form.checkbox")}
                </Label>
              </div>

              <Button className="w-full" disabled={isLoading}>
                {t("form.button")}
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default CompetitionComponent;
