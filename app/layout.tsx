import type { Metadata } from "next";
import Provider from "@/provider/Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | PETPITAL",
    default: "PETPITAL",
  },
  description: "동물병원 정보 공유 사이트",
  keywords: ["동물병원", "동물 병원 리뷰", "반려동물 병원"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
