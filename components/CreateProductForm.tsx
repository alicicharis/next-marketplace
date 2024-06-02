"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import LoadingButton from "./LoadingButton";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(1).max(250),
  description: z.string().min(1).max(250),
  images: z.array(z.object({ file: z.any() })),
  price: z.coerce.number().gte(1, "Must be above 1"),
});

const CreateProductForm = () => {
  const createProduct = useMutation(api.products.createProduct);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);

  const [images, setImages] = useState<any>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const newImages: any = acceptedFiles.map((file: any, i: number) =>
      Object.assign(file, {
        id: i,
        preview: URL.createObjectURL(file),
      })
    );
    setImages((prevImages: any) => [...prevImages, ...newImages]);

    acceptedFiles.forEach((acceptedFile: any) =>
      append({
        file: acceptedFile,
      })
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const { append } = useFieldArray<any>({
    name: "images",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const url = await generateUploadUrl();

    const results = await Promise.all(
      values.images.map(async (value) => {
        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": value.file.type },
          body: value.file,
        });

        const { storageId } = await result.json();

        return storageId;
      })
    );

    const res = await createProduct({
      title: values.title,
      description: values.description,
      images: JSON.stringify(results),
      price: values.price,
    });
  };

  useEffect(() => {
    return () =>
      images.forEach((image: any) => URL.revokeObjectURL(image.preview));
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormControl>
                <div {...getRootProps()}>
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                  <Input
                    id="file-input"
                    type="file"
                    className="hidden"
                    {...getInputProps}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {images.length > 0 && (
          <div className="flex flex-wrap">
            {images.map((image: any, i: number) => (
              <div key={i} className="relative max-w-60">
                <Image
                  src={image.preview}
                  alt="user-image"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
                <div
                  // onClick={() => removeImageHandler(0)}
                  className="absolute inset-0 bg-black rounded-lg bg-opacity-100 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-70 flex items-center justify-center"
                >
                  <p className="text-white text-lg">Click to remove</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Submitting"
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
};

export default CreateProductForm;
