import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useSearchContext } from "../context/SearchContext";

const NavItem = ({ text, active=false, position }) => {
    const activeClasses = " bg-yellow-400 text-white";
    const hoverClasses = " ";

    return <Link href={"/top/" + position}>
        <li className={"px-4 py-2 md:mx-2 text-xl font-light rounded-full "
        + "hover:bg-yellow-300 hover:text-white hover:cursor-pointer" + (active ? activeClasses : "")}>{text}</li>
    </Link>;
};

const Navbar = () => {
    const { search, setSearch } = useSearchContext();
    const [rankPage, setRankPage] = useState("");

    const router = useRouter();
    const { query: { position } } = router;

    useEffect(() => {
        if (position === "4" || position === "10" || position === "25")
            setRankPage(position);
    }, [position]);

    return (
        <nav className="text-gray-200 bg-zinc-800 shadow-lg w-full h-fit flex flex-col md:flex-row
            md:justify-between md:items-center px-2 md:px-5">
            <Link href="/">
                <h1 className="font-bold text-2xl p-2 cursor-pointer">
                    Fornite<span className="text-yellow-400">CMS</span>
                </h1>
            </Link>
            <ul className="flex">
                <NavItem text="Top 4" position={4} active={rankPage === "4"}/>
                <NavItem text="Top 10" position={10} active={rankPage === "10"}/>
                <NavItem text="Top 25" position={25} active={rankPage === "25"}/>
            </ul>
            <section className="container py-4 flex w-fit mx-2 md:mx-4">
                <div className="flex border-2 rounded">
                    <button className="flex items-center justify-center px-4 border-r bg-gray-900">
                        <svg className="w-6 h-6 text-neutral-100" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10
                                    16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </button>
                    <input type="text"
                        className="px-4 py-2 w-40 focus:outline-none bg-neutral-200 text-lg
                        focus:bg-yellow-400 focus:text-gray-50 focus:placeholder-gray-50"
                        placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </section>
        </nav>
    )
}

export default Navbar;