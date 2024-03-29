import { facilitiesList } from "./dropdown/facilityDropdown.js";
import { GovernorsList } from "./dropdown/governorDropdown.js"

const container = document.querySelector("#container")




const render = async () => {
    const governorsHTML = await GovernorsList();
    const facilitiesHTML = await facilitiesList();
    // Call the functions created inside of other module




    container.innerHTML = `
                            ${governorsHTML}
                            ${facilitiesHTML}
                          `
}


document.addEventListener("stateChanged", render)

render()