import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { createProduct, updateProduct } from "@/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().nonempty("請輸入標題"),
  category: z.string().nonempty("請輸入分類"),
  unit: z.string().nonempty("請輸入單位"),
  origin_price: z.number().min(0),
  price: z.number().min(0),
  description: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
  imagesUrl: z.array(z.string()),
  is_enabled: z.unknown(),
});

function ProductForm({ product, setOpen }) {
  const queryClient = useQueryClient();
  const { mutate: create } = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
  });
  const { mutate: update } = useMutation({
    mutationFn: ({ id, updatedProduct }) => updateProduct(id, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product ? product.title : "",
      category: product ? product.category : "",
      unit: product ? product.unit : "",
      origin_price: product ? product.origin_price : 0,
      price: product ? product.price : 0,
      description: product ? product.description : "",
      content: product ? product.content : "",
      imageUrl: product ? product.imageUrl : "",
      imagesUrl: product && product.imagesUrl ? product.imagesUrl : [""],
      is_enabled: product && product.is_enabled === 1 ? true : false,
    },
  });
  const { control, register, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "imagesUrl",
  });

  function onSubmit(values) {
    try {
      if (product) {
        update({ id: product.id, updatedProduct: values });
      } else {
        create(values);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-2 w-full scrollbar px-2 mx-auto py-10 overflow-y-scroll'
      >
        <div className='space-y-4 w-1/2'>
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>主圖</FormLabel>
                <FormControl>
                  <Input placeholder='請輸入圖片連結' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <img
            src={product?.imageUrl}
            alt={product?.title}
            className='rounded w-[300px]'
          />
          {fields.map((field, index) => (
            <div key={field.id} className='space-y-1.5'>
              <FormField
                control={control}
                name={`imagesUrl.${index}`}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>副圖 {index + 1}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`圖片網址 ${index + 1}`}
                        type='text'
                        {...inputField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-end gap-2'>
                {product && product.imagesUrl && product.imagesUrl[index] && (
                  <img
                    src={product.imagesUrl[index]}
                    alt={`副圖 ${index + 1}`}
                    className='rounded w-[100px]'
                  />
                )}
                <Button type='button' onClick={() => remove(index)}>
                  移除
                </Button>
              </div>
            </div>
          ))}
          <Button type='button' onClick={() => append("")}>
            新增副圖
          </Button>
        </div>
        <div className='space-y-4 w-1/2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>標題</FormLabel>
                <FormControl>
                  <Input placeholder='請輸入標題' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>分類</FormLabel>
                <FormControl>
                  <Input placeholder='請輸入分類' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='unit'
            render={({ field }) => (
              <FormItem>
                <FormLabel>單位</FormLabel>
                <FormControl>
                  <Input placeholder='請輸入單位' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='origin_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>原價</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='請輸入原價'
                        type='number'
                        {...field}
                        {...register("origin_price", { valueAsNumber: true })}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>售價</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='請輸入售價'
                        type='number'
                        {...field}
                        {...register("price", { valueAsNumber: true })}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>商品描述</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='請輸入商品描述'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>說明內容</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='請輸入說明內容'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_enabled'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>是否啟用</FormLabel>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type='submit' className='bg-chart-2 hover:bg-chart-3'>
            {product ? "編輯" : "新增"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
