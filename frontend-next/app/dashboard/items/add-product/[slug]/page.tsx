"use client";
import {
    AddCategory,
    AddProduct,
    EditProduct,
    checkProduct,
    getIdCategory,
    hasCategory,
    hasProducts,
    isAuth,
} from "@/actions/ServerActions";
import React, { useEffect, useState, useTransition } from "react";
require("bootstrap/dist/js/bootstrap.js");

export default function page({
    params,
    searchParams,
}: {
    params: any;
    searchParams: any;
}) {
    const [imageIsValid, setImageIsValid] = useState(false);
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [canAdd, setCanAdd] = useState(false);
    const [idParent, setIdParent] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [id, setId] = useState(null);
    let [pending, startTransition] = useTransition();

    useEffect(() => {
        if (titleIsValid) {
            setFormValid(true);
            //("Форма валидена");
        } else {
            setFormValid(false);
            //("Форма не валидена");
        }
    }, [titleIsValid]);

    useEffect(() => {
        startTransition(async () => isAuth());

        hasCategory(params.slug).then(res => {
            //(res);
            setCanAdd(!res);
        });

        getIdCategory(params.slug).then(res => {
            //("Id категории" + res);
            if (res) {
                setIdParent(res);
            }
        });

        const fetchProduct = async (slug: string) => {
            const result = await fetch(
                `http://localhost:5000/products/${slug}`
            ).then(res => res.json());
            result;
            setTitle(result.title);
            setDescription(result.description);
            setPrice(result.price);
            setQuantity(result.quantity);
            setId(result.id);
            setFormValid(true);
        };

        if (searchParams.name) {
            checkProduct(searchParams.name).then(res => {
                setCanAdd(res);
                if (res) {
                    res;
                    fetchProduct(searchParams.name);
                }
            });
        }
    }, []);

    const imageHandler = (e: any) => {
        var er = new RegExp(".(jpg|png)");
    };

    const titleHandler = (e: any) => {
        const regexp = /[A-zА-яЁё]/;
        const rawValue = e.target.value;
        const trimmedValue = rawValue.trim();
        if (!regexp.test(trimmedValue)) {
            setTitleIsValid(false);
            setTitle(rawValue);
        } else {
            setTitleIsValid(true);
            setTitle(rawValue);
        }
    };

    const descriptionHandler = (e: any) => {
        const regexp = /[A-zА-яЁё]/;
        const rawValue = e.target.value;
        const trimmedValue = rawValue.trim();
        if (!regexp.test(trimmedValue)) {
            setDescription(rawValue);
        } else {
            setDescription(rawValue);
        }
    };

    const priceHandler = (e: any) => {
        if (e.target.value >= 0) {
            setPrice(+e.target.value);
        }
    };

    const quantityHandler = (e: any) => {
        if (e.target.value >= 0) {
            setQuantity(+e.target.value);
        }
    };

    const onSubmit = (e: any) => {

        isAuth().then(res => {
            if (res != true) {
                return;
            }

            if (idParent) {
                e.append("idCategory", idParent);
            }

            if (searchParams.name) {
                e.append("id", id);
                EditProduct(e);
            } else {
                AddProduct;
            }
        });
    };

    if (!canAdd) {
        return <h1>Тут ничего нет</h1>;
    }

    return (
        <>
            <h1 className="pt-4 pb-2">Добавить товар</h1>
            <form action={onSubmit}>
                <div className="mb-3 needs-validation">
                    <label htmlFor="exampleInputTitle1" className="form-label">
                        Название товара
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputTitle1"
                        aria-describedby="emailHelp"
                        name="title"
                        onChange={titleHandler}
                        value={title}
                        required
                    />
                </div>
                <div className="mb-3 needs-validation">
                    <label
                        htmlFor="exampleInputDescription1"
                        className="form-label"
                    >
                        Описание
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputDescription1"
                        aria-describedby="emailHelp"
                        name="description"
                        onChange={descriptionHandler}
                        value={description}
                    />
                </div>
                <div className="mb-3 needs-validation">
                    <label htmlFor="exampleInputPrice1" className="form-label">
                        Цена
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleInputPrice1"
                        aria-describedby="emailHelp"
                        name="price"
                        value={price}
                        onChange={priceHandler}
                    />
                </div>
                <div className="mb-3 needs-validation">
                    <label
                        htmlFor="exampleInputQuantity1"
                        className="form-label"
                    >
                        Количество
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleInputQuantity1"
                        aria-describedby="emailHelp"
                        name="quantity"
                        value={quantity}
                        onChange={quantityHandler}
                    />
                </div>
                <label className="form-label" htmlFor="inputGroupFile01">
                    Изображение товара
                </label>
                <div className="input-group mb-3 ">
                    <input
                        type="file"
                        className="form-control"
                        id="inputGroupFile01"
                        name="image"
                        onChange={imageHandler}
                    />
                </div>
                {formValid ? (
                    searchParams.name ? (
                        <button type="submit" className="btn btn-primary">
                            Изменить
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary">
                            Добавить
                        </button>
                    )
                ) : (
                    ""
                )}
            </form>
        </>
    );
}
