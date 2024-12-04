import localFont from "next/font/local";
import "@/app/globals.css";

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
      <body>{children}</body>
    </html>
  );
}

// ""./fonts/GeistVF.woff" src when using
