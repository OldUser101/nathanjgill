import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

export const metadata: Metadata = {
  title: "Nathan Gill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="favicon-light.svg" type="image/svg+xml" media="(prefers-color-scheme: light)"/>
        <link rel="icon" href="favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)"/>
        <link rel="icon" href="favicon-light.ico" type="image/x-icon" media="(prefers-color-scheme: light)"/>
        <link rel="icon" href="favicon-dark.ico" type="image/x-icon" media="(prefers-color-scheme: dark)"/>
        <link rel="apple-touch-icon" href="apple-touch-icon-light.png" media="(prefers-color-scheme: light)"/>
        <link rel="apple-touch-icon" href="apple-touch-icon-dark.png" media="(prefers-color-scheme: dark)"/>
      </head>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
