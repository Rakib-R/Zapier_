import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust path based on your setup
import { PlusIcon } from "lucide-react";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel = "New workflow",
  disabled = false,
  isCreating = false,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6">
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div>
        {onNew && !newButtonHref && (
          <Button
            className="flex bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
            onClick={onNew}
            disabled={disabled || isCreating}
          >
            <PlusIcon />
            {newButtonLabel}
          </Button>
        )}

        {newButtonHref && !onNew && (
          <Button
            className="flex bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            asChild
            disabled={disabled || isCreating}
          >
            <Link href={newButtonHref} prefetch>
              <PlusIcon />
              {newButtonLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

interface EntityContainerProps {
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
  children: React.ReactNode;
}

export const EntityContainer = ({
  header,
  children,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <main className="p-4 md:px-10 md:py-6 h-full">
      <div className=" w-full h-full flex flex-col gap-y-8 font-italic mx-auto ">
        {header}
        <div className="flex-1">
          {search}
          {children}
        </div>
        {/* 4. Bottom Pagination Layout Element */}
        {pagination}
      </div>
    </main>
  );
};
