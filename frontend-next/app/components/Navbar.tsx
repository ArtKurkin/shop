import Link from "next/link";
import { getAdminData, getCookies } from "@/actions/ServerActions";
import LogOutButton from "./LogOutButton";
import MenuBurger from "./MenuBurger";
import { redirect } from "next/navigation";

async function getAdmin(): Promise<boolean> {
    const data = await getAdminData();
    return data;
}

export default async function Navbar() {
    const cookieStore = await getCookies();
    const auth = await fetch("http://localhost:5000/auth/isauth", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + cookieStore.get("accessToken")?.value,
        },
        cache: "no-store",
        next: { tags: ["auth"] },
    });

    let isAuth;
    if (auth.status >= 200 && auth.status < 300) {
        const res = await auth.json();
        isAuth = res;
    } else {
        isAuth = false;
    }
    const isAdmin = await getAdmin();

    const orderHandler = async () => {
        "use server";
        redirect("/orders");
    };

    const cartHandler = async () => {
        "use server";
        redirect("/cart");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    Shop
                </Link>

                <MenuBurger />
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                href="/categories"
                            >
                                Категории
                            </Link>
                        </li>
                        <li className="nav-item">
                            <form action={cartHandler}>
                                <button
                                    type="submit"
                                    className="nav-link active"
                                >
                                    Корзина
                                </button>
                            </form>
                            {/* <Link
                                className="nav-link active"
                                aria-current="page"
                                href="/cart"
                            >
                                Корзина
                            </Link> */}
                        </li>
                        <li className="nav-item">
                            <form action={orderHandler}>
                                <button
                                    type="submit"
                                    className="nav-link active"
                                >
                                    Заказы
                                </button>
                            </form>
                            {/* <Link
                                className="nav-link active"
                                aria-current="page"
                                href="/cart"
                            >
                                Корзина
                            </Link> */}
                        </li>
                        {isAdmin ? (
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/dashboard/items"
                                >
                                    Админ панель
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                    {isAuth ? (
                        <LogOutButton />
                    ) : (
                        <>
                            <Link
                                href={"/auth/login"}
                                className="btn btn-outline-light me-2"
                            >
                                Войти
                            </Link>
                            <Link
                                href={"/auth/registration"}
                                className="btn btn-outline-light"
                            >
                                Зарегистрироваться
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
