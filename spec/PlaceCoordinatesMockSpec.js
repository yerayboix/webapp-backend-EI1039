import { PlaceManager } from "../lib/model/PlaceManager.js";
import { GeoapifyMock } from "./mocks/GeoapifyMock.js";

describe ('R02-H02-PlaceCoordinatesValidationIntegration', () =>{
    let ga = new GeoapifyMock();
    let pm = new PlaceManager();
    pm.setGeocodingAdapter(ga);

    it('placeCoordinatesValidationIntegration_validCoordinates_coordinatesExists', async () => {
        ga.validatePlaceByCoordinates = jasmine.createSpy("validatePlaceByCoordinates").and.returnValue(['onda1']);
        try {
            let validLat = 39.9929;
            let validLon = -0.0576;
            let result = await pm.getPlaceByCoordinates(validLat, validLon);
            expect(result.length).toBeGreaterThan(0);
            expect(ga.validatePlaceByCoordinates).toHaveBeenCalled();
        } catch (error) {
            console.log(error);
        }
    });

    it('placeCoordinatesValidationIntegration_invalidCoordinates_placeCoordinatesNotFound', async () => {
        ga.validatePlaceByCoordinates = jasmine.createSpy("validatePlaceByCoordinates",()=>{throw PlaceCoordinatesNotFound});
        try {
            let validLat = 90;
            let validLon = -0.0576;
            let result = await pm.getPlaceByCoordinates(validLat, validLon);
        } catch (error) {
            expect(error).toBe('PlaceCoordinatesNotFound');
            expect(ga.validatePlaceByCoordinates).toHaveBeenCalled();
        }
    });

    

});