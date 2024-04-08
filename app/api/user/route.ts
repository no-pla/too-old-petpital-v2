import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // 회원 가입 로직 작성
  const { email, password, confirmPassword, nickname } = await req.json();

  if (!email || !password || !confirmPassword || !nickname) {
    return NextResponse.json(
      { error: "비어 있는 칸이 있습니다." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "비밀번호 재확인 비밀번호가 비밀번호와 일치하지 않습니다." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && user.password !== null) {
    return NextResponse.json(
      { error: "이미 가입한 유저입니다." },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        password: hashedPassword,
        name: nickname,
      },
      create: {
        email,
        password: hashedPassword,
        image: "img/default-image", // TODO: 임시값
        name: nickname,
        createdAt: new Date().toLocaleDateString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "예기치 못한 에러가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "회원가입 성공" });
}
// export function PATCH() {
//   //TODO: 회원정보 수정 로직 작성
// }
// export function DELETE() {
//   //TODO: 회원 탈퇴 로직 작성
// }
