// app/providers.tsx
"use client";
import Loading from "@/components/Loading";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <AntdRegistry>
      <NextUIProvider>{children}</NextUIProvider>
    </AntdRegistry>
  );
}
