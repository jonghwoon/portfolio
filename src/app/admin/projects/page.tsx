import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminProjectsClient from "./AdminProjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Projects</h1>
          <p className="admin-subtitle">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new" className="btn-admin-primary">
          + Add Project
        </Link>
      </div>
      <AdminProjectsClient projects={projects} />
    </>
  );
}
