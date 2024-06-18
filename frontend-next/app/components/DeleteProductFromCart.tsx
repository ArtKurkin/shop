import { deleteFromCart } from "@/actions/ServerActions";
import React from "react";

export default function DeleteProductFromCart(props: { idProduct: number }) {
    props.idProduct;
    const deleteItem = deleteFromCart.bind(null, props.idProduct);
    return (
        <form action={deleteItem}>
            <button className="btn btn-danger" type="submit">
                Удалить
            </button>
        </form>
    );
}
