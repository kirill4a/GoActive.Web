import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { SearchOffOutlined, SearchOutlined } from "@mui/icons-material";

import { SearchSpotsWidgetOptions } from "./search-spots-widget-options";
import { SearchLookup } from "./search-lookup";
import { SearchedSpot } from "../../../shared/api";
import './search-spots-widget.css';

export const SearchSpotsWidget: FC<SearchSpotsWidgetOptions> = ({ onSelected }) => {

    const icons = {
        search: <SearchOutlined fontSize='large' color='primary' />,
        searchOff: <SearchOffOutlined fontSize='large' color='primary' />
    };

    const [showLookup, setShowLookup] = useState(false);

    const handleButtonClick = () => setShowLookup(prev => !prev);

    const handleSelect = (selectedSpot?: SearchedSpot) => {

        if (onSelected)
            onSelected(selectedSpot);
    }

    return (
        <div className='search-widget-container'>
            <div className='leaflet-bottom search-widget'>
                {showLookup && <SearchLookup
                    onSelected={handleSelect}
                    onClear={handleSelect} />}
                <IconButton onClick={() => handleButtonClick()}>
                    {showLookup ? icons.searchOff : icons.search}
                </IconButton>
            </div>
        </div>
    );
}