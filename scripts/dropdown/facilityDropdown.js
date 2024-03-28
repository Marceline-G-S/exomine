import { setFacilityChoices } from "../TransientState.js";



const handleFacilityChange = (changeEvent) => {
    if (changeEvent.target.name === "facilities") {
        const facilityId = JSON.parse(changeEvent.target.value)
        setFacilityChoices(facilityId)
    }
}



export const facilitiesList = async () => {
    const response = await fetch('http://localhost:8088/miningFacilities');
    const facilityArray = await response.json();

    let facilitiesHTML = ` <label for="facilities">Choose a facility:</label>
    
                            <select name="facilities" id="facilities">`
        
    for (const facility of facilityArray) {
        facilitiesHTML += `<option value="${facility.id}">${facility.name}</option>`
        
    }   

                                  
    facilitiesHTML += `</select> `
    // When selecting facility, call handle facility function
    document.addEventListener("change", handleFacilityChange)
    return facilitiesHTML
}