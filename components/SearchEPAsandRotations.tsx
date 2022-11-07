import { useState, useContext, useEffect, useRef } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { EPAsAndRotationsContext } from "../utils/context/EPAsAndRotationsContext";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const variants: Variants = {
    open: {
        opacity: 1,
        top: "5rem",
        x: 0,
        pointerEvents: "all",
        clipPath: `circle(115% at 70% 40px)`,
        transition: { type: "spring", damping: 12, stiffness: 300, mass: 1.25 },
    },
    closed: {
        opacity: 0,
        top: 0,
        x: "10%",
        pointerEvents: "none",
        clipPath: `circle(0px at 70% 40px)`,
        transition: { type: "spring", damping: 20, stiffness: 300, mass: 1.5 },
    },
};

const SearchEPAsAndRotation = () => {
    const searchButtonRef = useRef(null);
    const searchRef = useRef(null);
    const { epas, rotations } = useContext(EPAsAndRotationsContext);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {}, [searchValue]);

    useEffect(() => {
        const listenForClickAway = (e) => {
            if (isOpen && searchButtonRef.current && e.target === searchButtonRef.current) {
                setIsOpen(false);
            } else if (searchRef.current && !searchRef.current.contains(e.target)) {
                console.log("oh but im here too");
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("mousedown", listenForClickAway);
        } else {
            window.removeEventListener("mousedown", listenForClickAway);
            setSearchValue("");
        }

        return () => {
            window.removeEventListener("mousedown", listenForClickAway);
        };
    }, [isOpen]);

    useEffect(() => {
        router?.events.on("routeChangeStart", () => setIsOpen(false));

        return () => {
            router?.events.off("routeChangeStart", () => setIsOpen(false));
        };
    }, []);

    return (
        <>
            <div>
                <SearchRounded fontSize='large' onClick={() => setIsOpen(!isOpen)} ref={searchButtonRef} />
            </div>
            <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                className='opacity-0 absolute left-0 px-4 py-2 w-full z-40'
                ref={searchRef}
            >
                <input
                    type='text'
                    id='search'
                    className='h-16 bg-white border-2 border-secondary-500 text-secondary-500 text-lg rounded-lg focus:ring-secondary-500 focus:border-secondary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary-500 dark:focus:border-secondary-500'
                    placeholder='Search EPAs and Rotations'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue !== "" && (
                    <div className='flex flex-col bg-white w-full max-h-80 pb-4 overflow-y-scroll shadow-md relative'>
                        {rotations.filter((rotation) => rotation.name.toLowerCase().includes(searchValue.toLowerCase()))
                            .length > 0 && (
                            <>
                                <p className='p-4 my-0 text-xl bg-zinc-100 text-zinc-700 sticky top-0'>Rotations</p>
                                {rotations
                                    .filter((rotation) =>
                                        rotation.name.toLowerCase().includes(searchValue.toLowerCase())
                                    )
                                    .map((rotation) => (
                                        <Link key={`rotation-${rotation.slug}`} href={`/rotation/${rotation.slug}`}>
                                            <div className='bg-white border p-4 text-lg text-secondary-500 cursor-pointer transition hover:bg-secondary-500 hover:text-white'>
                                                {rotation.name}
                                            </div>
                                        </Link>
                                    ))}
                            </>
                        )}
                        {epas.filter((epa) => epa.epa_code.toLowerCase().includes(searchValue.toLowerCase())).length >
                            0 && (
                            <>
                                <p className='p-4 my-0 text-xl bg-zinc-100 text-zinc-700 sticky top-0'>EPAs</p>
                                {epas
                                    .filter((epa) => epa.epa_code.toLowerCase().includes(searchValue.toLowerCase()))
                                    .map((epa) => (
                                        <Link key={`epa-${epa.epa_code}`} href={`/EPA/${epa.epa_code}`}>
                                            <div className='bg-white border p-4 text-lg text-secondary-500 cursor-pointer transition hover:bg-secondary-500 hover:text-white'>
                                                {epa.epa_code}
                                            </div>
                                        </Link>
                                    ))}
                            </>
                        )}
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default SearchEPAsAndRotation;
