import { auth } from "../config/firebase.js";
import { db } from "../config/firebase.js";

describe('R02-H1-PlaceNameValidation', () => {
    let ga = new GeoapifyAdapter();
    let pm = new PlaceManager();
    pm.setGeocodingAdapter(ga);

    it('e1_validatePlaceName_NameExists', () => {
        try {
            let validName = 'onda';
            let result = pm.getPlaceByName(validName);
            expect(result.length).toBeGreaterThan(0);
        } catch (error) {
            console.log(error);
        }
    });

    it('e2_validatePlaceName_NameDoesntExist', () => {
        try {
            let invalidName = '123aswqe';
            let result = pm.getPlaceByName(invalidName);
        } catch (error) {
            expect(error).toBe('PlaceNameNotFound');
        }
    });
});