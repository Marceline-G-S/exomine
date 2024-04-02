import { getTransientState } from "./TransientState.js";
import { setMineralChoice } from "./TransientState.js";

const handleMineralChoiceChange = (changeEvent) => {
    if (changeEvent.target.name === "mineralChoice") {
        const convertedINT = parseInt(changeEvent.target.value)
        setMineralChoice(convertedINT)
    }
}



export const facilityContainer = async () => {

    const transientState = getTransientState()

    const getFacilityMinerals = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMineralsArray = await getFacilityMinerals.json()

    const getMiningFacilities = await fetch("http://localhost:8088/miningFacilities")
    const facilitiesArray = await getMiningFacilities.json()

    const getMinerals = await fetch("http://localhost:8088/minerals")
    const mineralArray = await getMinerals.json()

    let HTML = `<div class="facilityChoiceBox">`

    HTML += `<h2>Facility Minerals</h2>`

    if (transientState.facilityChoices != 0) {

        HTML += `<h3>${facilitiesArray[transientState.facilityChoices - 1].name}</h3>`
        document.addEventListener("change", handleMineralChoiceChange)

        for (const facilityMinerals of facilityMineralsArray) {

            if (facilityMinerals.facilityId === transientState.facilityChoices) {

                HTML += `<input type='radio' name='mineralChoice' value='${facilityMinerals.id}' /> ${mineralArray[facilityMinerals.mineralId - 1].name}`

            }
        }
    }
    HTML += `</div>`
    return HTML
}

// iterate through the arrays
//  create radio buttons
//  construct and return HTML
