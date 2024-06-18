import { addInCart, checkAuth } from "@/actions/ServerActions";
import { redirect } from "next/navigation";
import React from "react";

export default function AddInCart(props: { idProduct: number }) {
    props.idProduct;
    const deleteItem = checkAuth.bind(
        null,
        addInCart.bind(null, props.idProduct)
    );
    return (
        <form action={deleteItem}>
            <button className="btn btn-success" type="submit">
                Добавить в корзину
            </button>
        </form>
    );
}
