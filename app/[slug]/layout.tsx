// app/providers.tsx

import { getOne } from "@/services/server";
import { ConfigProvider } from "antd";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  //   console.log(params);
  const Form: GetFormResponse = await getOne("forms", params.slug);

  //   console.log();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Form?.form?.primary_color || "#FFF",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
