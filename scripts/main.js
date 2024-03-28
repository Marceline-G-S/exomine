import { GovernorsList } from "./dropdown/governorDropdown.js"

const container = document.querySelector("#container")




const render = async () => {
    const governorsHTML = await GovernorsList();
    // Call the functions created inside of other module




    container.innerHTML = `
                            ${governorsHTML}

                          `
}


document.addEventListener("stateChanged", render)

render()