import { NextResponse } from "next/server";

interface hospitalImageData {
  link: string;
  sizeheight: string;
  sizewidth: string;
  thumbnail: string;
  title: string;
}

interface ResponseHospitalImageData {
  display: number;
  lastBuildDate: string;
  start: number;
  total: number;
  items: hospitalImageData[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const hospital = searchParams.get("hospital");
  const res = await fetch(
    `https://openapi.naver.com/v1/search/image.json?query=${hospital}`,
    {
      headers: {
        "X-Naver-Client-Id": `${process.env.NAVER_CLIENT_ID}`,
        "X-Naver-Client-Secret": `${process.env.NAVER_CLIENT_SECRET}`,
      },
    }
  );

  const photo: ResponseHospitalImageData = await res.json();

  const url = photo.items[0].link;

  return NextResponse.json({ image: url });
}
