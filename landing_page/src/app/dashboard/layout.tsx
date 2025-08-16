import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminid = process.env.ADMIN_ID;
  const { userId } = await auth();
  if (!userId || userId !== adminid) {
    redirect("/");
  }
  return <>{children}</>;
}
