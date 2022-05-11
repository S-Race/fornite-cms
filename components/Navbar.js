import { useSearchContext } from "../context/SearchContext";

const NavItem = ({ text, active=false }) => {
    const activeClasses = " bg-yellow-400 text-white";
    const hoverClasses = " ";

    return <li className={"px-4 py-2 md:mx-2 text-xl font-light rounded-full "
        + "hover:bg-yellow-300 hover:text-white hover:cursor-pointer" + (active ? activeClasses : "")}>{text}</li>;
};

const Navbar = () => {
    const { search, setSearch } = useSearchContext();

    return (
        <nav className="text-gray-200 bg-zinc-800 shadow-lg w-full h-fit flex flex-col md:flex-row
            md:justify-between md:items-center px-2 md:px-5">
            <h1 className="font-bold text-2xl p-2">
                Fornite<span className="text-yellow-400">CMS</span>
            </h1>
            <ul className="flex">
                <NavItem text="Top 4"/>
                <NavItem text="Top 10"/>
                <NavItem text="Top 25"/>
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