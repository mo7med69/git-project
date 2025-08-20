class Select extends HTMLElement {
    select = document.createElement("select");
    label = document.createElement("label");
    isMulti;
    constructor() {
        super();
    }

    connectedCallback() {
        var id = this.id;
        this.classList.add("form-floating", "form-floating-outline");

        var attrs = Object.keys(this.dataset);

        var isSearchable = attrs.includes("searchable");

        if (isSearchable)
            this.classList.add("searchable");

        var isMulti = attrs.includes("multiple");

        if (isMulti) {
            this.isMulti = isMulti;
            this.classList.add("multi-select");
            this.select.multiple = true;
        } else {
            this.select.appendChild(document.createElement("option"))
        }


        this.select.id = id + "-Select";
        this.select.classList.add("form-select");

        if (attrs.includes("disabled"))
            this.select.disabled = true;

        this.label.innerText = this.dataset.title;

        
        this.appendChild(this.select);
        this.appendChild(this.label);
        let children = this.querySelectorAll("option");
        console.log(children);
        if(children && children.length > 0){
            this.intialize(children);
        }
        else 
            this.intialize([]);
    }

    intialize(options) {
        // Initialize

        options.forEach(x => {
            
            this.select.appendChild(x);
        })
        var selectnodelist = this.querySelectorAll(`#${this.id}-Select`);

        var selectList = [].slice.call(selectnodelist);

        var selectFields = selectList.map(function (s) {
            return new materialstyle.SelectField(s)
        })
    }


    reset() {
        this.select.innerHTML = '';
    }

    update(options) {
        this.reset();
        options.forEach(x => {
            this.select.appendChild(x);
        })
        var selectnodelist = this.querySelectorAll(`#${this.id}-Select`);
        for (const [, value] of Object.entries(selectnodelist)) {
            var selectFieldInstance = materialstyle.SelectField.getOrCreateInstance(value)
            selectFieldInstance.rebuild()
        }
    }

    set onSelectChange(callBack) {
        this.select.onchange = (e) => callBack(e);
    }


    get value() {
        if (!this.isMulti)
            return this.select.options[this.select.selectedIndex];

        return [...this.select.options].filter(x => x.selected && x.value != "");
    }

    enable() {
        this.select.disabled = false;
        this.querySelector('button[role=combobox]').disabled = false;
        this.refresh()
    }

    disable() {
        this.select.disabled = true;
        this.querySelector('button[role=combobox]').disabled = true;
        this.refresh()
    }

    refresh() {

        var selectnodelist = this.querySelectorAll(`#${this.id}-Select`);
        for (const [, value] of Object.entries(selectnodelist)) {
            var selectFieldInstance = materialstyle.SelectField.getOrCreateInstance(value)
            selectFieldInstance.redraw()
        }
    }

    toggleDisable() {
        if (this.select.disabled)
            this.enable()
        else
            this.disable()

        this.refresh()
    }

    deSelect() {
        [...this.select.options].forEach(x => x.selected = false);
        this.querySelector('button[role=combobox]').innerText = "";
        this.refresh();
    }
}

customElements.define("m-select", Select);