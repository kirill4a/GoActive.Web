import { GET } from "../../../shared/api";
import { components } from "../../../shared/api/v1-prealpha";

export const GetSpot = async (spotId: string): Promise<components['schemas']['GetSpotResult'] | undefined> => {

    const response = await GET('/api/v1-prealpha/spots/{spotId}',
        {
            params: { path: { spotId } }
        }
    );

    if (response.error) {
        throw response.error;
    }

    const data = response.data;
    return data;
}