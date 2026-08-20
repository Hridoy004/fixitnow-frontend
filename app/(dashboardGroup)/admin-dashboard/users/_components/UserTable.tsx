import { getAllUsers } from "@/app/(dashboardGroup)/_actions/userActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/lib/types";

import { UserPagination } from "./UserPagination";

type UserTableProps = {
  page: number;
};

export async function UserTable({ page }: UserTableProps) {
  const result = await getAllUsers(page, 10);

  if (!result.success || !result.data?.length) {
    return (
      <div className="rounded-xl border border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">No users found.</p>
      </div>
    );
  }

  const { meta } = result;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {result.data.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {user.phone || "-"}
                </TableCell>

                <TableCell>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    {user.role}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={
                      user.activeStatus === "ACTIVE"
                        ? "rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground"
                        : "rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {user.activeStatus}
                  </span>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserPagination
        page={meta.page}
        total={meta.total}
        limit={meta.limit}
        totalPages={meta.totalPages}
      />
    </div>
  );
}
