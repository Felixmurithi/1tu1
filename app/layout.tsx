import Header from "@/app/_components/Header";

import "@/app/globals.css";

export const metadata = {
  title: "Ideally",
  description: "Find a life partner who matches ur interest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[auto_1fr_auto] mx-auto">
        <Header />
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
