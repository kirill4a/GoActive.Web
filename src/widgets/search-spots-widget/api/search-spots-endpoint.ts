import { ActivityTypes, GET } from "../../../shared/api";
import { components } from "../../../shared/api/v1-prealpha";

interface SearchProps {

    queryText: string;
    activities?: ActivityTypes[];
}

export const SearchSpots = async ({ queryText, activities }: SearchProps): Promise<components['schemas']['SearchSpotsResponse'] | undefined> => {

    const response = await GET('/api/v1-prealpha/spots', {
        params: {
            query: {
                q: queryText,
                activities: activities
            }
        }
    });

    if (response.error) {
        throw response.error;
    }

    const data = response.data;
    return data;
}