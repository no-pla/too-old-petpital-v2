import React from "react";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { vi } from "vitest";

// 라우터 컨텍스트를 mock하기 위해 내부 라이브러리에서 import해온다.

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>;
  children: React.ReactNode;
};

const AppRouterContextProviderMock = ({
  children,
  router,
}: AppRouterContextProviderMockProps): React.ReactNode => {
  const mockedRouter: AppRouterInstance = {
    back: vi.fn(), // 모의 함수로 정의
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    ...router, // 혹시 있을지 모르는 나머지 속성을 가져오기 위함으로, 필요한 메서드만 모의 함수로 지정해도 된다.
  };

  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  );
};

export default AppRouterContextProviderMock;
