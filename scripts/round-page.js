let roundPage = null;

class RoundPage {
    constructor(element) {
        this.element = element;
        const header = element.querySelectorAll(':scope header span');
        this.teamNameElement = header[0];
        this.roundNameElement = header[1];
        this.timer = new Timer(element.querySelector(':scope .round-page__timer'));
        this.counterGet = element.querySelector(':scope .round-page__counter_type_get');
        this.counterDrop = element.querySelector(':scope .round-page__counter_type_drop');
        this.hintGet = element.querySelector(':scope .round-page__hint_hidden_get');
        this.hintDrop = element.querySelector(':scope .round-page__hint_hidden_drop');
        this.deck = new RoundPageDeck(element.querySelector(':scope .round-page-deck'));
        this.resultPage = new RoundResultPage(document.getElementById('roundResultPageElement'));
        this.deck.element.addEventListener('cardGrab', () => {
            this.hintGet.classList.remove('round-page__hint_hidden_get');
            this.hintDrop.classList.remove('round-page__hint_hidden_drop');
        });
        this.deck.element.addEventListener('cardDrop', (event) => {
            this.hintGet.classList.add('round-page__hint_hidden_get');
            this.hintDrop.classList.add('round-page__hint_hidden_drop');
            if (!this.isPlaying) {
                if (event.detail.area != 'none')
                    this.begin();
            }
            else if (event.detail.area == 'get') {
                this.counterGet.classList.add('round-page__counter_gain');
                setTimeout(() => {
                    this.counterGet.classList.remove('round-page__counter_gain');
                    this.counterGet.textContent = '+' + (parseInt(this.counterGet.textContent) + rulesPage.rewardPerWord);
                }, 100);
                this.resultPage.add(event.detail.card.textContent, true);
            }
            else if (event.detail.area == 'drop') {
                this.counterDrop.classList.add('round-page__counter_gain');
                setTimeout(() => {
                    this.counterDrop.classList.remove('round-page__counter_gain');
                    this.counterDrop.textContent = (parseInt(this.counterDrop.textContent) - rulesPage.penaltyPerWord);
                }, 100);
                this.resultPage.add(event.detail.card.textContent, false);
            }
        });
        this.deck.element.addEventListener('cardArea', (event) => {
            if (event.detail.area == 'get') {
                if (event.detail.action == 'enter')
                    this.hintGet.classList.add('round-page__hint_excited');
                else
                    this.hintGet.classList.remove('round-page__hint_excited');
            }
            else {
                if (event.detail.action == 'enter')
                    this.hintDrop.classList.add('round-page__hint_excited');
                else
                    this.hintDrop.classList.remove('round-page__hint_excited');
            }
        });
        this.deck.element.addEventListener('cardRemove', (event) => {
            this.nextWord();
        });
        this.promiseAwait = null;
        this.promiseCurrent = null;
        this.isPlaying = false;
    }

    init(team, round, words) {
        this.team = team;
        this.teamNameElement.textContent = this.team.name;
        this.roundNameElement.textContent = 'Раунд ' + round;
        this.words = new Set(words);
        this.timer.time = rulesPage.secondsPerRound;
        this.counterGet.textContent = '+0';
        this.counterDrop.textContent = '-0';
        this.hintGet.textContent = 'Сдвинь вверх, чтобы начать';
        this.hintDrop.textContent = 'Сдвинь вниз, чтобы начать';
        this.deck.removeAll();
        for (let i = 0; i < 4; ++i) {
            this.deck.add();
        }
        this.deck.top().textContent = 'Сдвинь, чтобы начать';
        this.resultPage.init(this.team);
        this.promiseAwait = null;
        this.promiseCurrent = null;
        this.nextWord();
    }

    begin() {
        this.isPlaying = true;
        this.timer.start(() => this.end());
        setTimeout(() => {
            this.hintGet.textContent = 'Отгадали';
            this.hintDrop.textContent = 'Пропустили';
        }, 100);
    }

    end() {
        this.isPlaying = false;
        this.timer.stop();
        gameSession.switchPage(document.getElementById('roundPageElement'), document.getElementById('roundResultPageElement'));
    }

    async asyncNextWord() {
        if (this.promiseAwait !== null) {
            this.deck.top().textContent = await this.promiseAwait;
            this.deck.add();
        }
        this.deck.makeGrabbableCard(this.deck.top());
        const rand = Math.floor(Math.random() * this.words.size);
        const iter = this.words.values();
        for (let i = 0; i < rand; ++i)
            iter.next();
        const word = iter.next().value;
        this.words.delete(word)
        return word;
    }

    nextWord() {
        this.promiseAwait = this.promiseCurrent;
        this.promiseCurrent = this.asyncNextWord();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    roundPage = new RoundPage(document.getElementById('roundPageElement'));
});
