"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

import React from "react";
import { toast } from "sonner";
import { CreateCategories } from "@/services/category";

const CreateCategoryModal = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [open, setOpen] = useState(false);

  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    
    const data = {
        name:payload?.name,
        description:payload?.description,
    }

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("icon", imageFiles[0] as File);

      const result = await CreateCategories(formData);

      if (result?.success) {
        toast.success(result?.message || "Created Category");
        setOpen(false)
        form.reset()
        setImageFiles([])
        setImagePreview([])
      } else {
        toast.error(result?.message || "Failed to Created Category");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to Created Category");
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Create Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader className="mb-5">
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="w-full md:w-3/5" >
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-36 border-2"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {imagePreview.length > 0 ? (
                  <div className="mt-6 w-full  md:w-2/5">
                    <ImagePreviewer
                      setImageFiles={setImageFiles}
                      imagePreview={imagePreview}
                      setImagePreview={setImagePreview}
                
                    />
                  </div>
                ) : (
                  <div className="mt-6 w-full  md:w-2/5">
                    <NMImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Logo"
                    />
                  </div>
                )}
              </div>

              <Button type="submit" className="mt-5 w-full">
                {isSubmitting ? "Creating...." : "Create"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategoryModal;
