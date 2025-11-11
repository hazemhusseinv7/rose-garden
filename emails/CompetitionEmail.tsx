import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface CompetitionEmailProps {
  fullname: string;
  city: string;
  phone: string;
  email?: string;
  specialization: string;
  portfolio: string;
}

export const CompetitionEmail = ({
  fullname,
  city,
  phone,
  email,
  specialization,
  portfolio,
}: CompetitionEmailProps) => {
  const specializationText =
    specialization === "photography" ? "تصوير فوتوغرافي" : "تصوير فيديو";

  return (
    <Html dir="rtl">
      <Head />
      <Tailwind>
        <Preview>طلب مشاركة جديد في المسابقة من {fullname}</Preview>
        <Body>
          <Container className="max-w-2xl mx-auto p-6">
            <Heading className="text-2xl font-bold text-zinc-800 mb-4">
              طلب مشاركة جديد في مسابقة جمال روز يُروى بعدسة
            </Heading>

            <Section className="mb-6">
              <Text className="text-lg font-semibold text-zinc-800">
                التفاصيل:
              </Text>
              <Text className="text-zinc-700">
                <strong>الإسم الكامل:</strong> {fullname}
              </Text>

              <Text className="text-zinc-700">
                <strong>المدينة:</strong> {city}
              </Text>

              <Text className="text-zinc-700">
                <strong>رقم الهاتف:</strong> {phone}
              </Text>

              {email && (
                <Text className="text-zinc-700">
                  <strong>البريد الإلكتروني:</strong> {email}
                </Text>
              )}
            </Section>

            <Section className="mb-6">
              <Text className="text-lg font-semibold text-zinc-800">
                معلومات المشاركة:
              </Text>
              <Text className="text-zinc-700">
                <strong>نوع التخصص:</strong> {specializationText}
              </Text>

              <Text className="text-zinc-700">
                <strong>رابط المحفظة/الإنستغرام:</strong>
              </Text>
              <Text className="text-blue-600 underline break-all">
                {portfolio}
              </Text>
            </Section>

            <Section className="mt-8 pt-6 border-t border-zinc-200">
              <Text className="text-sm text-zinc-500">
                تم إرسال هذا البريد الإلكتروني من نموذج المشاركة في المسابقة
                بالموقع الإلكتروني.
              </Text>
              <Text className="text-sm text-zinc-500 mt-2">
                تاريخ الطلب: {new Date().toLocaleDateString()}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CompetitionEmail;
