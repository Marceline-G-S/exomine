

export const setFacility = (facilityId) => {
    state.selectedFacility = facilityId

}

export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}

const transientState = {
    "governorChoices": 0,
    "facilityChoices": 0,
    "colonyChoices": 0,
    "facilityMineralsChoices": 0,
}




export const setGovernorChoices = async (chosenGovernor) => {
    transientState.governorChoices = chosenGovernor
    const response = await fetch('http://localhost:8088/governors');
    const govArrayFromDatabase = await response.json();

    if (chosenGovernor == 0){
        transientState.governorChoices = 0;
    }else {
        transientState.governorChoices = chosenGovernor
    }
    

    console.log(transientState)
}

// Functions to modify each property of transient state
export const setFacilityChoices = (chosenFacility) => {
    transientState.facilityChoices = chosenFacility
    transientState.facilityMineralsChoices = 0
    console.log(transientState)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColony = async (chosenGovernor) => {
    const response = await fetch('http://localhost:8088/governors');
    const govArrayFromDatabase = await response.json();

    if (chosenGovernor == 0){
        transientState.colonyChoices = 0;
    }else {
        transientState.colonyChoices = govArrayFromDatabase[chosenGovernor - 1].colonyId
    }
    console.log(transientState)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineralChoice = (chosenFacilityMineralsId) => {
    transientState.facilityMineralsChoices = chosenFacilityMineralsId
    console.log(transientState)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getTransientState = () => {
    return transientState
}

export const getColony = async (colonyId) => { 
    const response = await fetch('http://localhost:8088/colonies');
    const colonyArrayFromDatabase = await response.json();

        return colonyArrayFromDatabase[colonyId - 1]
}

export const getColonyMinerals = async (colonyMineralsId) => {  
    const response = await fetch('http://localhost:8088/colonyMinerals');
    const colonyMineralsArrayFromDatabase = await response.json();

    return colonyMineralsArrayFromDatabase[colonyMineralsId - 1]
}



export const getColonyMineralArray = async (colonyId) => { 
    let arrayOfALLColonyMinerals = [];
    const response = await fetch('http://localhost:8088/colonyMinerals');
    const colonyArrayFromDatabase = await response.json();

    for (const mineralsToColony of colonyArrayFromDatabase) {
        if ( mineralsToColony.colonyId === colonyId ) {
            
            arrayOfALLColonyMinerals.push({...mineralsToColony})   
        }       
    }   
    return arrayOfALLColonyMinerals

}

export const getMineral= async (mineralId) => { 
    const response = await fetch('http://localhost:8088/minerals');
    const mineralsArray = await response.json();
    

return mineralsArray[mineralId - 1]
}








// Function to convert transient state to permanent state
// export const saveSurveySubmission = async () => {
//     const postOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(transientState)
//     }


//     const response = await fetch("http://localhost:8088/submissions", postOptions)
// }
