class TextAreaInput extends HTMLElement {
    input = document.createElement("textarea");
    label = document.createElement("label");
    constructor() {
        super();

        this.classList.add("form-floating", "form-floating-outlined");
        this.input.classList.add("form-control");
        this.input.id = this.id + "-Areainput";
        this.input.autocomplete = "off";
        if (this.dataset.value)
            this.input.value = this.dataset.value;
        this.input.placeholder = this.dataset.palceholder;

        this.label.innerText = this.dataset.title;
        this.label.for = this.id + "-Areainput";


        this.appendChild(this.input);
        this.appendChild(this.label);
        if (this.input.value)
            this.intialize(this.input.value);
        else
            this.intialize("");
    }


    intialize(value) {
        var inputs = this.querySelectorAll(`#${this.id}-Areainput`);
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
}


customElements.define("m-areainput", TextAreaInput);
