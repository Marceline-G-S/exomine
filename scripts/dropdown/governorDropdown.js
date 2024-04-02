import { getTransientState, setColony, setGovernorChoices } from "../TransientState.js"



const handleGovernorChange = (changeEvent) => {
    if (changeEvent.target.name === "governors") {
        const governorId = JSON.parse(changeEvent.target.value)
        setColony(governorId)
        setGovernorChoices(governorId)
    }
}


export const GovernorsList = async () => {
    const response = await fetch('http://localhost:8088/governors');
    const govArrayFromDatabase = await response.json();
    const transientState = getTransientState();

    let governorsHTML = ` <label for="governors">Choose a governor:</label>
    
                            <select name="governors" id="governors">`

    for (const governor of govArrayFromDatabase) {
        (governor.id == transientState.governorChoices) ?
            (governorsHTML += `<option selected value="${governor.id}">${governor.name}</option>`) :
            (governorsHTML += `<option value="${governor.id}">${governor.name}</option>`)

    }


    governorsHTML += `</select> `
    document.addEventListener("change", handleGovernorChange)

    return governorsHTML
}


