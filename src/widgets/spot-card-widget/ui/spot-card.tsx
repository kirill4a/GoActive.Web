import { LatLng } from "leaflet";
import React from "react";
import { FC, useEffect, useState } from "react";
import { Box, Card, CardContent, CssBaseline, Drawer, IconButton, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Close, Info, PhotoLibrary } from "@mui/icons-material";
import { Global } from "@emotion/react";

import { ActivityTypes, Address } from "../../../shared/api";
import { GetSpot } from "../api/get-spot-endpoint";
import { GetActivityIcon } from "../../../shared/ui/activity-icons";
import { SpotCardOptions } from "./spot-card-options";
import { SpotData } from "../model/spot-data";
import { SpotDetails } from "./spot-details";
import { SpotMedia } from "./spot-media";
import { SportCardSkeleton } from "./spot-card-skeleton";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const JoinAddress = (address?: Address): string => {

    if (!address)
        return '';

    var values = [address.street, address.settlement, address.region, address.country].filter(x => x && x.trim() != ' ');
    return values.join(', ');
}

export const SpotCard: FC<SpotCardOptions> = ({ spotId, isOpen, onDataLoaded, onClose }) => {

    const theme = useTheme();

    const CardHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        justifyContent: 'space-between',
    }));

    const CardBody = styled('div')(({ theme }) => ({
        height: `calc(100% - ${tabsIndicatorHeightPx + 4}px)`,
        overflow: 'auto'
    }));

    const StyledCard = styled(Card)(({ theme }) => ({
        zIndex: 100,
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }));

    const TabPanel = (props: TabPanelProps) => (
        <div role="tabpanel" hidden={props.value !== props.index}>
            {props.value === props.index && <Box sx={{ p: 1 }}>{props.children}</Box>}
        </div>
    );

    const drawerHeightPercent = 58;
    const tabsIndicatorHeightPx = 48;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SpotData | null>();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {

        if (!spotId)
            return;

        setActiveTab(0);

        const fetchData = async () => {

            setLoading(true);
            setData(null);

            const result = await GetSpot(spotId);

            if (!result)
                console.warn(`Failed to fetch spot with id: '${spotId}'`);

            setData({
                Title: result!.title!,
                Activities: result!.activities!,
                Description: result!.description!,
                Address: JoinAddress(result!.address),
                Location: new LatLng(result!.location?.latitude!, result!.location?.longitude!)
            });
            setLoading(false);
        };

        fetchData();
        return () => { spotId = '' };

    }, [spotId]);

    useEffect(() => {
        if (data && onDataLoaded) {
            onDataLoaded();
        }
    }, [data]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);

    const renderTabHeader = (key: ActivityTypes) => {

        return (<Tab key={key} icon={GetActivityIcon(key)} />);
    }

    return (
        <>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `${drawerHeightPercent}%`
                    },
                    '.MuiPaper-root > .MuiPaper-elevation': {
                        height: '100%'
                    }
                }}
            />
            <Drawer
                variant='persistent'
                anchor='bottom'
                open={isOpen}
                ModalProps={{ keepMounted: true }}
            >
                <StyledCard key={spotId}>
                    <CardContent
                        sx={{ height: `calc(100% - ${tabsIndicatorHeightPx + 4}px)` }}>
                        <CardHeader>
                            {loading ? (<SportCardSkeleton />) : (
                                <Typography variant='h6' component='span'>
                                    {data?.Title}
                                </Typography>
                            )}
                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>
                        </CardHeader>
                        <CardBody>
                            {loading ? (<SportCardSkeleton bodyPartHeigh={'81%'} />) : (
                                <>
                                    <TabPanel value={activeTab} index={0}>
                                        {data && <SpotDetails description={data.Description} location={data.Location} address={data.Address} />}
                                    </TabPanel>
                                    <TabPanel value={activeTab} index={1}>
                                        {data && <SpotMedia />}
                                    </TabPanel>
                                </>
                            )}
                        </CardBody>
                    </CardContent>
                    <Tabs
                        sx={{ height: `${tabsIndicatorHeightPx}px` }}
                        value={activeTab}
                        variant='scrollable'
                        scrollButtons='auto'
                        allowScrollButtonsMobile={true}
                        onChange={handleTabChange}
                    >
                        <Tab icon={<Info fontSize='medium' color='info' />} />
                        <Tab icon={<PhotoLibrary fontSize='medium' color='info' />} />
                        {data?.Activities.map(renderTabHeader)}
                    </Tabs>
                </StyledCard >
            </Drawer >
        </>
    );
}