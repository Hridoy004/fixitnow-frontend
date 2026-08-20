"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICategory } from "@/lib/types";
import {
  Check,
  CheckCircle2,
  Copy,
  FolderOpen,
  Hash,
  Trash2,
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteCategory } from "@/app/(dashboardGroup)/_actions/categoryActions";
import { CategoryFormDialog } from "./CategoryFormDialog";

type CategoryTableProps = {
  categories: ICategory[];
  isPending: boolean;
  onRefresh: () => void;
};

export function CategoryTable({
  categories,
  isPending,
  onRefresh,
}: CategoryTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const selectedCategory = categories.find(
    (category) => category.id === deleteId,
  );

  const busy = isPending || isDeleting;

  const handleDelete = () => {
    if (!deleteId) return;

    startDeleteTransition(async () => {
      try {
        const result = await deleteCategory(deleteId);

        if (!result.success) {
          toast.error(result.message || "Failed to delete category");
          return;
        }

        toast.success(result.message || "Category deleted successfully");

        setDeleteId(null);

        onRefresh();
      } catch (error) {
        console.error("Delete category error:", error);
        toast.error("Something went wrong while deleting category");
      }
    });
  };

  return (
    <>
      <Card className="overflow-hidden border-border shadow-sm">
        <CardHeader className="border-b border-border bg-muted/20 px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FolderOpen className="size-5 text-primary" />
              </div>

              <div>
                <CardTitle className="text-base font-semibold">
                  Service Categories
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage the service categories available across FixItNow.
                </p>
              </div>
            </div>

            <Badge variant="secondary" className="w-fit gap-1.5 px-3 py-1">
              <Hash className="size-3.5" />
              {categories.length}{" "}
              {categories.length === 1 ? "Category" : "Categories"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {categories.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="hidden md:block">
                <div className="grid grid-cols-[60px_minmax(180px,1fr)_minmax(300px,1.5fr)_170px] items-center border-b border-border bg-muted/30 px-6 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <div>#</div>
                  <div>Category</div>
                  <div>Category ID</div>
                  <div className="text-right">Actions</div>
                </div>

                <div className="divide-y divide-border">
                  {categories.map((category, index) => (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      index={index}
                      disabled={busy}
                      onDelete={() => setDeleteId(category.id)}
                      onEditSuccess={onRefresh}
                    />
                  ))}
                </div>
              </div>

              <div className="divide-y divide-border md:hidden">
                {categories.map((category, index) => (
                  <MobileCategoryRow
                    key={category.id}
                    category={category}
                    index={index}
                    disabled={busy}
                    onDelete={() => setDeleteId(category.id)}
                    onEditSuccess={onRefresh}
                  />
                ))}
              </div>
            </>
          )}
        </CardContent>

        {categories.length > 0 && (
          <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-3">
            <p className="text-xs text-muted-foreground">
              Total{" "}
              <span className="font-medium text-foreground">
                {categories.length}
              </span>{" "}
              {categories.length === 1 ? "category" : "categories"}
            </p>

            {busy && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                Updating...
              </div>
            )}
          </div>
        )}
      </Card>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <Trash2 className="size-5 text-destructive" />
            </div>

            <AlertDialogTitle>Delete category?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {selectedCategory?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                "Deleting..."
              ) : (
                <>
                  <Trash2 data-icon="inline-start" />
                  Delete Category
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

type CategoryRowProps = {
  category: ICategory;
  index: number;
  disabled: boolean;
  onDelete: () => void;
  onEditSuccess: () => void;
};

function CategoryRow({
  category,
  index,
  disabled,
  onDelete,
  onEditSuccess,
}: CategoryRowProps) {
  return (
    <div className="grid grid-cols-[60px_minmax(180px,1fr)_minmax(300px,1.5fr)_170px] items-center px-6 py-4 transition-colors hover:bg-muted/30">
      <div className="text-sm font-medium text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
          <FolderOpen className="size-4 text-primary" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium">{category.name}</p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3 text-primary" />
            Active
          </div>
        </div>
      </div>

      <CategoryId id={category.id} />

      <div className="flex justify-end gap-2">
        <CategoryFormDialog
          mode="edit"
          category={category}
          onSuccess={onEditSuccess}
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          disabled={disabled}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 data-icon="inline-start" />
          Delete
        </Button>
      </div>
    </div>
  );
}

function MobileCategoryRow({
  category,
  index,
  disabled,
  onDelete,
  onEditSuccess,
}: CategoryRowProps) {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-xs font-semibold text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0">
          <p className="font-medium">{category.name}</p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3 text-primary" />
            Active
          </div>
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
          Category ID
        </p>

        <CategoryId id={category.id} />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <CategoryFormDialog
            mode="edit"
            category={category}
            onSuccess={onEditSuccess}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={disabled}
          className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 data-icon="inline-start" />
          Delete
        </Button>
      </div>
    </div>
  );
}

function CategoryId({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);

      setCopied(true);

      toast.success("Category ID copied");

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy category ID error:", error);

      toast.error("Failed to copy category ID");
    }
  };

  return (
    <div className="flex min-w-0 items-center gap-2">
      <code className="min-w-0 flex-1 break-all rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs leading-5 text-muted-foreground">
        {id}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          className="shrink-0"
          title="Copy category ID"
        >
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5" />
          )}

          <span className="sr-only">Copy category ID</span>
        </Button>
      </code>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
        <FolderOpen className="size-6 text-primary" />
      </div>

      <h3 className="font-semibold">No categories yet</h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        You haven&apos;t created any service categories. Create your first
        category to get started.
      </p>
    </div>
  );
}
