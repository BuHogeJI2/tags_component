class TagsComponent {

    constructor() {
        this.tags = [];
        this.crossImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1200px-Flat_cross_icon.svg.png'
    }

    get getTags() {
        return this.tags;
    }

    set setTags(value) {
        this.tags = value;
    }

    get getLocalStorage() {
        return localStorage.getItem('tags');
    }

    set setLocalStorage(value) {
        localStorage.setItem('tags', value);
    }

    addTag(tag) {
        this.tags.push(tag);
    }

    deleteTag(removingTag) {
        this.tags = this.tags.filter(tag => tag !== removingTag);
    }

    renderTags() {

        const block = document.querySelector('.tags_block');
        const tagDiv = (tag) => `<div class="tag">${tag} <img name="${tag}" class="cross_img" src="${this.crossImgUrl}"></div>`

        block.innerHTML = '';
        this.tags.forEach(tag => block.innerHTML += tagDiv(tag));
    }

    handleAddBtnClick() {
        const input = document.querySelector('.input');
        const inputTags = input.value.split(' ');

        inputTags.forEach(tag => tag && this.addTag(tag));
        this.renderTags();
        input.value = '';
    }

    handleDeleteBtnClick(event) {
        if (event.target.className === 'cross_img') {
            const tag = event.target.name;
            this.deleteTag(tag);
            this.renderTags();
        }
    }

    handleReadOnlyMode(event) {
        event.target.checked ? this.changeReadOnlyMode(true) : this.changeReadOnlyMode(false)
     }

    changeReadOnlyMode(mode) {
        const btn = document.querySelector('.component_btn');
        const input = document.querySelector('.input');

        if (mode) {
            btn.disabled = true;
            input.disabled = true;
        } else {
            btn.disabled = false;
            input.disabled = false;
        }
    }

    listener() {
        const btn = document.querySelector('.component_btn');
        const readOnlyCheckBox = document.querySelector('.read_only');

        readOnlyCheckBox.addEventListener('change', this.handleReadOnlyMode.bind(this));
        btn.addEventListener('click', this.handleAddBtnClick.bind(this));

        document.addEventListener('click', this.handleDeleteBtnClick.bind(this));
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

    renderReadOnlyCheckBox() {
        return `<input type="checkbox" name="read_only" class="read_only"><span class="read_only_span">Read Only</span>`
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
                    ${this.renderReadOnlyCheckBox()}
                    
                </div>`
    }
}

const tags = new TagsComponent();
tags.mount(document.getElementById('root'));