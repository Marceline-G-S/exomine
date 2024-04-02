import {  getColony, getColonyMineralArray, getMineral, getTransientState } from "./TransientState.js"






export const colonyBoxContainer = async () => {
    
    const transientState = getTransientState();
    
    let html =`<h1>Colony Minerals</h1>`
    if (transientState.colonyChoices != 0) {
        const colony = await getColony(transientState.colonyChoices)
        html = `<h1>Facitlity Minerals for ${colony.name} </h1>`
        
        }

    if (transientState.colonyChoices != 0) {
        let coloniesMinerals = [];
        coloniesMinerals = await getColonyMineralArray(transientState.colonyChoices);
        for (const colonyMin of coloniesMinerals) {
            const mineral = await getMineral(colonyMin.mineralId)
            html += `<div>${colonyMin.colonyTons} tons of ${mineral.name}</div>`           
        }
    }
        

    return html
}