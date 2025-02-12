import { getTransientState } from "./TransientState.js"

const handleSpacePurchase = async (clickEvent) => {
    const transientState = getTransientState()
    if ((clickEvent.target.id === "purchaseButton") && (transientState.governorChoices != 0) && (transientState.facilityChoices != 0) && (transientState.facilityMineralsChoices != 0)) {
        putMineralJoinTables()
    }
}

export const spacePurchaseButton = async () => {
    document.addEventListener("click", handleSpacePurchase)
    return "<button id='purchaseButton'>space purchase</button>"
}

export const spaceCartContainer = async () => {
    const transientState = getTransientState()
    const getMinerals = await fetch("http://localhost:8088/minerals")
    const mineralArray = await getMinerals.json()

    const getFacilityMinerals = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMineralsArray = await getFacilityMinerals.json()

    let html = `<div class="spaceCartContainer">`
    html += `<h2>Space Cart:</h2>`
    if (transientState.facilityMineralsChoices != 0) {
        html += `${mineralArray[facilityMineralsArray[transientState.facilityMineralsChoices - 1].mineralId - 1].name}`
    }
    html += await spacePurchaseButton();

    html += `</div>`
    return html
}

// Change the database array for facilityMinerals (minus one) and colonyMinerals (plus one)
// Need the correct objects from both arrays to change. Change tons property on object
// Need a put statement for both


const putMineralJoinTables = async () => {
    const transientState = getTransientState()
    const getFacilityMinerals = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMineralsArray = await getFacilityMinerals.json()

    const getColonyMineralsArray = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMineralsArray = await getColonyMineralsArray.json()

    let correctedFacilityMineral = {}
    let correctedColonyMineral = {}

    for (const facilityMineral of facilityMineralsArray) {
        if (transientState.facilityMineralsChoices == facilityMineral.id) {
            correctedFacilityMineral = { ...facilityMineral }; // Copy the object
            correctedFacilityMineral.facilityTons -= 1;
            break; // Exit the loop after finding the matching item
        }
    }

    let ifMatched = false
    for (const colonyMineral of colonyMineralsArray) {
        // On the colony minerals join table, match the minerals and colony to find/PUT the correct entry. 
        if ((correctedFacilityMineral.mineralId == colonyMineral.mineralId) && (transientState.colonyChoices == colonyMineral.colonyId)) {
            ifMatched = true
            correctedColonyMineral = { ...colonyMineral };
            correctedColonyMineral.colonyTons += 1
            console.log(correctedColonyMineral)

            await fetch(`http://localhost:8088/colonyMinerals/${correctedColonyMineral.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(correctedColonyMineral)
            })
            break
        }
    }

    //If no match is found, POST a new entry.
    if (!ifMatched) {
        correctedColonyMineral = {
            "id": (colonyMineralsArray.length + 1),
            "colonyId": transientState.colonyChoices,
            "mineralId": correctedFacilityMineral.mineralId,
            "colonyTons": 1
        }

        await fetch("http://localhost:8088/colonyMinerals/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(correctedColonyMineral)
        })
    }

    // PUT to facility minerals to update old listing and remove one ton
    await fetch(`http://localhost:8088/facilityMinerals/${correctedFacilityMineral.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(correctedFacilityMineral)
    })
    document.dispatchEvent(new CustomEvent("stateChanged"))



    //const data = await response.json( );

    // now do whatever you want with the data  
    //console.log(data);
}


// facilityMineral object to be changed/displayed
// 
// Needs to display selected mineral
// Display button
// Clicking button, needs to : 


// Remove mineral from facilityMinerals:

// colonyMinerals object needed to modify
// Add mineral to colonyMinerals