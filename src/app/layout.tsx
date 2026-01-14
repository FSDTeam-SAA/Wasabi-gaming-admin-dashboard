
import Providers from "@/components/providers/Providers";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Wasabi - Dashboard",
  description: "Wasabi Dashboard Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F9FAFB]">
        <Toaster/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
