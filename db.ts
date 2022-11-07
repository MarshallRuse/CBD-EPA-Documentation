import Dexie, { Table } from "dexie";

export interface Bookmark {
    id?: number;
    type: "EPA" | "Rotation";
    slug: string;
}

export class MySubClassedDexie extends Dexie {
    // 'bookmarks' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    bookmarks!: Table<Bookmark>;

    constructor() {
        super("localDB");
        this.version(1).stores({
            bookmarks: "++id, [type+slug]", // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();
