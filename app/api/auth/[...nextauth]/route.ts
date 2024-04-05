import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

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

        if (!user) {
          throw new Error("이메일 또는 비밀번호가 정확하지 않습니다.");
        }

        const hashedPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!hashedPassword) {
          throw new Error("이메일 또는 비밀번호가 정확하지 않습니다.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
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
  secret: process.env.AUTH_SECRET,
});
export { handler as GET, handler as POST };
