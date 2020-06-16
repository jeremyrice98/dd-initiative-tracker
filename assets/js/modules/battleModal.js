// generates content for the modal
var modalHandler = function () {
    var playerContainerEl = $("#monsterList-container") // #monsterList-container needs to be switched to player
    var playerList = playerContainerEl.find(".monster-container") || []; // .monsterName needs to be switched to player name
    console.log(playerList);
    
    // takes each player entered and makes their name into a button in the modal
    playerList.each(function() {
        //var i = 0;
        var playerName = $(this).find(".card-title").text().split(":")[1].trim();
        //var monsterContainerList = $("#monsterList-container").find("#monster-container")
        //monsterContainerList.each(function() {
            //monsterContainerId = $(this).attr("data-id")
        //})
        var monsterId = $(this).attr("data-id")
        var modalButtonEl = $("<a>")
            .addClass("waves-effect waves-light btn modalButton")
            .text(playerName)
            .attr("data-id", monsterId);

        var modalContentEl = $(".modal-content");
        modalContentEl.append(modalButtonEl); // buttons don't generate with spacing... idk why.
    });
}

// on click of buttons in modal removes that button and formats <p> in .modal-content
var initiativeHandler = function(buttonEl) {
    // remove button clicked, save to list
    var searchHistory = JSON.parse(localStorage.getItem("monster")) || [];
    if (!searchHistory.length) {
        var id = 0;
    }
    else {
        var id = searchHistory[searchHistory.length - 1].id; // set id to last id saved
    }
    if (Number.isInteger(searchHistory[searchHistory.length - 1])) {
        var orderNum = searchHistory.pop() + 1;
    }
    else {
        var orderNum = 1;
    }
    var monsterIndex = searchHistory.findIndex(element => element.id === buttonEl.attr("data-id"));
    searchHistory[monsterIndex].orderNum = orderNum;
    searchHistory.push(orderNum);
    localStorage.setItem(JSON.stringify(searchHistory));
    buttonEl.remove();

    // reformat <p> in .modal-content
    var modalContent = $(".modal-content").children().eq(1).text().trim();
    modalContent = modalContent.split(" ")
    modalContent.pop()
    modalContent = `${modalContent.join(" ")} next?`;
    $(".modal-content p").text(modalContent);
}

export { modalHandler, initiativeHandler }

// work on saving order for initiative tracker