class Card extends HTMLElement {
    cardTitle = document.createElement("h4");
    cardContent = document.createElement("p");
    img = document.createElement("img");
    constructor() {
        super();
        this.classList.add("card", "bg-success", "bg-opacity-10","m-2");

        var imageSrc = this.dataset.imgsrc;
   
           
            this.img.src = imageSrc;
            this.img.classList.add("card-img-top");
            this.img.alt = "Card image";
            this.img.width = "70";
            this.img.height = "100";
            this.appendChild(this.img);
        
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

         
        this.cardTitle.classList.add("card-title");
        this.cardTitle.innerText = this.dataset.title;


        this.cardContent.classList.add("card-text");
        this.cardContent.innerText = this.dataset.content;


        cardBody.appendChild(this.cardTitle)
        cardBody.appendChild(this.cardContent)


        var cardFooter = document.createElement("div");
        cardFooter.classList.add("d-flex", "justify-content-between", "align-items-center", "flex-wrap","p-2");

        this.appendChild(cardBody);
        this.appendChild(cardFooter);
    }

    set title(val) {
        this.cardTitle.innerText = val;
    }
    set content(val) {
        this.cardContent.innerText = val;
    }
    set imgsrc(val) {
        this.img.src = val;
    }
}


customElements.define("m-card", Card);