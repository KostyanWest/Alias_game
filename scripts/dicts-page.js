let dictsPage = null;

class DictsPage {
    constructor(element) {
        this.element = element.querySelector(':scope .page-list');
        this.itemTemplate = {
            element: element.querySelector(':scope .dicts-page-item'),
            name: element.querySelector(':scope .dicts-page-item__name'),
            description: element.querySelector(':scope .dicts-page-item__description'),
            tag: element.querySelector(':scope .dicts-page-item__tag'),
            tagContainer: element.querySelector(':scope .dicts-page-item__tag').parentNode,
        };
        this.itemTemplate.element.parentNode.removeChild(this.itemTemplate.element);
        this.itemTemplate.element.classList.remove('hidden');
        this.selectedWordSet = null;
        this.selectedButtonElement = null;
    }

    init(indexUrls) {
        this.removeAll();
        this.fetchDict(indexUrls).then(indexDict => indexDict.list.forEach(dictInfo => (dictInfo !== null) ? this.add(dictInfo) : null));
    }

    add(dictInfo) {
        this.itemTemplate.name.textContent = dictInfo.name;
        this.itemTemplate.description.textContent = dictInfo.description;
        this.itemTemplate.element.querySelectorAll(':scope .dicts-page-item__tag').forEach(tag => tag.parentNode.removeChild(tag));
        dictInfo.tags.forEach(tag => {
            this.itemTemplate.tag.textContent = tag;
            this.itemTemplate.tagContainer.appendChild(this.itemTemplate.tag.cloneNode(true));
        });

        const cloneElement = this.itemTemplate.element.cloneNode(true);
        cloneElement.querySelector(':scope button.dicts-page-item__button').onclick = (event) => {
            const currentButtonElement = event.currentTarget;
            currentButtonElement.disabled = true;
            currentButtonElement.textContent = 'Загрузка...';
            this.fetchDict(dictInfo.urls).then(dict => {
                this.lastFetch = dict;
                if (dict !== null) {
                    if (this.selectedButtonElement !== null) {
                        this.selectedButtonElement.textContent = 'Выбрать';
                        this.selectedButtonElement.disabled = false;
                    }
                    currentButtonElement.textContent = 'Выбрано';
                    this.selectedButtonElement = currentButtonElement;
                    this.selectedWordSet = new Set(dict.words);
                }
                else {
                    currentButtonElement.disabled = false;
                    currentButtonElement.textContent = 'Выбрать';
                    alert('Не удалось загрузить словарь "' + dictInfo.name + '"');
                }
            });
        }
        window.onerror = () => true;
        this.element.appendChild(cloneElement);
    }

    removeAll() {
        let children = this.element.children;
        while (children.length > 0)
            this.element.removeChild(children[0]);
    }

    async fetchDict(urls) {
        for (let i = 0; i < urls.length; i++) {
            try {
                const responce = await fetch(urls[i]);
                if (responce.ok) {
                    const dict = await responce.json();
                    return dict;
                }
            }
            catch (error) {
                // suppress any error
            }
        }
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    dictsPage = new DictsPage(document.getElementById('dictsPageElement'));
    dictsPage.init([
        'https://raw.githubusercontent.com/KostyanWest/Alias_game/main/dicts/index.json',
        'https://raw.githubusercontent.com/KostyanWest/Alias_game/lab4_5/dicts/index.json'
    ]);
});
