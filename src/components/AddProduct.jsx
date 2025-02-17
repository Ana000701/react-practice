import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { useState } from "react";

function AddProduct() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none py-2 px-4 text-white mr-2 bg-chart-2 hover:bg-chart-3 mb-4'>
          新增商品
        </DialogTrigger>
        <DialogContent className='h-[500px] max-w-5xl'>
          <DialogHeader>
            <DialogTitle>新增商品</DialogTitle>
            <DialogDescription>請輸入商品資訊</DialogDescription>
          </DialogHeader>
          <ProductForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddProduct;
