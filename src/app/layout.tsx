import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Nathan Gill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const branch = (process.env.BRANCH_TYPE as "prod" | "dev") || "prod";
  const previewStyle = branch === "dev" ? `
    .preview {
        display: block;
    }
  `:`
    .preview {
        display: none;
    }
  `;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-light.svg" type="image/svg+xml" media="(prefers-color-scheme: light)"/>
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)"/>
        <link rel="icon" href="/favicon-light.ico" type="image/x-icon" media="(prefers-color-scheme: light)"/>
        <link rel="icon" href="/favicon-dark.ico" type="image/x-icon" media="(prefers-color-scheme: dark)"/>
        <link rel="apple-touch-icon" id="apple-touch-icon" href="/apple-touch-icon-light.png" media="(prefers-color-scheme: light)"/>
        <link rel="apple-touch-icon" id="apple-touch-icon" href="/apple-touch-icon-dark.png" media="(prefers-color-scheme: dark)"/>
        <link rel="apple-touch-icon" id="apple-touch-icon" href="/apple-touch-icon.png"/>
        <link rel="mask-icon" href="/favicon-light.svg" color="#ffffff" media="(prefers-color-scheme: light)"/>
        <link rel="mask-icon" href="/favicon-light.svg" color="#000000" media="(prefers-color-scheme: dark)"/>
        <style dangerouslySetInnerHTML={{ __html: previewStyle }} />
      </head>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
        </ThemeProvider>
      </body>
      <SpeedInsights />
    </html>
  );
}
