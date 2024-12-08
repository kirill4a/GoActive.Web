import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { AddCircleOutline, CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { LatLng } from "leaflet";
import { CenteredMarker } from "./centered-marker";
import './add-sketch-button.css'

export const AddSketchButton: FC = () => {

    const icons = {

        add: <AddCircleOutline fontSize='large' color='primary' />,
        accept: <CheckCircleOutline fontSize='large' color='success' />,
        decline: <CancelOutlined fontSize='large' color='error' />
    };

    const [position, setPosition] = useState<LatLng>();
    const [adding, setAdding] = useState(false);

    const handleOnClick = () => {

        if (adding)
            acceptLocation();

        setAdding(prevValue => !prevValue);
    };

    const acceptLocation = () => {
        alert(`You have selected: ${position}\n Next call webapi.`);
    };

    return (
        <>
            <div className='leaflet-bottom leaflet-right add-btn-container'>
                {adding && <IconButton onClick={() => setAdding(false)}>
                    {icons.decline}
                </IconButton>}
                <IconButton onClick={() => handleOnClick()}>
                    {adding ? icons.accept : icons.add}
                </IconButton>
            </div>
            {adding && <CenteredMarker onPositionChanged={(location) => setPosition(location)} />}
        </>
    );
}
