import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { ProvidersWrapper } from "@/providers/ProvidersWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Gestão de Estoque",
  // description: "Gestão de estoque - Senac Lavras.",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ProvidersWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
