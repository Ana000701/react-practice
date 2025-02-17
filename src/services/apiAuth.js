import axios from "axios";
import toast from "react-hot-toast";

const url = import.meta.env.VITE_BASE_URL;

export async function Signin(values, navigate) {
  try {
    const res = await axios.post(`${url}/v2/admin/signin`, values);
    const { token, expired, message } = res.data;

    toast.success(message);
    document.cookie = `signinToken=${token}; expires=${new Date(expired)}`;
    axios.defaults.headers.common["Authorization"] = token;
    navigate("/products");
  } catch (err) {
    console.log(err);
    toast.error(`登入失敗: ${err.message}`);
    navigate("/login");
  }
}
