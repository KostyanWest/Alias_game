let teamsPage = null;

class TeamsPage {
    constructor(element) {
        this.element = element.querySelector(':scope .page-list');
        this.itemTemplate = {
            element: element.querySelector(':scope .teams-page-item')
        };
        this.itemTemplate.element.parentNode.removeChild(this.itemTemplate.element);
        this.itemTemplate.element.classList.remove('hidden');
        this.index = 0;
    }

    init() {
        this.removeAll();
        this.add('Команда 1');
        this.add('Команда 2');
        this.add(null);
    }

    add(name) {
        const cloneElement = this.itemTemplate.element.cloneNode(true);
        const cloneItem = {
            element: cloneElement,
            label: cloneElement.querySelector(':scope label.teams-page-item__label'),
            text: cloneElement.querySelector(':scope input.teams-page-item__text'),
            buttonUp: cloneElement.querySelector(':scope button.color-scheme__secondary'),
            buttonDown: cloneElement.querySelector(':scope button.color-scheme__primary'),
        };
        const blurHandler = () => {
            if (cloneItem.text.value == '') {
                cloneItem.text.onblur = null;
                cloneItem.buttonUp.onclick = null;
                cloneItem.buttonDown.onclick = null;
                cloneItem.element.parentNode.removeChild(cloneItem.element);
            }
        };
        const inputHandler = () => {
            if (cloneItem.text.value != '') {
                cloneItem.text.oninput = null;
                cloneItem.text.onblur = blurHandler;
                cloneItem.element.querySelector(':scope .teams-page-item__buttons').classList.remove('hidden');
                this.add(null);
            }
        };

        cloneItem.text.id = 'teamNameTextElement' + this.index++;
        cloneItem.label.setAttribute('for', cloneItem.text.id);
        if (name !== null && name != '') {
            cloneItem.element.querySelector(':scope .teams-page-item__text').value = name;
            cloneItem.element.querySelector(':scope .teams-page-item__buttons').classList.remove('hidden');
            cloneItem.text.onblur = blurHandler;
        }
        else {
            cloneItem.text.oninput = inputHandler;
        }

        cloneItem.buttonUp.onclick = () => {
            const upElem = cloneItem.element.previousElementSibling;
            if (upElem !== null) {
                upElem.before(cloneItem.element);
            }
        };
        cloneItem.buttonDown.onclick = () => {
            const downElem = cloneItem.element.nextElementSibling;
            if (downElem !== null && downElem.nextElementSibling !== null) {
                downElem.after(cloneItem.element);
            }
        };

        this.element.appendChild(cloneItem.element);
    }

    removeAll() {
        let children = this.element.children;
        while (children.length > 0)
            this.element.removeChild(children[0]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    teamsPage = new TeamsPage(document.getElementById('teamsPageElement'));
    teamsPage.init();
});
