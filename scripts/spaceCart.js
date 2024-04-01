import { getTransientState } from "./TransientState.js"

const handleSpacePurchase = async (clickEvent) => {
    if (clickEvent.target.id === "purchaseButton") {
        await putMineralJoinTables()
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

    let html = `<h1>space cart:</h1>`
    if (transientState.facilityMineralsChoices != 0){
        html += `${mineralArray[facilityMineralsArray[transientState.facilityMineralsChoices - 1].mineralId - 1].name}`
    }
    html += await spacePurchaseButton();
    return html
}

// Change the database array for facilityMinerals (minus one) and colonyMinerals (plus one)
// Need the correct objects from both arrays to change. Change tons property on object
// Need a put statement for both


const putMineralJoinTables = async () =>{
    const transientState = getTransientState()
    const getFacilityMinerals = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMineralsArray = await getFacilityMinerals.json()

    const getColonyMineralsArray = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMineralsArray = await getColonyMineralsArray.json()

    let correctedFacilityMineral = {}
    let correctedColonyMineral = {}

    for (const facilityMineral of facilityMineralsArray) {
        if (transientState.facilityMineralsChoices == facilityMineral.id){
            correctedFacilityMineral = { ...facilityMineral }; // Copy the object
            correctedFacilityMineral.facilityTons -= 1;
            break; // Exit the loop after finding the matching item
        }
    }
    let ifMatched = false
    for (const colonyMineral of colonyMineralsArray) {
        if ((correctedFacilityMineral.mineralId == colonyMineral.mineralId) && (transientState.colonyChoices == colonyMineral.colonyId)){
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
    if (!ifMatched){
    correctedColonyMineral =     {
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
    })}


    await fetch(`http://localhost:8088/facilityMinerals/${correctedFacilityMineral.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(correctedFacilityMineral)
    })

    
 
 
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