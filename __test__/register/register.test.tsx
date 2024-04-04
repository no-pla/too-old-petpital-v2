import Page from "@/app/register/page";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    render(<Page />);
  });
  describe("회원가입 폼 테스트", () => {
    it("모든 input이 제대로 랜더링 되었는지 확인한다.", () => {
      const inputs = screen.getAllByRole("textbox"); // 이메일과 닉네임 input 비밀번호 input은 가져오지 못함
      const pwInputs = screen.getAllByLabelText(/비밀번호/i);
      expect(inputs).toHaveLength(2);
      expect(pwInputs).toHaveLength(2);
    });
    describe("유효하지 않은 값을 넣으면 버튼이 비활성화되고 에러 메시지가 보여진다.", () => {
      it("유효하지 않은 이메일을 입력했을 때", async () => {
        const emailInput = screen.getByLabelText(/이메일/i);
        const errorMessage = screen.queryByRole("paragraph");

        expect(errorMessage).not.toBeInTheDocument();

        await fireEvent.change(emailInput, {
          target: { value: "invalidEmail" },
        });

        expect(errorMessage).toBeInTheDocument();
      });
      it("유효하지 않은 비밀번호를 입력했을 때", async () => {
        const passwordInput = screen.getByLabelText("비밀번호");
        const errorMessage = screen.queryByRole("paragraph");

        expect(errorMessage).not.toBeInTheDocument();

        await fireEvent.change(passwordInput, {
          target: { value: "invalidPw" },
        });

        expect(errorMessage).toBeInTheDocument();

        await fireEvent.change(passwordInput, {
          target: { value: "validPw1234" },
        });

        expect(errorMessage).not.toBeInTheDocument();
      });
      it("비밀번호가 일치하지 않을 때", async () => {
        const passwordInput = screen.getByLabelText("비밀번호");
        const confirmPasswordInput = screen.getByLabelText("비밀번호 재확인");
        const errorMessage = screen.getByRole("paragraph");

        await fireEvent.change(passwordInput, {
          target: { value: "validPw1234" },
        });

        await fireEvent.change(confirmPasswordInput, {
          target: { value: "notTheSamePassword" },
        });

        expect(errorMessage).toBeInTheDocument();

        await fireEvent.change(confirmPasswordInput, {
          target: { value: "validPw1234" },
        });

        expect(errorMessage).not.toBeInTheDocument();
      });
      it("유효하지 않은 닉네임을 입력했을 때", async () => {
        const nicknameInput = screen.getByLabelText(/닉네임/i);
        const errorMessage = screen.queryByRole("paragraph");

        expect(errorMessage).not.toBeInTheDocument();

        await fireEvent.change(nicknameInput, {
          target: { value: "tooMuchLongLongLongNickName" },
        });

        expect(errorMessage).toBeInTheDocument();

        await fireEvent.change(nicknameInput, {
          target: { value: "validNN" },
        });

        expect(errorMessage).not.toBeInTheDocument();
      });
    });
  });
  //   describe("회원가입 플로우 테스트", () => { TODO: 추후에 작성해 보기
  // it("서버로 회원 가입 데이터를 보내는지 확인한다.", () => {});
  // it("이미 가입된 유저거나, 빈 필드를 전달하면 에러를 반환한다.", () => {});
  // it("가입을 완료하면 로그인 페이지로 이동한다.", () => {});
  //   });
});
