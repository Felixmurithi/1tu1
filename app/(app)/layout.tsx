import localFont from "next/font/local";
import "@/app/globals.css";
import Header from "@/app/_components/Header";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "../fonts/GeistVF.woff",
  display: "swap",
});

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
    <html lang="en" className={`${myFont.className} tracking`}>
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
}

// body should be the only child ellement of html
