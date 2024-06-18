import {
    checkAuth,
    decreaseProduct,
    increaseProduct,
} from "@/actions/ServerActions";
import React from "react";

export default function UpdateProduct(props: {
    idProduct: number;
    type: "+" | "-";
}) {
    props.idProduct;
    const deleteItem = checkAuth.bind(
        null,
        props.type == "+"
            ? increaseProduct.bind(null, props.idProduct)
            : decreaseProduct.bind(null, props.idProduct)
    );
    return (
        <form action={deleteItem}>
            <button className="btn btn-success" type="submit">
                {props.type}
            </button>
        </form>
    );
}
