import React from "react";
import '../../css/Manager.css'

function SaveChangesMenu () {
    return (
        <button type="submit" class="saveChanges">
            <span class="saveChangesShadow"></span>
            <span class="saveChangesEdge"></span>
            <span class="saveChangesText"> Save Changes
            </span>
        </button>
    );
}

export default SaveChangesMenu;