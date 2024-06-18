import Link from "next/link";
import React from "react";

export default function CartItem() {
    return (
        <li className="list-group-item d-flex justify-content-between gap-4 ">
            <div>
                <Link href="#" className="fw-bold ">
                    Куртка
                </Link>
                <p>Цена: 4990 р.</p>
            </div>
            <div
                className="input-group mb-3"
                style={{ width: "150px", maxWidth: "100%" }}
            >
                <button
                    className="btn btn-outline-success"
                    type="button"
                    id="button-addon1"
                >
                    -
                </button>
                <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    min="0"
                    style={{ appearance: "none", margin: "0" }}
                />
                <button
                    className="btn btn-outline-success"
                    type="button"
                    id="button-addon1"
                >
                    +
                </button>
            </div>
            <div className="d-flex justify-content-between gap-4">
                <Link
                    className="btn btn-danger"
                    href="#"
                    style={{ display: "block", alignSelf: "center" }}
                >
                    Удалить
                </Link>
                {/* <DeleteButton
                            id={props.item.id}
                            parentSlug={props.parentSlug}
                            type={props.type}
                        /> */}
            </div>
        </li>
    );
}
