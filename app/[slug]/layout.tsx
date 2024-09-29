// app/providers.tsx

import { FormModel } from "@/components/FormComponent";
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
  const Form: FormModel = await getOne("forms", params.slug);

  //   console.log();
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: Form?.color_scheme?.primary || "#FFF",
          //   borderRadius: 2,

          // Alias Token
          //   colorBgContainer: "#f6ffed",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
