class PlaceManager{
    geocodingAdapter;

    constructor(){
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
}
export {PlaceManager};

 
