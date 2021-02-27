class TagsComponent {

    constructor() {
        this.tags = [];
        this.showingTags = [];
        this.crossImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1200px-Flat_cross_icon.svg.png'
    }

    showTags(block) {
        if (this.tags.length !== this.showingTags.length) {
            const newTags = this.tags.slice(this.showingTags.length);
            newTags.forEach(tag => {
                block.innerHTML += `<div class="tag">${tag} <img src="${this.crossImgUrl}" alt=""></div>`
                this.showingTags.push(tag);
            })
        }
    }

    handleAddClick() {
        const input = document.querySelector('.input');
        const tagsBlock = document.querySelector('.tags_block');
        const inputTags = input.value.split(' ');

        inputTags.forEach(tag => tag && this.tags.push(tag));
        this.showTags(tagsBlock);
        input.value = '';

    }

    listener() {
        const btn = document.querySelector('.component_btn');
        btn.addEventListener('click', this.handleAddClick.bind(this));
    }

    renderInput() {
        return `<input type="text" class="input">`
    }

    renderBtn() {
        return `<button class="component_btn">Add</button>`
    }

    renderTagsBlock() {
        return `<div class="tags_block"></div>`
    }

    mount = (element) => {
        element.innerHTML = this.render();
        this.listener();
    }

    render() {
        return `<div class="component_block">

                    ${this.renderInput()}
                    ${this.renderBtn()}
                    ${this.renderTagsBlock()}
                    
                </div>`
    }
}

const tags = new TagsComponent();
tags.mount(document.getElementById('root'));