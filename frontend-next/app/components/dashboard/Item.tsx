import { ICategory } from "@/app/models/category.model";
import { IProduct } from "@/app/models/product.model";
import Link from "next/link";
import React from "react";
import DeleteButton from "../DeleteButton";

export default function Item(props: {
    item: IProduct | ICategory;
    link: string;
    linkEdit: string;
    parentSlug: string;
    type: string;
}) {
    ("Ид чего то");
    props.item;

    return (
        <li className="list-group-item d-flex justify-content-between gap-4 ">
            <Link href={props.link} className="fw-bold ">
                {props.item.title}
            </Link>
            <div className="d-flex justify-content-between gap-4">
                <Link className="btn btn-primary" href={props.linkEdit}>
                    Редактировать
                </Link>
                <DeleteButton
                    id={props.item.id}
                    parentSlug={props.parentSlug}
                    type={props.type}
                />
            </div>
        </li>
    );
}
