var links = document.querySelectorAll(".treeview-menu > li > a");

var body = document.body;
function getAllParentElementsUpToBody(element) {
    const parents = [];
    var firsttree = document.getElementById("reportsTree");
    let currentElement = element;
    while (currentElement !=null &&currentElement !== firsttree ){
        parents.push(currentElement);
        currentElement = currentElement.parentElement;
    }



    return parents;
}
body.onload = () => {
    links.forEach(a => {
        a.parentElement.className = [...a.parentElement.classList].filter(x => x != "active").join(" ");
        var location = window.location.href;
        if (location.includes(a.href)) {
            var parents = getAllParentElementsUpToBody(a);
            parents.forEach(elment => {
                elment.className = [...elment.classList, "active"].join(" ");
            })
        }


    });
}
