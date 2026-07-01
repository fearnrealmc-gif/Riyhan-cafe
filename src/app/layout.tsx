import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rayhan Cafe | ريحان كافيه — تجربة قهوة فاخرة",
  description:
    "استمتع بتجربة قهوة مختصة فاخرة ومعجنات طازجة وتصفح قائمة الأسعار في ريحان كافيه.",
  keywords: ["ريحان كافيه", "Rayhan Cafe", "قهوة مختصة", "كافيه", "اسبريسو", "كريب", "وافل", "بانكيك", "مشروبات ساخنة", "مشروبات باردة", "عصائر", "كوكتيلات"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rayhan Cafe | ريحان كافيه — تجربة قهوة فاخرة",
    description: "استمتع بتجربة قهوة مختصة فاخرة ومعجنات طازجة وتصفح قائمة الأسعار في ريحان كافيه.",
    type: "website",
    images: [
      {
        url: "/logo_circular.png",
        width: 800,
        height: 800,
        alt: "Rayhan Cafe Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayhan Cafe | ريحان كافيه",
    description: "استمتع بتجربة قهوة مختصة فاخرة ومعجنات طازجة وتصفح قائمة الأسعار في ريحان كافيه.",
    images: ["/logo_circular.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} h-full`}>
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-offwhite text-charcoal antialiased font-arabic">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
