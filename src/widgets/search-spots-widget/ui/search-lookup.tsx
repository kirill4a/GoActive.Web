import { FC, useEffect, useRef, useState } from "react";
import { AutoComplete, AutoCompleteProps, Flex, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { DirectionsBike, ErrorOutlineOutlined, Explore, RollerSkating, Spa } from "@mui/icons-material";

import { components } from "../../../shared/api/v1-prealpha";
import { SearchSpots } from "../api/search-spots-endpoint";
import { Spot } from "../model/spot";
import { SearchLookupOptions } from "./search-lookup-options";
import './search-spots-widget.css';

export const SearchLookup: FC<SearchLookupOptions> = ({ onSelected, onClear }) => {

    const icons = new Map<components['schemas']['ActivityTypes'], JSX.Element>(
        [
            ['NordicSki', <Explore fontSize='medium' color='primary' key='NordicSki' />],
            ['Biathlon', <DirectionsBike fontSize='medium' color='primary' key='Biathlon' />],
            ['Workout', <Spa fontSize='medium' color='primary' key='Workout' />],
            ['RollerSki', <RollerSkating fontSize='medium' color='primary' key='RollerSki' />]
        ]);

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const debounceTimeout = useRef<number | null>(null);

    const [data, setData] = useState<Spot[]>([]);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [selectedTitle, setSelectedTitle] = useState('');

    useEffect(() => {

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            setDebouncedQuery(query);
        }, 1000);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        }
    }, [query]);

    useEffect(() => {

        if (!debouncedQuery) {
            return;
        }

        const fetchData = async () => {

            setOptions([renderLoading()]);

            try {
                const result = await SearchSpots({ queryText: debouncedQuery });
                const spots = result?.items?.map<Spot>(x => {
                    return {
                        Id: x.id!,
                        Latitude: x.location?.latitude!,
                        Longitude: x.location?.longitude!,
                        Title: x.title!,
                        Address: x.address,
                        Activities: x.activities ?? []
                    };
                });
                setData(spots ?? []);
            }
            catch (error: any) {
                setOptions([renderError()]);
            }
        };

        fetchData();
    }, [debouncedQuery]);

    useEffect(() => setOptions(data.map(renderItem)), [data]);

    const handleSearch = (value: string) => setQuery(value?.trim());

    const handleSelect = (value: string, option: DefaultOptionType) => {

        setSelectedTitle(option.title ?? '');

        if (!value || !onSelected)
            return;

        const spot = data.find(x => x.Id === value);
        if (!spot)
            return;

        onSelected(value, spot.Latitude, spot.Longitude);
    };

    const handleClear = () => {

        if (!onClear)
            return;

        onClear();
    }

    const renderLoading = () => ({ label: (<Spin size={'default'} />) });

    const renderError = () => ({
        label: (
            <Flex align='center'>
                <ErrorOutlineOutlined fontSize='small' color='warning' />
                <p>Something went wrong</p>
            </Flex>)
    });

    const renderItem = (item: Spot) => ({
        value: item.Id,
        title: item.Title,
        label:
            (<>
                <Flex align='center' justify='space-between'>
                    <b>{item.Title}</b>
                    <p className='flex-center'>{item.Activities.map(x => icons.get(x))}</p>
                </Flex>
                <i>{item.Address}</i>
            </>)
    });

    return (
        <>
            <AutoComplete
                className='search-lookup'
                allowClear={true}
                placeholder='Type name, address or activity ....'
                value={selectedTitle}
                options={options}
                onChange={val => setSelectedTitle(val)}
                onSearch={handleSearch}
                onSelect={handleSelect}
                onClear={handleClear}
            >
            </AutoComplete>
        </>);
}
