class ARTMSelect extends HTMLElement {
    constructor() {
        super();

        // Create the select element
        this.select = document.createElement('select');
        this.select.classList.add('selectpicker');
        this.select.setAttribute('data-live-search', this.getAttribute('data-live-search') || 'true');
        this.select.setAttribute('title', this.getAttribute('title') || 'Choose options');

        // Pass along attributes
        if (this.hasAttribute('multiple')) {
            this.select.setAttribute('multiple', 'multiple');
        }
    }

    connectedCallback() {
        // Append the select to the DOM
        this.appendChild(this.select);

        // Populate options from <s-option> or URL
        if (this.hasAttribute('data-url')) {
            this.fetchOptionsFromURL(this.getAttribute('data-url'));
        } else {
            this.populateOptionsFromCustomTags();
        }

        // Initialize the select picker
        $(this.select).selectpicker();

        // Add change event listener
        $(this.select).on('changed.bs.select', () => {
            this.dispatchEvent(new CustomEvent('changed', {
                detail: { selected: this.getSelected() }
            }));
        });
    }

    // Fetch options from a URL
    async fetchOptionsFromURL(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Assume the data is an array of options
            data.forEach((item) => {
                this.addOption(item.value, item.text, item.selected, item.disabled);
            });

            // Re-initialize the select picker after adding options
            $(this.select).selectpicker('refresh');
        } catch (error) {
            console.error('Failed to fetch options:', error);
        }
    }

    // Add option to select
    addOption(value, text, selected = false, disabled = false) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;

        if (selected) {
            option.setAttribute('selected', 'selected');
        }
        if (disabled) {
            option.setAttribute('disabled', 'disabled');
        }

        this.select.appendChild(option);
    }
    // Set multiple options dynamically
    setOptions(options) {
        // Clear existing options
        this.select.innerHTML = '';

        // Add new options
        options.forEach(({ value, text, selected = false, disabled = false }) => {
            this.addOption(value, text, selected, disabled);
        });

        // Refresh the select picker to reflect the new options
        $(this.select).selectpicker('refresh');
    }
    // Populate options from <s-option>
    populateOptionsFromCustomTags() {
        const customOptions = Array.from(this.querySelectorAll('s-option'));

        customOptions.forEach((customOption) => {
            const option = document.createElement('option');
            option.value = customOption.getAttribute('value') || '';
            option.textContent = customOption.textContent || '';
            if (customOption.hasAttribute('selected')) {
                option.setAttribute('selected', 'selected');
            }
            if (customOption.hasAttribute('disabled')) {
                option.setAttribute('disabled', 'disabled');
            }

            this.select.appendChild(option);
            customOption.remove();
        });
    }

    // Get selected values
    getSelected() {
        return $(this.select).val();
    }

    // Add option dynamically after initialization
    addDynamicOption(value, text, selected = false, disabled = false) {
        this.addOption(value, text, selected, disabled);

        // Refresh the select picker after adding a new option
        $(this.select).selectpicker('refresh');
    }

    // Remove an option
    removeOption(value) {
        const options = Array.from(this.select.options);
        options.forEach((option) => {
            if (option.value === value) {
                option.remove();
            }
        });

        // Refresh the select picker after removing an option
        $(this.select).selectpicker('refresh');
    }
}

// Define the custom element
customElements.define('artm-select', ARTMSelect);
