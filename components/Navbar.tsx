import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import MenuRounded from "@mui/icons-material/MenuRounded";
import SearchEPAsAndRotation from "./SearchEPAsandRotations";
import SideNav from "./SideNav";
import { MenuToggle } from "./MenuToggle";

const Navbar = () => {
    const sidebarRef = useRef(null);
    const router = useRouter();
    const [sideNavOpen, setSideNavOpen] = useState(false);

    useEffect(() => {
        router?.events.on("routeChangeStart", () => setSideNavOpen(false));

        return () => {
            router?.events.off("routeChangeStart", () => setSideNavOpen(false));
        };
    }, []);

    return (
        <>
            <nav className='fixed top-0 left-0 right-0 h-20 bg-blue-900 text-white flex justify-between items-center gap-4 px-5 z-50'>
                <Image src='/images/DOM_logo.png' width={238} height={55} />
                <SearchEPAsAndRotation />
                <MenuToggle open={sideNavOpen} toggle={() => setSideNavOpen(!sideNavOpen)} />
            </nav>
            <SideNav open={sideNavOpen} />
        </>
    );
};

export default Navbar;
