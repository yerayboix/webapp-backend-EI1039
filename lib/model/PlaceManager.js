class PlaceManager{
    serviceResponseConstructor;

    constructor(){
    };

    setServiceResponseConstructor(serviceResponseConstructor){
        this.serviceResponseConstructor = serviceResponseConstructor;
    };
    
    async getPlaceInfoFromAPIServices(placeObject, needsDetail){
        return await this.serviceResponseConstructor.obtainAllActiveServicesFromPlace(placeObject, needsDetail);
    }

}
export {PlaceManager};