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
}
export {PlaceManager};