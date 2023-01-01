class PlaceManager{
    geocodingAdapter;
    serviceResponseConstructor;

    constructor(){
    };

    setServiceResponseConstructor(serviceResponseConstructor){
        this.serviceResponseConstructor = serviceResponseConstructor;
    };

    setGeocodingAdapter(geocodingAdapter){
        this.geocodingAdapter = geocodingAdapter;
    };

    async getPlaceByName(placeName){
        return this.geocodingAdapter.validatePlaceByName(placeName);
    };

    async getPlaceByCoordinates(lat, lon){
        return this.geocodingAdapter.validatePlaceByCoordinates(lat, lon);
    };

    async getPlaceInfoFromAPIServices(placeObject, needsDetail){
        return await this.serviceResponseConstructor.obtainAllActiveServicesFromPlace(placeObject, needsDetail);
    }
}
export {PlaceManager};
