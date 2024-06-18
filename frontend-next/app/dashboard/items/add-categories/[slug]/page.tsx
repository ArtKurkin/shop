"use client";
import {
    AddCategory,
    EditCategory,
    checkCategory,
    getIdCategory,
    hasProducts,
    isAuth,
} from "@/actions/ServerActions";
import React, { useEffect, useState } from "react";
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
    const [id, setId] = useState(null);

    useEffect(() => {
        if (titleIsValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [titleIsValid]);

    useEffect(() => {
        hasProducts(params.slug).then(res => {
            setCanAdd(!res);
        });

        getIdCategory(params.slug).then(res => {
            if (res) {
                setIdParent(res);
            }
        });

        const fetchCategory = async (slug: string) => {
            const result = await fetch(
                `http://localhost:5000/categories/${slug}`
            ).then(res => res.json());
            result;
            setTitle(result.title);
            setId(result.id);
            setFormValid(true);
        };

        if (searchParams.name) {
            checkCategory(searchParams.name).then(res => {
                setCanAdd(res);
                if (res) {
                    res;
                    fetchCategory(searchParams.name);
                }
            });
        }
    }, []);

    const titleHandler = (e: any) => {
        const regexp = /[A-zА-яЁё]/;
        const rawValue = e.target.value;
        const trimmedValue = rawValue.trim();
        if (!regexp.test(trimmedValue)) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        setTitle(rawValue);
    };

    const onSubmit = (e: any) => {
        isAuth().then(res => {
            if (res != true) {
                return;
            }

            if (idParent) {
                e.append("idParent", idParent);
            }

            if (searchParams.name) {
                e.append("id", id);
                EditCategory(e);
            } else {
                AddCategory(e);
            }
        });
    };

    if (!canAdd) {
        return <h1>Тут ничего нет</h1>;
    }

    return (
        <>
            <h1 className="pt-4 pb-2">Добавить категорию</h1>
            <form action={onSubmit}>
                <div className="mb-3 needs-validation">
                    <label htmlFor="exampleInputTitle1" className="form-label">
                        Название категории
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputTitle1"
                        aria-describedby="emailHelp"
                        name="title"
                        onChange={titleHandler}
                        required
                        value={title}
                    />
                </div>
                <label className="form-label" htmlFor="inputGroupFile01">
                    Изображение категории
                </label>
                <div className="input-group mb-3 ">
                    <input
                        type="file"
                        className="form-control"
                        id="inputGroupFile01"
                        name="image"
                        // onChange={imageHandler}
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
