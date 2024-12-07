import { FC, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { AddCircleOutline, CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { LatLng } from "leaflet";
import { CenteredMarker } from "./centered-marker";
import './add-sketch-button.css'

export const AddSketchButton: FC = () => {

    const addIcon = <AddCircleOutline fontSize='large' color='primary' />;
    const acceptIcon = <CheckCircleOutline fontSize='large' color='success' />;
    const declineIcon = <CancelOutlined fontSize='large' color='error' />;

    const [position, setPosition] = useState<LatLng>();
    const [adding, setAdding] = useState(false);
    const [icon, setIcon] = useState(addIcon);

    useEffect(() => {

        if (adding) {
            setIcon(acceptIcon);
        }
        else {
            setIcon(addIcon);
        }
    }, [adding]);

    const renderMarker = () => adding ? <CenteredMarker onPositionChanged={(location) => setPosition(location)} /> : null;

    const renderCancel = () => adding
        ? <IconButton onClick={() => setAdding(false)}>
            {declineIcon}
        </IconButton>
        : null;

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
                {renderCancel()}
                <IconButton onClick={() => handleOnClick()}>
                    {icon}
                </IconButton>
            </div>
            {renderMarker()}
        </>
    );
}
