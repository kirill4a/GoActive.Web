import { POST, Sketch } from "../../../shared/api";

export const CreateSketch = async (sketch: Sketch): Promise<string | undefined> => {

    const response = await POST('/api/v1-prealpha/sketches', {
        body: {
            title: sketch.title!,
            location: {
                latitude: sketch.location?.latitude,
                longitude: sketch.location?.longitude
            },
            activityTypes: sketch.activityTypes!
        }
    });

    return response.data;
}