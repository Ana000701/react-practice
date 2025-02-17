import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/services/apiProducts";
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
import { Button } from "./ui/button";

function DeleteProduct({ product }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
  });
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none py-2 px-4 text-white mr-2 bg-red-600 hover:bg-redr-500'
          onClick={() => setOpen(true)}
        >
          刪除
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>刪除商品</DialogTitle>
            <DialogDescription>確定要刪除產品嗎</DialogDescription>
          </DialogHeader>
          <Button
            className='bg-red-600 hover:bg-red-500'
            onClick={() => mutate(product.id)}
          >
            刪除
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteProduct;

DeleteProduct.propTypes = {
  product: PropTypes.object,
  setOpen: PropTypes.func,
};
