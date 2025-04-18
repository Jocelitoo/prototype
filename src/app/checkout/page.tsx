"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useCartContext } from "@/hooks/CartContextProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { orders } from "@/utils/orders";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório").max(50),
  phone: z.string().min(2, "Número de celular é obrigatório").max(50),
  deliver: z.string().min(2, "Forma de entrega é obrigatório").max(50),
  paymentMethod: z.string().min(2, "Forma de pagamento é obrigatório").max(50),
  address: z.string().max(50),
});

const Checkout = () => {
  const { cartProducts } = useCartContext();
  const [deliver, setDeliver] = useState("");
  const isMobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent); // Verificar se o usuário está acessando no desktop ou celular

  const subtotal = cartProducts
    .reduce((acc, product) => (acc += product.price * product.quantity), 0)
    .toFixed(2);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      deliver: "",
      paymentMethod: "",
      address: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkoutHour = dayjs().format("DD/MM/YYYY - HH:mm");
    const orderNumber = orders.length + 1;
    const message = `SUPLEMENTOS 

---------------------------

Pedido n°: ${orderNumber}

---------------------------

${checkoutHour}

---------------------------

Nome: ${values.name}
telefone: ${values.phone}
Entrega: ${values.deliver}
 ${deliver === "Entrega" ? `Endereço: ${values.address}` : ""}

---------------------------

PRODUTOS:
${cartProducts.map((product) => {
  return `
  - ${product.quantity}x ${product.name} (R$ ${
    product.price * product.quantity
  })`;
})}

---------------------------

Forma de pagamento: ${values.paymentMethod}
Total: ${subtotal}`;
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(message);

    location.assign(
      `https://${
        isMobile ? "api" : "web"
      }.whatsapp.com/send?phone=${5585989836423}&text=${encodeURIComponent(
        message
      )}`
    );
  }

  return (
    <div className="px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-lg border p-4 rounded-md mx-auto"
        >
          <p className="text-center font-semibold text-2xl">
            Dados para pagamento
          </p>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Nome do usuário
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input placeholder="91234-5678" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Número de celular
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliver"
            render={() => (
              <FormItem>
                <FormLabel>Forma de entrega:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("deliver", value);
                      setDeliver(value);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione a forma de entrega" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Forma de entrega</SelectLabel>
                        <SelectItem value="Entrega">Entrega</SelectItem>
                        <SelectItem value="Retirar na loja">
                          Retirar na loja
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="sr-only">
                  Forma de entrega
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {deliver === "Entrega" && (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Endereço
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="paymentMethod"
            render={() => (
              <FormItem>
                <FormLabel>Forma de pagamento:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("paymentMethod", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Forma de pagamento</SelectLabel>
                        <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="Pix">Pix</SelectItem>
                        <SelectItem value="Débito">Débito</SelectItem>
                        <SelectItem value="Crédito">Crédito</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="sr-only">
                  Forma de pagamento
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4  ">
            <p className="text-xl">
              Total: <span className="font-bold">R$ {subtotal}</span>
            </p>
          </div>

          <Button size={"lg"} type="submit" className="w-full">
            Concluir compra
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Checkout;
