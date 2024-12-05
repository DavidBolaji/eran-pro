import { Wrapper } from "@/components/wrapper/wrapper";
import { IsAuth } from "./components/is-auth";

export default function HomeOrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-grey-200">
      <Wrapper>
        <IsAuth />
        {children}
      </Wrapper>
    </div>
  );
}
