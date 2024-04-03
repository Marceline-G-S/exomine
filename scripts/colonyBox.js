import { getColony, getColonyMineralArray, getMineral, getTransientState } from "./TransientState.js"






export const colonyBoxContainer = async () => {

    const transientState = getTransientState();
    let openingHTML = `<div class="colonyBoxContainer">`
    let html = `<h2>Colony Minerals</h2>`
    if (transientState.colonyChoices != 0) {
        const colony = await getColony(transientState.colonyChoices)
        html = `<h2>Colony Minerals for ${colony.name} </h2>`

    }

    if (transientState.colonyChoices != 0) {
        let coloniesMinerals = [];
        coloniesMinerals = await getColonyMineralArray(transientState.colonyChoices);
        for (const colonyMin of coloniesMinerals) {
            const mineral = await getMineral(colonyMin.mineralId)
            html += `<div>${colonyMin.colonyTons} tons of ${mineral.name}</div>`
        }


    }

    html = openingHTML + html + `</div>`

    return html
}