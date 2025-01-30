import { JSX } from "react";
import { ActivityTypes } from "../api";
import { DirectionsBike, Explore, RollerSkating, Spa } from "@mui/icons-material";

const icons = new Map<ActivityTypes, JSX.Element>(
    [
        ['NordicSki', (<Explore fontSize='medium' color='primary' key='NordicSki' />)],
        ['Biathlon', (<DirectionsBike fontSize='medium' color='primary' key='Biathlon' />)],
        ['Workout', (<Spa fontSize='medium' color='primary' key='Workout' />)],
        ['RollerSki', (<RollerSkating fontSize='medium' color='primary' key='RollerSki' />)]
    ]);

export const GetActivityIcon = (key: ActivityTypes) => icons.get(key);