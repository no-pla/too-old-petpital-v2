import Page from "@/app/login/page";
import AppRouterContextProviderMock from "@/provider/app-router-context-provider-mock";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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

  describe("로그인 폼 테스트", () => {
    it("모든 input이 제대로 랜더링 되었는지 확인한다.", () => {
      const emailInput = screen.getByLabelText(/이메일/i);
      const passwordInput = screen.getByLabelText(/비밀번호/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
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
    });
  });

  //   describe("로그인 플로우 테스트", () => {  TODO: 추후에 작성해 보기
  //     it("서버로 로그인 데이터를 보내는지 확인한다", () => {});
  //     it("가입되지 않은 유저일 경우 에러를 반환한다.", () => {});
  //     it("잘못된 비밀번호를 입력했을 경우 에러를 반환한다.", () => {});
  //     it("로그인을 성공하면 메인 페이지로 이동한다.", () => {});
  //   });
});
