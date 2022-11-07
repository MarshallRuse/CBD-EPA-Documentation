import React, { createContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

export const PageContext = createContext(0);

export default function BottomNav({ onNavIndexChange, onNavActionClicked, navIndex = 0 }) {
    return (
        <div className='fixed bottom-0 left-0 right-0 z-50'>
            <BottomNavigation
                showLabels
                value={navIndex}
                onChange={(event, newValue) => {
                    onNavIndexChange(newValue);
                }}
            >
                <BottomNavigationAction
                    label='EPAs'
                    icon={<AssignmentRoundedIcon />}
                    onClick={() => onNavActionClicked("/epas")}
                />
                <BottomNavigationAction
                    label='Rotations'
                    icon={<ChangeCircleRoundedIcon />}
                    onClick={() => onNavActionClicked("/rotations")}
                />
                <BottomNavigationAction
                    label='Bookmarks'
                    icon={<BookmarkRoundedIcon />}
                    onClick={() => onNavActionClicked("/bookmarks")}
                />
            </BottomNavigation>
        </div>
    );
}
