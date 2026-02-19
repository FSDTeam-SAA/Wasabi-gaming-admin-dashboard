
import Providers from "@/components/providers/Providers";
import "./globals.css";
import { Toaster } from "sonner";
import TopLoader from "nextjs-toploader";

export const metadata = {
  title: "Aspiring Legal Network",
  description: "Wasabi Dashboard Application",
};





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F9FAFB]">
        <Toaster />
        <TopLoader color="#FFFF00" shadow="0 0 10px #147575, 0 0 5px #147575" showSpinner={false} height={4} easing="ease-in" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
