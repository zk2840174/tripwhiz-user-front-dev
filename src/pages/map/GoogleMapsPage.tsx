import BaseLayout from "../../layouts/BaseLayout.tsx";

import GoogleMapContainer from "../../components/map/GoogleMapContainer.tsx";


function GoogleMapsPage() {
    return (
        <div>
            <BaseLayout>
                <GoogleMapContainer/>
            </BaseLayout>
        </div>
    );
}

export default GoogleMapsPage;