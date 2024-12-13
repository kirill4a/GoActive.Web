import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { AddCircleOutline, CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { LatLng } from "leaflet";
import { CenteredMarker } from "./centered-marker";
import { Sketch } from "../../../shared/api";
import { CreateSketch } from "../api/add-sketch-endpoint";
import './add-sketch-button.css';

export const AddSketchButton: FC = () => {

    const icons = {

        add: <AddCircleOutline fontSize='large' color='primary' />,
        accept: <CheckCircleOutline fontSize='large' color='success' />,
        decline: <CancelOutlined fontSize='large' color='error' />
    };

    const [position, setPosition] = useState<LatLng>();
    const [adding, setAdding] = useState(false);

    const handleOnClick = async () => {

        if (adding)
            await addSketch();

        setAdding(prevValue => !prevValue);
    };

    const addSketch = async () => {

        const sketchTitle = new Date().toISOString().substring(0, 10);
        const sketch: Sketch = {
            activityTypes: ['NordicSki', 'Workout'],
            title: sketchTitle,
            location: {
                latitude: position?.lat,
                longitude: position?.lng
            }
        };
        const createResult = await CreateSketch({ sketch });
        if (createResult)
            alert(`New sketch has been added \n${createResult}`);
        else
            alert('Something went wrong');
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
