import localFont from "next/font/local";
import "@/app/globals.css";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "../fonts/GeistVF.woff",
  display: "swap",
});

export const metadata = {
  // title: "The wild oasis",
  title: {
    template: "%s / 1tu1",
    default: "Welcome / 1tu1",
  },

  description:
    "Kuomba number and heys ends here. Meet a date at your favourite restuarant.",
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
