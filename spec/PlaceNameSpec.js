import { PlaceManager } from "../lib/model/PlaceManager.js";
import { GeoapifyAdapter } from "../lib/adapter/GeoapifyAdapter.js";

describe('R02-H1-PlaceNameValidation', () => {
    let ga = new GeoapifyAdapter();
    let pm = new PlaceManager();
    pm.setGeocodingAdapter(ga);

    it('e1_validatePlaceName_NameExists', async () => {
        try {
            let validName = 'onda';
            let result = await pm.getPlaceByName(validName);
            expect(result.length).toBeGreaterThan(0);
        } catch (error) {
            console.log(error);
        }
    });

    it('e2_validatePlaceName_NameDoesntExist', async () => {
        try {
            let invalidName = '123aswqe';
            let result = await pm.getPlaceByName(invalidName);
        } catch (error) {
            expect(error).toBe('PlaceNameNotFound');
        }
    });
});