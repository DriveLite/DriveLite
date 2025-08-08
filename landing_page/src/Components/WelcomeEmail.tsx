// emails/WelcomeEmail.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
  Button,
} from "@react-email/components";

export default function WelcomeEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to DriveLite. You&apos;re on the waitlist!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Welcome to DriveLite</Text>

            <Text style={paragraph}>
              Hey {email},<br />
              <br />
              You&apos;re officially on the waitlist. We&apos;re building an
              open-source, S3-compatible file platform that respects your
              control and scales with you.
            </Text>

            <Button style={button} href="https://drivelite.org">
              Visit DriveLite
            </Button>

            <Text style={footer}>The DriveLite Team</Text>
          </Section>
        </Container>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (prefers-color-scheme: dark) {
                body {
                  background-color: #0f172a !important;
                  color: #f8fafc !important;
                }
                .container {
                  background-color: #1e293b !important;
                }
                .heading {
                  color: #e2e8f0 !important;
                }
                .paragraph {
                  color: #cbd5e1 !important;
                }
                .footer {
                  color: #94a3b8 !important;
                }
                a.button {
                  background-color: #60a5fa !important;
                }
              }
            `,
          }}
        />
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f9fafb",
  padding: "40px 0",
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  colorScheme: "light dark",
} as const;

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 30px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
} as const;

const section = {
  textAlign: "center" as const,
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#111827",
  marginBottom: "12px",
} as const;

const paragraph = {
  fontSize: "16px",
  color: "#4b5563",
  lineHeight: 1.6,
  marginBottom: "32px",
} as const;

const button = {
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  padding: "14px 24px",
  borderRadius: "8px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
  className: "button",
} as const;

const footer = {
  fontSize: "13px",
  color: "#9ca3af",
  marginTop: "32px",
} as const;
