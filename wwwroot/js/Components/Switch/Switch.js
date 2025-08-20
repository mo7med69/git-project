
class Switch extends HTMLElement {

    switchInput = document.createElement("input")
    switchLable = document.createElement("label")
    constructor() {
        super();
        this.classList.add("form-check", "form-switch");

        var isChecked = this.dataset.checked && this.dataset.checked.toLowerCase() == "true";
        console.log(isChecked);

        this.switchLable.classList.add("form-check-label");
        this.switchLable.for = this.id + "-" + "art-switch";

       
        this.switchInput.type = "checkbox";
        this.switchInput.classList.add("form-check-input");
        this.switchInput.checked = isChecked;
        this.switchInput.id = this.id + "-" + "art-switch";


  
        this.appendChild(this.switchInput);
        this.appendChild(this.switchLable);
    }

    set onswitchchanged(onchange) {
        this.switchInput.onchange = (e) => onchange(e);
    }
    
    check() {
        this.switchInput.checked = true;
        this.dataset.checked = true;
    }
    unCheck() {
        this.switchInput.checked = false;
        this.dataset.checked = false;
    }

    toggle() {
        var isChecked = this.switchInput.checked;
        if (isChecked)
            this.unCheck();
        else
            this.check();
    }

    get status() {
        return this.switchInput.checked;
    }
}


customElements.define("art-switch", Switch);
