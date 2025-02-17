import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

function UpdateProduct({ product }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none py-2 px-4 text-white mr-2 bg-chart-2 hover:bg-chart-3'
          onClick={() => setOpen(true)}
        >
          編輯
        </DialogTrigger>
        <DialogContent className='h-[500px] max-w-5xl'>
          <DialogHeader>
            <DialogTitle>編輯商品</DialogTitle>
            <DialogDescription>請輸入商品資訊</DialogDescription>
          </DialogHeader>
          <ProductForm product={product} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateProduct;

UpdateProduct.propTypes = { product: PropTypes.object };
