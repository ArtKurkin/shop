"use server";

import {
    createOrder,
    getCart,
    getCookies,
    increaseProduct,
} from "@/actions/ServerActions";
import Link from "next/link";
import React from "react";
import DeleteProductFromCart from "../components/DeleteProductFromCart";
import "./styles.css";
import UpdateProduct from "../components/UpdateProduct";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Cart() {
    const data = await getCart();
    const totalAmount = data?.products?.reduce((sum: number, item: any) => {
        return sum + item.price * item.ProductCart.quantity;
    }, 0);

    const createOrders = createOrder.bind(null, data.id);

    return (
        <div className="container-sm mt-4">
            <h1 className="pt-2 pb-2">Корзина</h1>
            <ul className="list-group">
                {data?.products?.map((item: any) => {
                    return (
                        <li className="list-group-item d-flex justify-content-between gap-4 ">
                            <div>
                                <Link href="#" className="fw-bold ">
                                    {item.title}
                                </Link>
                                <p>Цена: {item.price} ₽</p>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                {item.quantity <= item.ProductCart.quantity ? (
                                    <div> </div>
                                ) : (
                                    <UpdateProduct
                                        idProduct={item.id}
                                        type="+"
                                    />
                                )}

                                <div>
                                    Колличество: {item.ProductCart.quantity}
                                </div>
                                {1 == item.ProductCart.quantity ? (
                                    <div> </div>
                                ) : (
                                    <UpdateProduct
                                        idProduct={item.id}
                                        type="-"
                                    />
                                )}
                            </div>
                            <div className="d-flex justify-content-between gap-4">
                                <DeleteProductFromCart idProduct={item.id} />
                            </div>
                        </li>
                    );
                })}
            </ul>
            <hr />
            <h3>Итого: {totalAmount} ₽</h3>
            <form action={createOrders}>
                <button className="btn btn-primary">Оформить заказ</button>
            </form>
        </div>
    );
}
