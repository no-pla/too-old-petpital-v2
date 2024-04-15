"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
};

export default Provider;
