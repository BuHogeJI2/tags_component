class TagsComponent {

    crossImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1200px-Flat_cross_icon.svg.png';
    componentBlock = null;

    constructor(componentBlockId, initialTags = []) {
        this.tags = initialTags;
        this.componentBlockId = componentBlockId;
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
        !this.tags.includes(tag) && this.tags.push(tag);
    }

    deleteTag(removingTag) {
        this.tags = this.tags.filter(tag => tag !== removingTag);
    }

    renderTag(tagName) {
        return (
            `<div class="tag">${tagName} <img name="${tagName}" class="cross_img" src="${this.crossImgUrl}"></div>`
        )
    }

    renderTags() {

        const block = this.componentBlock.querySelector('.tags_block');
        block.innerHTML = '';
        this.tags.forEach(tag => block.innerHTML += this.renderTag(tag));
    }

    handleAddBtnClick() {
        const input = this.componentBlock.querySelector('.input');
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
        this.changeReadOnlyMode(!!event.target.checked);
    }

    changeReadOnlyMode(mode) {
        const btn = this.componentBlock.querySelector('.component_btn');
        const input = this.componentBlock.querySelector('.input');

        btn.disabled = !!mode;
        input.disabled = !!mode;
    }

    listener() {
        const btn = this.componentBlock.querySelector('.component_btn');
        const readOnlyCheckBox = this.componentBlock.querySelector('#read_only');
        console.log(btn, readOnlyCheckBox)

        readOnlyCheckBox.addEventListener('change', this.handleReadOnlyMode.bind(this));
        btn.addEventListener('click', this.handleAddBtnClick.bind(this));
        this.componentBlock.addEventListener('click', this.handleDeleteBtnClick.bind(this));
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
        return `<input type="checkbox" id="read_only" name="read_only"><span class="read_only_span">Read Only</span>`
    }

    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        return wrapper;
    }

    mount = (element) => {
        const wrapper = this.createWrapper();
        element.append(wrapper);
        wrapper.innerHTML += this.render();
        this.componentBlock = document.getElementById(`${this.componentBlockId}`);
        this.listener();
    }

    render() {
        return (
            `<div id="${this.componentBlockId}" class="component_block">

                ${this.renderInput()}
                ${this.renderBtn()}
                ${this.renderTagsBlock()}
                ${this.renderReadOnlyCheckBox()}
                    
             </div>`
        )
    }
}