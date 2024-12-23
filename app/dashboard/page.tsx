import { DashboardAuthForm } from "@/components/form/dashboard-auth-form";

export const revalidate = 0;

export default async function DashboardAuthPage({}) {
  return <div className="bg-grey-200 flex items-center justify-center w-full  h-screen">
    <DashboardAuthForm />
  </div>;
}
