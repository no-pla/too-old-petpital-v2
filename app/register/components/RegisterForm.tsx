"use client";

import React from "react";
import Input from "./Input";
import { FormProvider, useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "@/share/utils";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const methods = useForm<RegisterData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterData) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result?.error) {
      console.log(result.error);
      return;
    }
    router.push("/login");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-[52px] tablet:gap-4"
      >
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
        <Input
          label="비밀번호 재확인"
          type="password"
          id="confirmPassword"
          placeholder="비밀번호를 입력해 주세요."
          validation={{
            required: {
              value: true,
              message: "필수로 입력해야 합니다.",
            },
            validate: (value: string) =>
              value === methods.watch("password") ||
              "비밀번호가 일치하지 않습니다.",
          }}
        />
        <Input
          label="닉네임"
          type="text"
          id="nickname"
          placeholder="사용하실 닉네임을 입력해 주세요."
          validation={{
            required: {
              value: true,
              message: "필수로 입력해야 합니다.",
            },
            minLength: {
              value: 2,
              message: "닉네임은 2자리 이상 18자리 이하의 문자여야 합니다.",
            },
            maxLength: {
              value: 18,
              message: "닉네임은 2자리 이상 18자리 이하의 문자여야 합니다.",
            },
          }}
        />
        <Button
          text="회원가입"
          disabled={
            methods.formState.isDirty ? !methods.formState.isValid : false
          }
        />
      </form>
      <div className="underline text-[20px] text-main text-center mt-10 tablet:my-4">
        <Link href="/login">로그인하기</Link>
      </div>
    </FormProvider>
  );
};

export default RegisterForm;