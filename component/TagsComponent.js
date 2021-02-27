class TagsComponent {

    constructor(initialTags = []) {
        this.tags = initialTags;
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

    mount = (element) => element.innerHTML = this.render();

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
