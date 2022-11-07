import { useState, useEffect, useContext } from "react";
import EPACard from "../components/EPACard";
import IMCBDHeader from "../components/IMCBDHeader";
import RotationCard from "../components/RotationCard";
import { db, Bookmark } from "../db";
import { EPAsAndRotationsContext } from "../utils/context/EPAsAndRotationsContext";

const BookmarksPage = () => {
    const { epas, rotations } = useContext(EPAsAndRotationsContext);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    console.log("bookmarks: ", bookmarks);

    useEffect(() => {
        async function getBookmarks() {
            const fetchedBookmarks = await db.bookmarks.toArray();

            if (fetchedBookmarks && fetchedBookmarks.length > 0) {
                setBookmarks(fetchedBookmarks);
            }
        }

        getBookmarks();
    }, []);

    return (
        <>
            <IMCBDHeader page='Bookmarks' />
            <p className='mt-8 mb-4 text-xl text-zinc-400'>Rotations</p>
            <div className='flex flex-col w-full gap-8'>
                {bookmarks
                    .filter((bookmark) => bookmark.type === "Rotation")
                    .sort((a, b) => (a.slug > b.slug ? 1 : -1))
                    .map((bookmark) => {
                        const rotation = rotations.find((rot) => rot.slug === bookmark.slug);
                        return <RotationCard key={bookmark?.slug} name={rotation?.name} slug={rotation?.slug} />;
                    })}
            </div>
            <p className='mt-8 mb-4 text-xl text-zinc-400'>EPAs</p>
            <div className='flex flex-col w-full gap-8'>
                {bookmarks
                    .filter((bookmark) => bookmark.type === "EPA")
                    .sort((a, b) => (a.slug > b.slug ? 1 : -1))
                    .map((bookmark) => {
                        const epa = epas.find((e) => e.epa_code === bookmark.slug);
                        if (epa) {
                            return (
                                <EPACard
                                    key={bookmark.slug}
                                    title={epa.epa_name}
                                    code={epa.epa_code}
                                    stage={epa.cbd_stage?.stage_code}
                                />
                            );
                        }
                    })}
            </div>
        </>
    );
};

export default BookmarksPage;
