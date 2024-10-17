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
      <body className="">{children}</body>
    </html>
  );
}
