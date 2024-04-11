import type { Metadata } from "next";
import Provider from "@/provider/Provider";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | PETPITAL",
    default: "PETPITAL",
  },
  description: "동물병원 정보 공유 사이트",
  keywords: ["동물병원", "동물 병원 리뷰", "반려동물 병원"],
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard" suppressHydrationWarning={true}>
        <Provider>{children}</Provider>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
