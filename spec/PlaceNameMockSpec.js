import { PlaceManager } from "../lib/model/PlaceManager.js";
import { GeoapifyMock } from "./mocks/GeoapifyMock.js";

describe ('R02-H01-PlaceNameValidationIntegration', () =>{
    let ga = new GeoapifyMock();
    let pm = new PlaceManager();
    pm.setGeocodingAdapter(ga);

    it('placeNameValidationIntegration_validPlaceName_NameExists', async () => {
        ga.validatePlaceByName = jasmine.createSpy("validatePlaceByName").and.returnValue(['onda1','onda2','onda3']);
        try {
            let validName = 'onda';
            let result = await pm.getPlaceByName(validName);
            expect(result.length).toBeGreaterThan(0);
            expect(ga.validatePlaceByName).toHaveBeenCalled();
        } catch (error) {
            console.log(error);
            fail("Did throw exception");
        }
    });

    it('placeNameValidationIntegration_invalidPlaceName_NameDoesntExist', async () => {
        ga.validatePlaceByName = jasmine.createSpy("validatePlaceByName",()=>{throw PlaceNameNotFound});
        try {
            let invalidName = '123aswqe';
            let result = await pm.getPlaceByName(invalidName);
        } catch (error) {
            expect(error).toBe('PlaceNameNotFound');
            expect(ga.validatePlaceByName).toHaveBeenCalled();
        }
    });

});