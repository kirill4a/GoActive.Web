import { FC } from "react";
import { Box, styled, Typography } from "@mui/material";
import { HomeOutlined, LanguageOutlined, PlaceOutlined } from "@mui/icons-material";
import { LatLng, LatLngExpression } from "leaflet";

interface SpotDetailsOptions {
    description?: string;
    location: LatLng;
    address?: string;
}

const FlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '4vh 0'
}));

export const SpotDetails: FC<SpotDetailsOptions> = (data) => {

    const locationText: LatLngExpression = [data.location.lat, data.location.lng];

    return (
        <>
            <FlexBox>
                <PlaceOutlined fontSize='small' color='disabled' />
                <Typography variant='body2'>
                    {locationText.toString()}
                </Typography>
            </FlexBox>
            <FlexBox>
                <HomeOutlined fontSize='small' color='disabled' />
                <Typography variant='body2'>
                    {data.address}
                </Typography>
            </FlexBox>
            <FlexBox>
                <LanguageOutlined fontSize='small' color='disabled' />
                <a href='https://example.com' target='_blank'>{'https://example.com'}</a>
            </FlexBox>
            <Typography variant='body2' color='text.secondary'>
                {data.description}
            </Typography>
        </>);
}