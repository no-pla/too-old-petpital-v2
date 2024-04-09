import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, credentials, account }) {
      if (!credentials) {
        if (account?.provider === "naver") {
          const userExist = await prisma.user.findUnique({
            where: {
              email: profile?.response!.email,
            },
          });

          if (!userExist) {
            const newUser = await prisma.user.create({
              data: {
                email: profile?.response!.email!,
                image: profile?.response!.profile_image!,
                name: profile?.response!.nickname!,
                createdAt: new Date().toLocaleDateString(),
              },
            });
            user.id = newUser.id;
          } else {
            user = Object.assign(user, userExist);
          }
        }
        if (account?.provider === "google") {
          const userExist = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });

          if (!userExist) {
            const newUser = await prisma.user.create({
              data: {
                name: profile?.name!,
                email: profile?.email!,
                image: profile?.picture!,
                createdAt: new Date().toLocaleDateString(),
              },
            });
            user.id = newUser.id;
          } else {
            user = Object.assign(user, userExist);
          }
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
};
