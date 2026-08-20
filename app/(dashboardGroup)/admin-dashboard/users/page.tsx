import { Suspense } from "react";
import { UserTable } from "./_components/UserTable";
import { UserTableSkeleton } from "./_components/UserTableSkeleton";

type AdminUsersPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export const instant = false;

const AdminUsersPage = async ({ searchParams }: AdminUsersPageProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>

        <p className="text-sm text-muted-foreground">
          Manage users, roles, and account status.
        </p>
      </div>

      <Suspense key={page} fallback={<UserTableSkeleton />}>
        <UserTable page={page} />
      </Suspense>
    </div>
  );
};

export default AdminUsersPage;
