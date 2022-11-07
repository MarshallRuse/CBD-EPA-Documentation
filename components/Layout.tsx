import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import BottomNav, { PageContext } from "./BottomNav";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const router = useRouter();
    const [navIndex, setNavIndex] = useState(0);

    const checkNavIndex = (url) => {
        switch (url) {
            case "/epas":
                setNavIndex(0);
                break;
            case "/rotations":
                setNavIndex(1);
                break;
            case "/bookmarks":
                setNavIndex(2);
                break;
            default:
                setNavIndex(-1);
        }
    };

    const onNavIndexChange = (index: number) => setNavIndex(index);

    const onNavActionClicked = (path: string) => {
        router.push(path);
    };

    useEffect(() => {
        router?.events.on("routeChangeComplete", checkNavIndex);

        return () => {
            router?.events.off("routeChangeComplete", checkNavIndex);
        };
    }, []);

    return (
        <>
            <Navbar />
            <PageContext.Provider value={navIndex}>
                <main className='mt-20 mb-16 p-8'>{children}</main>
            </PageContext.Provider>
            <BottomNav
                onNavIndexChange={onNavIndexChange}
                onNavActionClicked={onNavActionClicked}
                navIndex={navIndex}
            />
        </>
    );
};

export default Layout;
