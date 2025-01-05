import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { SearchOffOutlined, SearchOutlined } from "@mui/icons-material";

import { SearchLookup } from "./search-lookup";
import './search-spots-widget.css';

export const SearchSpotsWidget: FC = () => {

    const icons = {
        search: <SearchOutlined fontSize='large' color='primary' />,
        searchOff: <SearchOffOutlined fontSize='large' color='primary' />
    };

    const [showLookup, setShowLookup] = useState(false);

    const handleButtonClick = () => setShowLookup(prev => !prev);

    return (
        <>
            <div className='leaflet-top leaflet-right search-widget-container'>
                {showLookup && <SearchLookup />}
                <IconButton onClick={() => handleButtonClick()}>
                    {showLookup ? icons.searchOff : icons.search}
                </IconButton>
            </div>
        </>
    );
}