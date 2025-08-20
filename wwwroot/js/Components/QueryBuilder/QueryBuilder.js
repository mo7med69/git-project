

class QueryBuilder extends HTMLElement {
    isIntialzed = false;
    constructor() {
        super();





        


    }

    filtersInit(filters) {
        $(this).queryBuilder({
            filters: filters,
            lang: {
                add_rule: 'Add filter'
            },
            conditions: ["AND"],
            allow_groups: false,
            //operators: ['equal', 'in']
        });
        this.isIntialzed = true;
        $(this).queryBuilder('refresh');
    }

    updateFilters(newFilters) {
        $(this).queryBuilder("reset");
        $(this).queryBuilder('setFilters', newFilters);
        $(this).queryBuilder('refresh');
    }

    getRules() {
        return this.isIntialzed ? $(this).queryBuilder('getRules').rules : [];
    }

    getSql() {
        return this.isIntialzed ? $(this).queryBuilder('getSQL') : "";
    }


    reset() {
        $(this).queryBuilder("reset");
    }
}

customElements.define("art-qbuilder", QueryBuilder);