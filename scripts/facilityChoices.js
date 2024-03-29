import { getTransientState } from "./TransientState.js";



export const facilityContainer = async () => {

    const transientState = getTransientState()

    const getFacilityMinerals = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMineralsArray = await getFacilityMinerals.json()

    const getMiningFacilities = await fetch("http://localhost:8088/miningFacilities")
    const facilitiesArray = await getMiningFacilities.json()

    const getMinerals = await fetch("http://localhost:8088/minerals")
    const mineralArray = await getMinerals.json()


    let HTML = `<h1>Facility Minerals</h1>`

    if (transientState.facilityChoices != 0) {

        HTML += `<h1>${facilitiesArray[transientState.facilityChoices - 1].name}</h1>`

        for (const facilityMinerals of facilityMineralsArray) {

            if (facilityMinerals.facilityId === transientState.facilityChoices) {

                HTML += `<input type='radio' name='mineralChoice' value='${facilityMinerals.id}' /> ${mineralArray[facilityMinerals.mineralId - 1].name}`

            }
        }
    }

    return HTML
}

// iterate through the arrays
//  create radio buttons
//  construct and return HTML
