"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCategories = async () => {};

export const logIn = async (formData: FormData) => {
    const cookieStore = cookies();

    const data = JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    const result = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
        cache: "no-store",
    }).then(res => res.json());

    if (result.message) {
        return result.message;
    }

    if (result.accessToken) {
        cookieStore.set("accessToken", result.accessToken, {
            secure: true,
            httpOnly: true,
        });
        cookieStore.set("refreshToken", result.refreshToken, {
            secure: true,
            httpOnly: true,
        });
        revalidatePath("/");
        redirect("/");
    }
};

export const getOrders = async () => {
    const cookieStore = cookies();
    const data = cookieStore.get("accessToken")?.value;

    const result = await fetch("http://localhost:5000/orders", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + data,
        },
        cache: "no-store",
    });

    let res = await result.json();

    if (result?.status < 300 && result?.status >= 200) {
        return res;
    }
    revalidatePath("/", "layout");
    revalidateTag("authh");
    redirect("/auth/login");
};

export const registration = async (formData: FormData) => {
    const cookieStore = cookies();

    const data = JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    const result = await fetch("http://localhost:5000/auth/registration", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
        cache: "no-store",
    }).then(res => res.json());

    if (result.message) {
        return result.message;
    }

    if (result.accessToken) {
        cookieStore.set("accessToken", result.accessToken, {
            secure: true,
            httpOnly: true,
        });
        cookieStore.set("refreshToken", result.refreshToken, {
            secure: true,
            httpOnly: true,
        });
        revalidatePath("/");
        redirect("/");
    }
};

export const isAuth = async () => {
    const cookieStore = cookies();
    const data = cookieStore.get("accessToken")?.value;

    const result = await fetch("http://localhost:5000/auth/isauth", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + data,
        },
        cache: "no-store",
    });

    let res = await result.json();

    if (result?.status < 300 && result?.status >= 200) {
        return res;
    }

    revalidatePath("/", "layout");
    revalidateTag("auth");
    redirect("/auth/login");
};

export const getCart = async () => {
    const cookieStore = cookies();
    const data = cookieStore.get("accessToken")?.value;

    const result = await fetch("http://localhost:5000/carts", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + data,
        },
        cache: "no-store",
    });

    let res = await result.json();

    if (result?.status < 300 && result?.status >= 200) {
        return res;
    }
    revalidatePath("/", "layout");
    revalidateTag("authh");
    redirect("/auth/login");
};

export const addInCart = async (idProducts: number) => {
    const cookieStore = cookies();
    const data = cookieStore.get("accessToken")?.value;

    const body = { idProduct: idProducts };
    const result = await fetch("http://localhost:5000/carts/add", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + data,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (result.status >= 300 || result.status < 200) {
        //return result;
    }

    redirect("/cart");
};

export const checkAuth = async callBack => {
    const cookieStore = cookies();
    const result = await callBack();
    if (result?.status >= 300 || result?.status < 200) {
        if (cookieStore.has("refreshToken")) {
            const refreshData = cookieStore.get("refreshToken")?.value;
            const result = await fetch("http://localhost:5000/auth/refresh", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + refreshData,
                },
            });

            const res = await result.json();

            if (result.status < 300 && result.status >= 200) {
                cookieStore.set("accessToken", res.accessToken, {
                    secure: true,
                    httpOnly: true,
                });
                cookieStore.set("refreshToken", res.refreshToken, {
                    secure: true,
                    httpOnly: true,
                });
                const fin = await callBack();
                return fin;
            } else {
                cookieStore.delete("refreshToken");
                cookieStore.delete("accessToken");
                redirect("/auth/login");
            }
        }
    }
};

