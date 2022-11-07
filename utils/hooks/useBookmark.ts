import { useState, useEffect } from "react";
import { db } from "../../db";

const useBookmark = (type: "EPA" | "Rotation", slug: string) => {
    const [bookmarked, setBookmarked] = useState(false);

    async function toggleBookmark() {
        const thisBookmark = await db.bookmarks.where({ type, slug }).first();
        if (thisBookmark) {
            db.bookmarks.delete(thisBookmark.id);
            setBookmarked(false);
        } else {
            db.bookmarks.add({ type, slug });
            setBookmarked(true);
        }
    }

    useEffect(() => {
        async function getBookmark() {
            const thisBookmark = await db.bookmarks.where({ type, slug }).first();
            if (thisBookmark) {
                setBookmarked(true);
            } else {
                setBookmarked(false);
            }
        }

        getBookmark();
    }, []);

    return [bookmarked, toggleBookmark] as const;
};

export default useBookmark;
