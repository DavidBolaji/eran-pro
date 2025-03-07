import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";


import Loading from "@/components/loading";
import { Sidebar } from "../components/sidebar";
import { DashboardHeader } from "../components/dashboard-header";
import { IsAuthAdmin } from "../components/is-auth-admin";
import { CategoryBlogDrawer } from "@/components/drawer/category-drawer/category-blog-drawer";
import { CategoryDrawer } from "@/components/drawer/category-drawer/category-drawer";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <IsAuthAdmin admin />
      <Sidebar />
      <Layout>
        <DashboardHeader />
        <Content
          style={{
            minHeight: "89vh",
            height: "89vh",
          }}
          className={`overflow-auto scrollbar-hide`}
        >
          <Loading />
          {children}
          <CategoryDrawer />
          <CategoryBlogDrawer />
        </Content>
      </Layout>
    </Layout>
  );
}
