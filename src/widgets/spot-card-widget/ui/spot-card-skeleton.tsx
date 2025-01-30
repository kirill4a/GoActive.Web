import { FC } from "react";
import { Skeleton } from "@mui/material";

interface SportCardSkeletonOptions {
    bodyPartHeigh?: string | number
}

export const SportCardSkeleton: FC<SportCardSkeletonOptions> = ({ bodyPartHeigh }) => {

    return (
        <>
            <Skeleton animation='wave' variant='text' />
            <Skeleton animation='wave' width='80%' height={bodyPartHeigh} />
        </>
    );
}