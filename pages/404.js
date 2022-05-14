import React from "react";

import Navbar from "../components/Navbar";
import { SearchProvider } from "../context/SearchContext";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center bg-stone-800 h-screen">
            <SearchProvider>
                <Navbar/>
            </SearchProvider>
            <h1 className="text-gray-100 text-xl md:text-3xl mt-20 md:mt-40 mx-4">
                Oops... The page requested could not be found</h1>
            <img src="images/by_the_road.svg" alt=" " className="w-40 lg:w-72 my-20"/>
        </div>
    );
};