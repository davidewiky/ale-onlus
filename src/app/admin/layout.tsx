import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Area riservata
        </span>
        <h1 className="text-3xl font-bold text-ink-900">Pannello di amministrazione</h1>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <AdminSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
