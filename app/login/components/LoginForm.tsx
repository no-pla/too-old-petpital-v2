"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "@/share/utils";
import Input from "@/app/register/components/Input";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const methods = useForm<LoginData>({
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
    }).then((res: SignInResponse | undefined) => {
      if (res?.ok) {
        router.push("/");
      } else {
        console.log(res?.error);
      }
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
        <Input
          label="이메일"
          type="email"
          id="email"
          placeholder="사용하실 이메일을 입력해 주세요."
          validation={{
            required: {
              value: true,
              message: "필수로 입력해야 합니다.",
            },
            pattern: {
              value: emailPattern,
              message: "올바르지 않은 형식의 이메일입니다.",
            },
          }}
        />
        <Input
          label="비밀번호"
          type="password"
          id="password"
          placeholder="비밀번호를 입력해 주세요."
          validation={{
            required: {
              value: true,
              message: "필수로 입력해야 합니다.",
            },
            pattern: {
              value: passwordPattern,
              message:
                "올바르지 않은 형식의 비밀번호입니다. (8자리 이상의 영어 대소문자와 숫자 조합)",
            },
          }}
        />
        <button>로그인</button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
