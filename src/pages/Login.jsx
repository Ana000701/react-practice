import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Header from "@/components/Header";
import { Signin } from "@/services/apiAuth";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().email("信箱格式錯誤").nonempty("請輸入會員信箱"),
  password: z.string().nonempty("請輸入密碼").min(8, "密碼長度至少8個字元"),
});

export default function SigninForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { reset } = form;

  function onSubmit(values) {
    try {
      Signin(values, navigate);

      reset();
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <>
      <Header />
      <main className='container mx-auto'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 max-w-3xl mx-auto py-10'
            noValidate
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>會員信箱</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='請輸入會員信箱'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    請輸入有效的電子信箱格式，例如：test@example.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密碼</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='請輸入密碼' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>登入</Button>
          </form>
        </Form>
      </main>
    </>
  );
}
