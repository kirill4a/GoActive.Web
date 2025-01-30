import { CardMedia } from "@mui/material";
import { FC } from "react";

export const SpotMedia: FC = () => {

    return (
        <>
            <CardMedia
                component="img"
                // height="300"
                image={'https://images.unsplash.com/photo-1579586337278-3befd40fd17a'}
                alt={'QWERTY'}
                sx={{ objectFit: "cover" }}
            />
        </>);
}