export const increaseProduct = async (idProducts: number) => {
    const cookieStore = cookies();
    const data = cookieStore.get("accessToken")?.value;

    const body = { idProduct: idProducts };
    const result = await fetch("http://localhost:5000/carts", {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + data,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (result.status >= 300 || result.status < 200) {
        return result;
    }

    revalidatePath("/cart");
};

export const decreaseProduct = async (idProducts: number) => {
    const cookieStore = cookies();
    const data = cookieStore.get("accessToken")?.value;

    const body = { idProduct: idProducts };
    const result = await fetch("http://localhost:5000/carts/decrease", {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + data,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (result.status >= 300 || result.status < 200) {
        return result;
    }

    revalidatePath("/cart");
};

export const deleteFromCart = async (idProducts: number) => {
    const cookieStore = cookies();
    const data = cookieStore.get("accessToken")?.value;

    const body = { idProduct: idProducts };
    await fetch("http://localhost:5000/carts/delete", {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + data,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    revalidatePath("/");
};

export const logOut = async () => {
    "use server";
    const cookieStore = cookies();
    const data = cookieStore.get("refreshToken")?.value;

    await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + data,
        },
        cache: "no-store",
    });
    cookieStore.delete("refreshToken");
    cookieStore.delete("accessToken");
    revalidatePath("/");
    // redirect("/");
};

export const getAdminData = async (): Promise<boolean> => {
    const cookieStore = cookies();
    const data = cookieStore.get("refreshToken")?.value;
    const res = await fetch("http://localhost:5000/auth", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + data,
        },
        cache: "no-store",
    });

    if (res.status == 200) {
        return true;
    }

    return false;
};

export const getCookies = async () => {
    return cookies();
};

export const AddCategory = async (formData: FormData) => {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    const result = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });

    redirect("/dashboard/items");
};

export const AddProduct = async (formData: FormData) => {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    const result = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });

    redirect("/dashboard/items");
};

export const deleteProduct = async (idProd: number, parentTranslit: string) => {
    const data = JSON.stringify({ id: idProd });

    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    const result = await fetch("http://localhost:5000/products", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: data,
    });
    revalidatePath(`/dashboard/items/${parentTranslit}`);
};

export const deleteCategory = async (idCat: number, parentTranslit: string) => {
    const data = JSON.stringify({ id: idCat });

    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    const result = await fetch("http://localhost:5000/categories", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: data,
    });
    revalidatePath(`/dashboard/items/${parentTranslit}`);
};

export const createOrder = async idCart => {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    const data = JSON.stringify({ cartId: idCart });

    const result = await fetch("http://localhost:5000/orders/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: data,
    });

    redirect("/");
};

export const EditProduct = async (formData: FormData) => {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    const result = await fetch("http://localhost:5000/products", {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });
    const res = await result.json();

    redirect("/dashboard/items");
};

export const EditCategory = async (formData: FormData) => {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;
    const result = await fetch("http://localhost:5000/categories", {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });

    redirect("/dashboard/items");
};

export const hasProducts = async (slug: string) => {
    const res = await fetch(`http://localhost:5000/products?category=${slug}`, {
        cache: "no-store",
    });

    const res2 = await res.json();
    if (res.status >= 300 || res.status < 200) {
        return false;
    }

    if (!res2.it.length) {
        return false;
    }

    return true;
};

export const hasCategory = async (slug: string) => {
    const res = await fetch(`http://localhost:5000/categories/${slug}`, {
        cache: "no-store",
    });

    const res2 = await res.json();
    if (res.status >= 300 || res.status < 200) {
        return false;
    }

    if (!res2.it.length) {
        return false;
    }

    return true;
};

export const getIdCategory = async (translit: string) => {
    const { id } = await fetch(`http://localhost:5000/categories/${translit}`, {
        cache: "no-store",
    }).then(res => res.json());

    return id;
};

export const checkProduct = async (translit: string) => {
    const result = await fetch(`http://localhost:5000/products/${translit}`, {
        cache: "no-store",
    });
    if (result.status >= 300 || result.status < 200) {
        return false;
    }

    return true;
};

export const checkCategory = async (translit: string) => {
    const result = await fetch(`http://localhost:5000/categories/${translit}`, {
        cache: "no-store",
    });
    if (result.status >= 300 || result.status < 200) {
        return false;
    }

    return true;
};
