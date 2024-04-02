import { GovernorsList } from "./governorDropdown.js";
import { facilitiesList } from "./facilityDropdown.js";



export const dropDownContainer = async () => {

    const govList = await GovernorsList()
    const facList = await facilitiesList()

    let html = `<div class="dropdownContainer">
                            <div>${govList}</div>
                            <div>${facList}</div>                   
                        </div>`

    return html

}
