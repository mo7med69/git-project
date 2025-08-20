class TextInput extends HTMLElement {
    input = document.createElement("input");
    label = document.createElement("label");
    constructor() {
        super();
        //var attrs = Object.keys(this.dataset);
        //this.classList.add("form-floating", "form-floating-outlined");
        //this.input.classList.add("form-control");
        //this.input.id = this.id + "-input";
        //this.input.autocomplete = "off";
        //if (this.dataset.value)
        //    this.input.value = this.dataset.value;
        //this.input.placeholder = this.dataset.palceholder;

        //this.label.innerText = this.dataset.title;
        //this.label.for = this.id + "-input";

        //if (attrs.includes("disabled"))
        //    this.input.disabled = true;

       
        //this.intialize();
    }

    
    connectedCallback() {
        var attrs = Object.keys(this.dataset);
        this.classList.add("form-floating", "form-floating-outlined");
        this.input.classList.add("form-control");
        this.input.id = this.id + "-input";
        this.input.autocomplete = "off";
        if (this.dataset.value)
            this.input.value = this.dataset.value;
        this.input.placeholder = this.dataset.palceholder;

        this.label.innerText = this.dataset.title;
        this.label.for = this.id + "-input";

        if (attrs.includes("disabled"))
            this.input.disabled = true;

        this.appendChild(this.input);
        this.appendChild(this.label);
        console.log(this.dataset.value);
        if (this.input.value)
            this.intialize(this.input.value);
        else
            this.intialize("");
    }


    intialize(value) {
        var inputs = this.querySelectorAll(`#${this.id}-input`);
        if (value)
            inputs.forEach(x => x.value = value);
        var textFieldList = [].slice.call(inputs)
        var textFields = textFieldList.map(function (textField) {
            return new materialstyle.TextField(textField)
        })
    }


    get value() {
        return this.input.value;
    }


    enable() {
        this.input.disabled = false;
        this.refresh()
    }

    disable() {
        this.input.disabled = true;
        this.refresh()
    }

    refresh() {

        var textFields = this.querySelectorAll(`#${this.id}-input`);
        for (const [, value] of Object.entries(textFields)) {
            var textFieldInstance = materialstyle.TextField.getOrCreateInstance(value)
            textFieldInstance.redraw();
        }
    }

    


    toggleDisable() {
        if (this.input.disabled)
            this.enable()
        else
            this.disable()

        this.refresh()
    }
}


customElements.define("m-input", TextInput);
