import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Container } from "@/components/site/Container";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <Container className="py-10">{children}</Container>
      <Footer />
    </div>
  );
}

