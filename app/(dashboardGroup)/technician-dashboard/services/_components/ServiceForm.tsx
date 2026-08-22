"use client";

import {
  createService,
  updateService,
} from "@/app/(dashboardGroup)/_actions/serviceActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ICategory, IService } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ServiceFormProps {
  service?: IService;
  categories: ICategory[];
}

export default function ServiceForm({ service, categories }: ServiceFormProps) {
  const router = useRouter();

  const isEdit = Boolean(service);

  const [title, setTitle] = useState(service?.title ?? "");

  const [description, setDescription] = useState(service?.description ?? "");

  const [price, setPrice] = useState(service?.price?.toString() ?? "");

  const [categoryId, setCategoryId] = useState(service?.categoryId ?? "");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Service title is required.");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      categoryId,
    };

    try {
      setLoading(true);

      const result = isEdit
        ? await updateService(service!.id, payload)
        : await createService(payload);

      if (!result.success) {
        toast.error(result.message ?? "Something went wrong.");
        return;
      }

      toast.success(
        result.message ??
          `Service ${isEdit ? "updated" : "created"} successfully.`,
      );

      router.push("/technician-dashboard/services");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-xl border border-border bg-background"
    >
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Service Title</Label>

          <Input
            id="title"
            placeholder="e.g. AC Repair"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>

          <Textarea
            id="description"
            placeholder="Describe your service..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>

          <Input
            id="price"
            type="number"
            min="0"
            placeholder="2500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>

          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={loading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => router.push("/technician-dashboard/services")}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
              ? "Update Service"
              : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
