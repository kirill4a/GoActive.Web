import { FC, useEffect, useRef, useState } from "react";
import { Select, Spin } from "antd";
import { DirectionsBike, ErrorOutlineOutlined, Explore, RollerSkating, Spa } from "@mui/icons-material";

import { components } from "../../../shared/api/v1-prealpha";
import { SearchSpots } from "../api/search-spots-endpoint";
import { Spot } from "../model/spot";
import './search-spots-widget.css';

export const SearchLookup: FC = () => {

    const icons = new Map<components['schemas']['ActivityTypes'], JSX.Element>(
        [
            ['NordicSki', <Explore fontSize='medium' color='primary' />],
            ['Biathlon', <DirectionsBike fontSize='medium' color='primary' />],
            ['Workout', <Spa fontSize='medium' color='primary' />],
            ['RollerSki', <RollerSkating fontSize='medium' color='primary' />]
        ]);

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<Spot[]>([]);

    const debounceTimeout = useRef<number | null>(null);

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

            setLoading(true);
            setError(null);

            try {
                const result = await SearchSpots({ queryText: debouncedQuery });
                const spots = result?.items?.map<Spot>(x => {
                    return { Id: x.id!, Title: x.title!, Activities: x.activities ?? [] };
                });
                setData(spots ?? []);
            }
            catch (error: any) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [debouncedQuery]);

    const handleSearch = (value: string) => {

        setError(null);
        setLoading(false);
        setData([]);
        setQuery(value?.trim());
    };

    const renderItem = (item: Spot) => {
        return <Select.Option key={item.Id} value={item.Title}>
            <div className='flex-center'>
                <span>{item.Title}</span>
                <p className='flex-center'>{item.Activities.map(x => icons.get(x))}</p>
            </div>
        </Select.Option>;
    };

    const renderNotFoundContent = () => {

        if (loading) return renderLoading();
        if (error) return renderError();
        return null;
    }

    const renderLoading = () => <Spin size={'default'} />;

    const renderError = () => <div className='flex-center'>
        <ErrorOutlineOutlined fontSize='small' color='warning' />
        <p>Something went wrong</p>
    </div>;

    return (
        <>
            <Select className='search-lookup'
                showSearch={true}
                allowClear={true}
                filterOption={false}
                popupMatchSelectWidth={true}
                suffixIcon={null}
                placeholder='Type name, address or activity ....'
                optionLabelProp='label'
                notFoundContent={renderNotFoundContent()}
                onSearch={handleSearch}
            >
                {data.map(renderItem)}
            </Select>
        </>);
}