import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/apiProducts";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Header from "@/components/Header";
import AddProduct from "@/components/AddProduct";
import UpdateProduct from "@/components/UpdateProduct";
import DeleteProduct from "@/components/DeleteProduct";

function ProductList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending)
    return (
      <>
        <Header />
        loading...
      </>
    );
  if (isError)
    return (
      <>
        <Header />
        Error...
      </>
    );

  return (
    <>
      <Header />
      <div className='container flex justify-center gap-10  mt-5 px-10'>
        <div className='w-full'>
          <div className='flex justify-between'>
            <h2 className='font-bold text-4xl mb-5'>產品列表</h2>
            <AddProduct />
          </div>
          <Table>
            <TableCaption>產品資料</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>產品名稱</TableHead>
                <TableHead>原價</TableHead>
                <TableHead>售價</TableHead>
                <TableHead>是否啟用</TableHead>
                <TableHead>編輯／刪除</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.origin_price}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {product.is_enabled === 1 ? (
                      <p className='text-green-600'>啟用</p>
                    ) : (
                      <p className='text-neutral-600'>未啟用</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <UpdateProduct product={product} />
                    <DeleteProduct product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ProductList;
