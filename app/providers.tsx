// app/providers.tsx
"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <NextUIProvider>{children}</NextUIProvider>
    </AntdRegistry>
  );
}
