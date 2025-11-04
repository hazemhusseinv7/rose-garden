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

interface ContactEmailProps {
  fullname: string;
  phone: string;
  email?: string;
  message: string;
}

export const ContactEmail = ({
  fullname,
  phone,
  email,
  message,
}: ContactEmailProps) => {
  return (
    <Html dir="rtl">
      <Head />
      <Tailwind>
        <Preview>رسالة جديدة من {fullname}</Preview>
        <Body>
          <Container className="max-w-2xl mx-auto p-6">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              رسالة جديدة
            </Heading>

            <Section className="mb-6">
              <Text className="text-lg font-semibold text-gray-700">
                التفاصيل:
              </Text>
              <Text className="text-gray-600">
                <strong>الإسم:</strong> {fullname}
              </Text>

              <Text className="text-gray-600">
                <strong>رقم الهاتف:</strong> {phone}
              </Text>

              {email && (
                <Text className="text-gray-600">
                  <strong>البريد الإلكتروني:</strong> {email}
                </Text>
              )}
            </Section>

            <Section>
              <Text className="text-lg font-semibold text-gray-700">
                الرسالة:
              </Text>
              <Text className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {message}
              </Text>
            </Section>

            <Section className="mt-8 pt-6 border-t border-gray-200">
              <Text className="text-sm text-gray-500">
                تم إرسال هذا البريد الإلكتروني من نموذج التواصل في الموقع
                الإلكترونى.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
