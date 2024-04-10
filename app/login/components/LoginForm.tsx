"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "@/share/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiUser, FiLock } from "react-icons/fi";
import Button from "@/app/register/components/Button";
import Image from "next/image";
import OAuthButton from "./OAuthButton";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  error: string | null;
  ok: boolean;
  status: number;
  url: string | null;
}

const LoginForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginData) => {
    await signIn("credentials", {
      ...data,
      redirect: false,
    }).then((res: LoginResponse | undefined) => {
      if (res?.ok) {
        router.push("/");
      } else {
        console.log(res?.error);
      }
    });
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-[564px] bg-white pt-[52px] px-[92px] border border-[#24979E] tablet:px-6">
        <Image
          src="/logo/logo.png"
          alt="펫피탈 로고"
          width={368}
          height={0}
          className="mx-auto mb-10 max-w-[60%] min-w-[182px] tablet:mb-10"
        />
        <div className="pb-8 text-center">
          {errors && errors["email"] && (
            <p className="text-warn tablet:text-[14px] mb-1 whitespace-pre-line">
              {errors["email"]?.message?.toString()}
            </p>
          )}
          {errors && errors["password"] && (
            <p className="text-warn tablet:text-[14px] whitespace-pre-line">
              {errors["password"]?.message?.toString()}
            </p>
          )}
        </div>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="relative">
            <div className="absolute top-1/2 transform left-6 -translate-y-1/2">
              <FiUser color="#C5C5C5" className="w-6 h-6" />
            </div>
            <label htmlFor="email" className="hidden">
              이메일
            </label>
            <input
              id="email"
              placeholder="이메일"
              className={`w-full ${errors["email"] ? "border-warn" : "border-[#c5c5c5]"} border-[0.4px] py-5 pl-[64px] bg-[#FAFAFA] text-[14px] rounded-t`}
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "이메일은 필수로 입력해야 합니다.",
                },
                pattern: {
                  value: emailPattern,
                  message: "올바르지 않은 형식의 이메일입니다.",
                },
              })}
            />
          </div>
          <div className="relative mb-8 tablet:mb-10">
            <div className="absolute top-1/2 transform left-6 -translate-y-1/2">
              <FiLock color="#C5C5C5" className="w-6 h-6" />
            </div>
            <label htmlFor="password" className="hidden">
              비밀번호
            </label>
            <input
              id="password"
              placeholder="비밀번호"
              className={`w-full ${errors["password"] ? "border-warn" : "border-[#c5c5c5]"}  border-[0.4px] py-5 pl-[64px] bg-[#FAFAFA] text-[14px] rounded-b`}
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "비밀번호는 필수로 입력해야 합니다.",
                },
                pattern: {
                  value: passwordPattern,
                  message:
                    "올바르지 않은 형식의 비밀번호입니다.\n(8자리 이상의 영어 대소문자와 숫자 조합)",
                },
              })}
            />
          </div>
          <Button text="로그인" disabled={isDirty ? !isValid : false} />
        </form>
        <div className="mt-[80px] px-4 text-center text-[14px] text-[#C5C5C5] max-w-3xl relative before:content-[''] before:block before:w-[calc(50%-30px)] before:h-[2px] before:bg-[#C5C5C5] before:left-0 before:top-1/2 before:absolute after:content-[''] after:block after:w-[calc(50%-30px)] after:h-[2px] after:bg-[#C5C5C5] after:right-0 after:top-1/2 after:absolute tablet:mt-[66px]">
          또는
        </div>
        <div className="my-[40px] tablet:mt-[32px] flex justify-center gap-5">
          <OAuthButton
            type="naver"
            onClick={() =>
              signIn("naver", {
                callbackUrl: "/",
              })
            }
          />
          <OAuthButton
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
            type="google"
          />
        </div>
      </div>
      <div className="text-main text-[14px] text-center mt-4 before:content-['|'] before:pr-6 after:content-['|'] after:pl-6">
        <Link href="/register">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginForm;
