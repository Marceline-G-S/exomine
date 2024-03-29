const state = {

}

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
    "colonyChoices": 0
}



export const setGovernorChoices = (chosenGovernor) => {
    transientState.governorChoices = chosenGovernor
    console.log(transientState)

}
// Functions to modify each property of transient state
export const setFacilityChoices = (chosenFacility) => {
    transientState.facilityChoices = chosenFacility
    console.log(transientState)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColony = async(chosenGovernor) => {
    const response = await fetch('http://localhost:8088/governors');
    const govArrayFromDatabase = await response.json();

    transientState.colonyChoices = govArrayFromDatabase[chosenGovernor-1].colonyId
    console.log(transientState)
    document.dispatchEvent(new CustomEvent("stateChanged"))
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
