Algorithmic Planning

There is more to algorithmic thinking than just comments for a project like this.

    Have we documented how the application UI should be structured?

    Stolen directly from assignment: 
    Features

Given a governor wants to purchase minerals for a colony
When a governor is chosen
Then the inventory for that governor's colony should be displayed (the mineral names and quantities)
And the facility select element should be enabled

Given a governor has been chosen
When a mining facility is chosen
Then the minerals available for purchase should be displayed (the mineral names and quantities)
And a radio button should be next to each

Given a governor has been chosen
When a mining facility is chosen
Then any minerals with a quantity of 0 should not have a radio button

Given a governor has been selected
And a facility has been selected
When a mineral has been selected
Then the chosen mineral should appear in a Space Cart area with a button labeled Purchase Mineral

Given a governor has been selected
And a facility has been selected
And a mineral has been selected
When the Purchase Mineral button is clicked
Then 1 ton of the chosen mineral should be added to the inventory of the active colony And 1 ton of the chosen mineral should be removed from the inventory of the chosen mining facility
    
    
    
    Is our ERD complete and approved by our instructors?
    Approved

    
    Do we know which HTML elements we are going to use for each component?

    https://www.w3schools.com/howto/howto_js_dropdown.asp

    Select element for drop down. Create option elements for list items 
    <label for="dropdownMenu">Choose an option:</label>
    <select id="dropdownMenu" name="dropdownMenu">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
    </select>

    Radio button from indiana jeans for selecting minerals from facility
    <form>
    <input type="radio" id="option1" name="group1" value="option1">
    <label for="option1">Option 1</label><br>
    <input type="radio" id="option2" name="group1" value="option2">
    <label for="option2">Option 2</label><br>
    <input type="radio" id="option3" name="group1" value="option3">
    <label for="option3">Option 3</label><br>
    </form>

    button from indiana jeans for purchase button. Also update render with customer event from indiana jeans

    Have we defined the CSS classes for each component?
    Yes, in the wireframe

    ## Do we know which modules need to be created, and have the responsibility documented for each one?
        -facility-Minerals-Box-Module, 
        -space-Cart-Box-Module: purchase button, dynamically displays radio button choice  
        -drop-down-Container-Module, 
            -facilityDropdownModule: *needs placeholder func
            -governorDropdownModule: *needs placeholder func
        -colony-Box-Module 
        -Transient-State-Module: *needs placeholder
        -main
        

    ## Do we know the order in which the modules should be developed?
        1. main.js should be first as it will import and orchestrate the other modules 
        2. index.html, as it will need to link main.js
        3. api/database.json, we only need a couple data points for each array at first
        4. 

If anyone on the team is unsure about any of these questions, it leads to uncertainty, loss of productivity, and disagreements. We strongly urge you to solve this problem completely before writing any code.