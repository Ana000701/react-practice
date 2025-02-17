import axios from "axios";
import toast from "react-hot-toast";

const apiPath = import.meta.env.VITE_API_PATH;

export async function getProducts() {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)signinToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}//v2/api/${apiPath}/admin/products`
    );
    return response.data.products;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProduct(id) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/v2/api/${apiPath}/admin/product/${id}`
    );
    toast.success("刪除成功");
  } catch (err) {
    toast.error("刪除失敗：", err);
  }
}

export async function createProduct(values) {
  try {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/v2/api/${apiPath}/admin/product`,
      { data: { ...values, is_enabled: values.is_enabled ? 1 : 0 } }
    );
    toast.success("新增成功");
  } catch (err) {
    toast.error("新增失敗：", err);
  }
}

export async function updateProduct(id, values) {
  try {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/v2/api/${apiPath}/admin/product/${id}`,
      { data: { ...values, is_enabled: values.is_enabled ? 1 : 0 } }
    );
    toast.success("編輯成功");
  } catch (err) {
    toast.error("編輯失敗：", err);
  }
}
