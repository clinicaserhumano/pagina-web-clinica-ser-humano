import { queryOne } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";

// El panel siempre lee datos actuales de la base de datos (nunca una copia de la compilación)
export const dynamic = "force-dynamic";

async function getPendingComments() {
  try {
    const row = await queryOne<{ total: number }>("SELECT COUNT(*) AS total FROM comments WHERE aprobado = 0");
    return Number(row?.total ?? 0);
  } catch {
    return 0;
  }
}

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pendingComments = await getPendingComments();

  return (
    <div className="flex min-h-screen bg-[#f4f4f2]">
      <AdminSidebar pendingComments={pendingComments} />
      <div className="ml-60 flex flex-1 flex-col">{children}</div>
    </div>
  );
}