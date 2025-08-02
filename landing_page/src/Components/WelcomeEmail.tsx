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
            <Img
              src="https://drivelite.org/logo.svg"
              alt="DriveLite Logo"
              width="64"
              height="64"
              style={{ margin: "0 auto", marginBottom: 20 }}
            />

            <Text style={heading}>Welcome to DriveLite 👋</Text>

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
  backgroundColor: "#fff",
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
} as const;

const footer = {
  fontSize: "13px",
  color: "#9ca3af",
  marginTop: "32px",
} as const;
