var toastObj = {
    text: "Some Licenses are about to expire please check notifications", // Text that is to be shown in the toast
    heading: 'License Status', // Optional heading to be shown on the toast
    icon: 'warning', // Type of toast icon
    showHideTransition: 'slide', // fade, slide or plain
    allowToastClose: true, // Boolean value true or false
    hideAfter: 5000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
    position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
    textAlign: 'left',  // Text alignment i.e. left, right or center
    loader: true,  // Whether to show loader or not. True by default
    loaderBg: '#9EC600',  // Background color of the toast loader
};
var connection = new signalR.HubConnectionBuilder().withUrl("/LicHub").build();
connection.start().then(x => {
    console.log("connection started");
});
if (localStorage.getItem("licMsgRsv") === "true") {
    var messages = JSON.parse(localStorage.getItem("licMsg"));
    fillDropDown(messages);
}
function fillDropDown(messages) {
    var dropDown = document.getElementById("myDropdown");
    [...messages].forEach(msg => {
        var licSection = document.createElement("a");
        licSection.className = "btn bg-warning";
        licSection.style = "padding: 10px; box-shadow: 3px 6px;";
        licSection.innerHTML = `${msg} <span class="glyphicon glyphicon-info-sign"></span>`;
        dropDown.appendChild(licSection);
    });
}

connection.on("ClrLiceMsg", function () {
    localStorage.removeItem("licMsg");
    localStorage.removeItem("licMsgRsv");
    //notification drop down
    var dropDown = document.getElementById("myDropdown");
    //first child of drop down which is logout form
    var form = document.getElementById("logOutForm").outerHTML;
    dropDown.innerHTML = form + ` <br>`;

});

connection.on("ReceiveAlert", function (messages) {
    $.toast(toastObj);
    var badge = document.getElementById("notiBadge");
    if (localStorage.getItem("licMsgRsv") === "true")
        return;


    badge.innerText = [...messages].length;
    if (badge.style.display == "none")
        badge.style.display = "inline-block";

    fillDropDown(messages);


    localStorage.setItem("licMsgRsv", true);
    localStorage.setItem("licMsg", JSON.stringify(messages));


});



