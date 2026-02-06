import localFont from "next/font/local";
import "@/app/globals.css";
import Header from "@/app/_components/Header";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "../fonts/GeistVF.woff",
  display: "swap",
});

export const metadata = {
  title: "1tu1",
  description: "Find a life partner who matches ur interest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${myFont.className}`}>
      <body className="grid grid-rows-[auto_1fr]">
        <Header />

        {children}
      </body>
    </html>
  );
}

// body should be only child ellement of html

// uysing grid u dont even have to use h-full on child componenet
