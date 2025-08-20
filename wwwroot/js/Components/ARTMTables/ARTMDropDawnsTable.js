class ARTMDropDawnsTable extends HTMLElement {
    entities=[]
    constructor() {
        super();
        this.data = [];
    }

    connectedCallback() {
        this.render();
    }

    addOrRemoveItem(item) {
        const index = this.data.findIndex(row => row.name === item.name && row.type === item.type);

        if (index !== -1) {
            // Remove item
            this.data.splice(index, 1);
        } else {
            // Add item
            this.data.push(item);
        }

        this.render();
        const dropdownview = this.querySelector(`#${item.name}-dropdownview`);
        dropdownview.setOptions(item.entities);


    }
    render() {
        // Clear the content
        this.innerHTML = '';

        const div = document.createElement('div');

        // If there is data, create the table, else display a message
        if (this.data.length > 0) {
            div.appendChild(this.renderTable());
        } else {
            div.textContent = 'No data available.';
        }

        this.appendChild(div); // Append the div to the custom element
    }

    // This method renders the table dynamically
    renderTable() {
        const table = document.createElement('table');

        // Create the header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Name', 'Type', 'Display Name', 'Dropdown View', 'Dropdown Value', 'Dropdown Text'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create the table body
        const tbody = document.createElement('tbody');
        this.data.forEach(row => {
            tbody.appendChild(this.renderRow(row)); // Render each row dynamically
        });

        table.appendChild(tbody);
        return table;
    }

    renderRow(row) {
        const tr = document.createElement('tr');

        // Create Name Cell
        const nameTd = document.createElement('td');
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = row.name;
        nameInput.disabled = true;
        nameTd.appendChild(nameInput);
        tr.appendChild(nameTd);

        // Create Type Cell
        const typeTd = document.createElement('td');
        const typeInput = document.createElement('input');
        typeInput.type = 'text';
        typeInput.value = row.type;
        typeInput.disabled = true;
        typeTd.appendChild(typeInput);
        tr.appendChild(typeTd);

        // Create Display Name Cell
        const displayNameTd = document.createElement('td');
        const displayNameInput = document.createElement('input');
        displayNameInput.type = 'text';
        displayNameInput.value = row.displayName || '';
        displayNameTd.appendChild(displayNameInput);
        tr.appendChild(displayNameTd);

        // Create Dropdown View Cell
        const dropdownViewTd = document.createElement('td');
        const dropdownView = document.createElement('artm-select');
        dropdownView.id = `${row.name}-dropdownview`;
        //if (!this.entities) this.entities = row.entities
        //dropdownView.setOptions(row.entities);


        // Listen for 'changed' event
        dropdownView.addEventListener('changed', (event) => {
            const selectedValue = event.detail.value; // Assuming the event provides the selected value in `event.detail`

            // Update the related dropdowns
            const dropdownValue = this.querySelector(`#${row.name}-dropdownvalue`);
            const dropdownText = this.querySelector(`#${row.name}-dropdowntext`);

            if (dropdownValue) {
                dropdownValue.setOptions(this.getUpdatedOptionsForValue(selectedValue));
            }
            if (dropdownText) {
                dropdownText.setOptions(this.getUpdatedOptionsForText(selectedValue));
            }
        });

        dropdownViewTd.appendChild(dropdownView);
        tr.appendChild(dropdownViewTd);

        // Create Dropdown Value Cell
        const dropdownValueTd = document.createElement('td');
        const dropdownValue = document.createElement('artm-select');
        dropdownValue.id = `${row.name}-dropdownvalue`;
        dropdownValueTd.appendChild(dropdownValue);
        tr.appendChild(dropdownValueTd);

        // Create Dropdown Text Cell
        const dropdownTextTd = document.createElement('td');
        const dropdownText = document.createElement('artm-select');
        dropdownText.id = `${row.name}-dropdowntext`;
        dropdownTextTd.appendChild(dropdownText);
        tr.appendChild(dropdownTextTd);

        return tr;
    }
    getUpdatedOptionsForValue(selectedValue) {
        // Example logic to generate options for dropdownValue
        return [
            { value: `${selectedValue}-1`, text: `${selectedValue} Option 1` },
            { value: `${selectedValue}-2`, text: `${selectedValue} Option 2` },
        ];
    }

    getUpdatedOptionsForText(selectedValue) {
        // Example logic to generate options for dropdownText
        return [
            { value: `${selectedValue}-A`, text: `${selectedValue} Text A` },
            { value: `${selectedValue}-B`, text: `${selectedValue} Text B` },
        ];
    }

    applyDropdownOptions() {
        // Apply options to each dropdown after rendering
        const rows = this.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const dropdownView = row.querySelectorAll('artm-select')[0];
            const dropdownValue = row.querySelectorAll('artm-select')[1];
            const dropdownText = row.querySelectorAll('artm-select')[2];

            dropdownView.setOptions(this.data[index].dropdownViewOptions || []);
            dropdownValue.setOptions(this.data[index].dropdownValueOptions || []);
            dropdownText.setOptions(this.data[index].dropdownTextOptions || []);
        });
    }
}

customElements.define('artm-dropdown-table', ARTMDropDawnsTable);