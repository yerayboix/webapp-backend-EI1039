import { PlaceManager } from "../lib/model/PlaceManager.js";
import { GeoapifyAdapter } from "../lib/adapter/GeoapifyAdapter.js";

describe('R02-H02-PlaceCoordinatesValidation', () => {
    let ga = new GeoapifyAdapter();
    let pm = new PlaceManager();
    pm.setGeocodingAdapter(ga);

    it('e1_validatePlaceCoordinates_ValidCoordinates', async () => {
        try {
            let validLat = 39.9929;
            let validLon = -0.0576;
            let result = await pm.getPlaceByCoordinates(validLat, validLon);
            expect(result.length).toBeGreaterThan(0);
        } catch (error) {
            console.log(error);
        }
    });

    it('e2_validatePlaceCoordinates_InvalidCoordinates', async () => {
        try {
            let validLat = 39.9929;
            let validLon = -0.0576;
            let result = await pm.getPlaceByCoordinates(validLat, validLon);
        } catch (error) {
            expect(error).toBe('PlaceCoordinatesNotFound');
        }
    });
});