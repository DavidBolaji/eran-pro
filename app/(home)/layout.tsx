import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Header2 } from "@/components/header/header2";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header2 />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
