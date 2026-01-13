
import Providers from "@/components/providers/Providers";
import "./globals.css";

export const metadata = {
  title: "Wasabi - Dashboard",
  description: "Wasabi Dashboard Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
