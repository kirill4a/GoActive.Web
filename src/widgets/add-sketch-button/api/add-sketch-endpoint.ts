import { POST, Sketch } from "../../../shared/api";

interface SketchProps {
    sketch: Sketch;
}

export const CreateSketch = async ({ sketch }: SketchProps): Promise<string | undefined> => {

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