import Page from "@/app/register/page";
import AppRouterContextProviderMock from "@/provider/app-router-context-provider-mock";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    const push = vi.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Page />
      </AppRouterContextProviderMock>
    );
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

        expect(
          screen.queryByText(/올바르지 않은 형식/i)
        ).not.toBeInTheDocument();

        await act(async () => {
          fireEvent.change(emailInput, {
            target: { value: "invalidEmail" },
          });
          fireEvent.blur(emailInput);
        });
        const errorMessage = screen.queryByText(/올바르지 않은 형식/i);
        expect(errorMessage).toBeInTheDocument();
      });

      it("유효하지 않은 비밀번호를 입력했을 때", async () => {
        const passwordInput = screen.getByLabelText("비밀번호");

        expect(
          screen.queryByText(/올바르지 않은 형식/i)
        ).not.toBeInTheDocument();

        await act(async () => {
          fireEvent.change(passwordInput, {
            target: { value: "invalidPw" },
          });
          fireEvent.blur(passwordInput);
        });

        const errorMessage = screen.queryByText(/올바르지 않은 형식/i);

        expect(errorMessage).toBeInTheDocument();

        await act(async () => {
          fireEvent.change(passwordInput, {
            target: { value: "validPw1234" },
          });
        });
        expect(errorMessage).not.toBeInTheDocument();
      });

      it("비밀번호가 일치하지 않을 때", async () => {
        const passwordInput = screen.getByLabelText("비밀번호");
        const confirmPasswordInput = screen.getByLabelText("비밀번호 재확인");

        expect(
          screen.queryByText("비밀번호가 일치하지 않습니다.")
        ).not.toBeInTheDocument();

        await act(async () => {
          fireEvent.change(passwordInput, {
            target: { value: "validPw1234" },
          });
        });

        await act(async () => {
          fireEvent.change(confirmPasswordInput, {
            target: { value: "notTheSamePassword" },
          });
        });

        expect(
          screen.queryByText("비밀번호가 일치하지 않습니다.")
        ).toBeInTheDocument();

        await act(async () => {
          fireEvent.change(confirmPasswordInput, {
            target: { value: "validPw1234" },
          });
        });

        expect(
          screen.queryByText("비밀번호가 일치하지 않습니다.")
        ).not.toBeInTheDocument();
      });

      it("유효하지 않은 닉네임을 입력했을 때", async () => {
        const nicknameInput = screen.getByLabelText(/닉네임/i);

        expect(screen.queryByText(/닉네임은/i)).not.toBeInTheDocument();

        await act(async () => {
          fireEvent.change(nicknameInput, {
            target: { value: "tooMuchLongLongLongNickName" },
          });
        });

        expect(screen.queryByText(/닉네임은/i)).toBeInTheDocument();

        await act(async () => {
          fireEvent.change(nicknameInput, {
            target: { value: "validNN" },
          });
        });
        expect(screen.queryByText(/닉네임은/i)).not.toBeInTheDocument();
      });
    });
  });
  //   describe("회원가입 플로우 테스트", () => { TODO: 추후에 작성해 보기
  // it("서버로 회원 가입 데이터를 보내는지 확인한다.", () => {});
  // it("이미 가입된 유저거나, 빈 필드를 전달하면 에러를 반환한다.", () => {});
  // it("가입을 완료하면 로그인 페이지로 이동한다.", () => {});
  //   });
});
