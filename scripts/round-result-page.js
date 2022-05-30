class RoundResultPage {
    constructor(element) {
        this.element = element.querySelector(':scope .page-list');
        this.itemTemplate = {
            element: element.querySelector(':scope .round-result-page-item')
        };
        this.itemTemplate.element.parentNode.removeChild(this.itemTemplate.element);
        this.itemTemplate.element.classList.remove('hidden');
        const header = element.querySelectorAll(':scope header span');
        this.teamNameElement = header[0];
        this.scoreElement = header[1];
    }

    init(team) {
        this.removeAll();
        this.team = team;
        this.teamNameElement.textContent = this.team.name;
        this.scoreElement.textContent = this.team.score;
        document.getElementById('roundResultPageElement').querySelector(':scope footer button.color-scheme__secondary').onclick = () => {
            gameSession.nextRound();
        };
    }

    add(word, isGet) {
        const cloneElement = this.itemTemplate.element.cloneNode(true);
        const cloneItem = {
            element: cloneElement,
            word: cloneElement.querySelector(':scope .round-result-page-item__word'),
            buttonGet: cloneElement.querySelector(':scope button.color-scheme__secondary'),
            buttonDrop: cloneElement.querySelector(':scope button.color-scheme__primary'),
        };
        cloneItem.word.textContent = word;
        cloneItem.buttonGet.disabled = isGet;
        cloneItem.buttonDrop.disabled = !isGet;
        cloneItem.buttonGet.onclick = () => {
            cloneItem.buttonGet.disabled = true;
            cloneItem.buttonDrop.disabled = false;
            this.team.score += rulesPage.rewardPerWord + rulesPage.penaltyPerWord;
            this.scoreElement.textContent = this.team.score;
        };
        cloneItem.buttonDrop.onclick = () => {
            cloneItem.buttonGet.disabled = false;
            cloneItem.buttonDrop.disabled = true;
            this.team.score -= rulesPage.rewardPerWord + rulesPage.penaltyPerWord;
            this.scoreElement.textContent = this.team.score;
        };
        this.team.score += isGet ? rulesPage.rewardPerWord : -rulesPage.penaltyPerWord;
        this.scoreElement.textContent = this.team.score;
        this.element.appendChild(cloneItem.element);
    }

    addTeam(team) {
        const cloneElement = this.itemTemplate.element.cloneNode(true);
        const cloneItem = {
            element: cloneElement,
            word: cloneElement.querySelector(':scope .round-result-page-item__word'),
            buttonGet: cloneElement.querySelector(':scope button.color-scheme__secondary'),
        };
        cloneItem.buttonGet.parentNode.parentNode.removeChild(cloneItem.buttonGet.parentNode);
        cloneItem.word.textContent = team.score;
        cloneItem.word.after(cloneItem.word.cloneNode(true));
        cloneItem.word.textContent = team.name;
        this.element.appendChild(cloneItem.element);
    }

    removeAll() {
        let children = this.element.children;
        while (children.length > 0)
            this.element.removeChild(children[0]);
    }
}
