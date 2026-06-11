import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAdminUser, getSessionUser } from "@/lib/auth";
import ConsoleShell from "./_components/ConsoleShell";

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  // Server-side admin gate: non-admins never load the console chrome. The
  // /api/console/* routes still enforce admin too (defense in depth).
  const admin = await getAdminUser();
  if (!admin) {
    const session = await getSessionUser();
    if (!session) redirect("/login");
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="pixel-card p-8 text-center">
          <p className="font-pixel text-xs text-roblox-red mb-2">Access Denied</p>
          <p className="text-text-secondary text-sm">You don&apos;t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  // Suspense: the shell and section pages read the URL via useSearchParams.
  return (
    <Suspense>
      <ConsoleShell>{children}</ConsoleShell>
    </Suspense>
  );
}
