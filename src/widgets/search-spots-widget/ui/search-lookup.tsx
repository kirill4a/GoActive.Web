import { FC, useEffect, useRef, useState } from "react";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { AutoComplete, AutoCompleteProps, Flex, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";

import { GetActivityIcon } from "../../../shared/ui/activity-icons";
import { SearchSpots } from "../api/search-spots-endpoint";
import { SearchLookupOptions } from "./search-lookup-options";
import { SearchedSpot } from "../../../shared/api";
import './search-spots-widget.css';

export const SearchLookup: FC<SearchLookupOptions> = ({ onSelected, onClear }) => {

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const debounceTimeout = useRef<number | null>(null);

    const [data, setData] = useState<SearchedSpot[]>([]);
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
                setData(result?.items ?? []);
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

        const spot = data.find(x => x.id === value);
        if (!spot)
            return;

        onSelected(spot);
    };

    const handleClear = () => {

        setData([]);

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

    const renderItem = (item: SearchedSpot) => ({
        value: item.id!,
        title: item.title!,
        label:
            (<>
                <Flex align='center' justify='space-between'>
                    <b>{item.title}</b>
                    <p className='flex-center'>{item.activities?.map(x => GetActivityIcon(x))}</p>
                </Flex>
                <i>{item.address}</i>
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
