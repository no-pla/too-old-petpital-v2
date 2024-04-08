import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import NaverProvider from "next-auth/providers/naver";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "text",
          placeholder: "이메일을 입력해 주세요.",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // authorize => jwt callback => session callback
        if (!credentials?.email || !credentials.password) {
          throw new Error("비어 있는 칸이 있습니다.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("가입되지 않은 유저이거나 SNS로 가입한 유저입니다.");
        }

        const hashedPassword = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (!hashedPassword) {
          throw new Error("이메일 또는 비밀번호가 정확하지 않습니다.");
        }

        return user;
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!credentials) {
        const userExist = await prisma.user.findUnique({
          where: {
            email: profile?.response.email,
          },
        });

        if (!userExist) {
          await prisma.user.create({
            data: {
              email: profile?.response.email!,
              image: profile?.response.profile_image!,
              name: profile?.response.nickname!,
              createdAt: new Date().toLocaleDateString(),
            },
          });
        } else {
          user = Object.assign(user, userExist);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
