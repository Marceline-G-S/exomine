import { dropDownContainer } from "./dropdown/dropdownContainer.js";
import { facilityContainer } from "./facilityChoices.js";
import { spaceCartContainer } from "./spaceCart.js";
// import { facilitiesList } from "./dropdown/facilityDropdown.js";
// import { GovernorsList } from "./dropdown/governorDropdown.js"

const container = document.querySelector("#container")




const render = async () => {
  // const governorsHTML = await GovernorsList();
  // const facilitiesHTML = await facilitiesList();
  // Call the functions created inside of other module
  const dropDownHTML = await dropDownContainer()
  const facilityHTML = await facilityContainer()
  const spaceCartHTML = await spaceCartContainer()


  container.innerHTML = `
                            ${dropDownHTML}
                            ${facilityHTML}
                            ${spaceCartHTML}
                          `
}


document.addEventListener("stateChanged", render)

render()