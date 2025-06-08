"use client";
import React from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import { ICategory, TMeta } from "@/types";
import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type TManageCategoriesProps = {
  categories: ICategory[];
  meta: TMeta;
};
const ManageCategories = ({ categories, meta }: TManageCategoriesProps) => {
  console.log(categories, meta);


  const handleDelete = (data:ICategory) => {
    console.log(data)
  }

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-8">
          <Image
            src={row.original.icon}
            alt={row.original.name || "icon"}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />

          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 bg-green-100 rounded px-1 w-14 text-center">
              Active
            </p>
          ) : (
            <p className="text-red-500 bg-red-100 rounded px-1 w-14 text-center">
              Inactive
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <Button className="text-red-500 bg-red-100 hover:bg-red-200 cursor-pointer" title="delete" onClick={function(){
          return handleDelete(row.original)
        }}>
          <Trash className="h-4 w-4"/>
        </Button>
      ),
    },
  ];
  return (
    <section>
      <header className="flex items-center justify-between mb-10">
        <h2>Manage Categories</h2>
        <CreateCategoryModal />
      </header>

      <NMTable data={categories} columns={columns} />
    </section>
  );
};

export default ManageCategories;
