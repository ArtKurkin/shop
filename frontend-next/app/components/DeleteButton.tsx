"use client";

import { deleteCategory, deleteProduct } from "@/actions/ServerActions";
import React from "react";

export default function DeleteButton(props: {
    id: number;
    parentSlug: string;
    type: string;
}) {
    let deleteItem;
    if (props.type == "category") {
        deleteItem = deleteCategory.bind(null, props.id, props.parentSlug);
    } else {
        deleteItem = deleteProduct.bind(null, props.id, props.parentSlug);
    }

    //(props.id);

    return (
        <form action={deleteItem}>
            <button className="btn btn-danger" type="submit">
                Удалить
            </button>
        </form>
    );
}
