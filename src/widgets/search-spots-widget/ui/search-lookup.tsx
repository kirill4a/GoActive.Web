import { FC, useEffect, useMemo, useState } from "react";
import { Autocomplete, AutocompleteRenderInputParams, Box, CircularProgress, debounce, styled, TextField, Typography } from "@mui/material";
import { ErrorOutlineOutlined } from "@mui/icons-material";

import { GetActivityIcon } from "../../../shared/ui/activity-icons";
import { SearchSpots } from "../api/search-spots-endpoint";
import { SearchLookupOptions } from "./search-lookup-options";
import { SearchedSpot } from "../../../shared/api";
import './search-spots-widget.css';

const FlexBox = styled(Box)(({ theme }) => ({
    display: 'flex'
}));

const SearchInput = styled(TextField)({
    '.MuiInputBase-root': {
        backgroundColor: '#f0f0ff'
    },
});

export const SearchLookup: FC<SearchLookupOptions> = ({ onSelected, onClear }) => {

    const [query, setQuery] = useState('');
    const [value, setValue] = useState<SearchedSpot | null>();
    const [data, setData] = useState<readonly SearchedSpot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async (query: string) => {

        if (query === '') {
            setData([]);
            return;
        }

        setLoading(true);

        try {
            const result = await SearchSpots({ queryText: query });
            setData(result?.items ?? []);
        }
        catch (error: any) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    };

    const debounceFetch = useMemo(() => debounce(query => fetchData(query), 1000), []);

    useEffect(() => {

        debounceFetch(query);
        return () => { }
    }, [query]);

    const handleSearch = (text: string) => setQuery(text?.trim());

    const handleSelect = (key?: string) => {

        if (!key || !onSelected)
            return;

        const spot = data.find(x => x.id === key);
        if (!spot)
            return;

        onSelected(spot);
    };

    const handleClear = () => {

        setData(value ? [value] : []);

        if (!onClear)
            return;

        onClear();
    }

    const renderInput = (params: AutocompleteRenderInputParams) =>
        <SearchInput
            {...params}
            label='Type name, address or activity ....'
            slotProps={{
                formHelperText: {
                    component: 'div'
                },
                input: {
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {loading ? <CircularProgress size={31} /> : null}
                            {params.InputProps.endAdornment}
                        </>
                    )
                }
            }}
            error={!!error}
            helperText={!!error && renderError()}
        />;

    const renderError = () => (
        <FlexBox>
            <ErrorOutlineOutlined fontSize='small' color='warning' />
            <p>Something went wrong</p>
        </FlexBox>);

    const renderItem = (props: { [x: string]: any; key: any; }, item: SearchedSpot) => {

        const { key, ...optionProps } = props;
        return (
            <li key={key} {...optionProps}>
                <Box sx={{ width: '100%' }}>
                    <FlexBox sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <b>{item.title}</b>
                        <FlexBox>
                            {item.activities?.map(x => GetActivityIcon(x))}
                        </FlexBox>
                    </FlexBox>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <i>{item.address}</i>
                    </Typography>
                </Box>
            </li>
        )
    };

    return (
        <>
            <Autocomplete
                className='search-lookup'
                freeSolo
                autoComplete
                autoSelect
                filterSelectedOptions
                filterOptions={x => x}
                renderInput={renderInput}
                noOptionsText='Nothing found'
                value={value}
                options={data}
                renderOption={renderItem}
                getOptionLabel={option => typeof option === 'string' ? option : (option.title ?? 'no title')}
                onInputChange={(_, val, reason) => {

                    setError(false);
                    if (reason === 'clear' || val === '')
                        handleClear();

                    if (reason === 'input')
                        handleSearch(val);
                }}
                onChange={(_, item) => {

                    if (typeof item === 'string')
                        return;
                    handleSelect(item?.id);
                }}
            >
            </Autocomplete >
        </>);
}
