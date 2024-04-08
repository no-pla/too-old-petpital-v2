import Page from "@/app/page";
import Provider from "@/provider/Provider";
import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

it("랜더링 테스트", () => {
  render(<Page />);

  const heading = screen.getByText("Page");
  expect(heading).toBeInTheDocument();
});
