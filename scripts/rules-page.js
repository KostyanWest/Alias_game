let rulesPage = null;

class RulesPage {
    constructor(element) {
        this.element = element.querySelector(':scope .page-list');
        this.secondsPerRoundRangeElement = document.getElementById('secondsPerRoundRangeElement');
        this.roundsCountRangeElement = document.getElementById('roundsCountRangeElement');
        this.rewardPerWordRangeElement = document.getElementById('rewardPerWordRangeElement');
        this.penaltyPerWordRangeElement = document.getElementById('penaltyPerWordRangeElement');
        this.secondsPerRoundRangeOutput = element.querySelector(':scope output[for=secondsPerRoundRangeElement]');
        this.roundsCountRangeOutput = element.querySelector(':scope output[for=roundsCountRangeElement]');
        this.rewardPerWordRangeOutput = element.querySelector(':scope output[for=rewardPerWordRangeElement]');
        this.penaltyPerWordRangeOutput = element.querySelector(':scope output[for=penaltyPerWordRangeElement]');
    }

    init() {
        this.secondsPerRoundRangeElement.oninput = (event) => {
            this.secondsPerRound = parseInt(this.secondsPerRoundRangeElement.value);
            this.secondsPerRoundRangeOutput.textContent = this.secondsPerRoundRangeElement.value;
        }
        this.roundsCountRangeElement.oninput = (event) => {
            this.roundsCount = parseInt(this.roundsCountRangeElement.value);
            this.roundsCountRangeOutput.textContent = this.roundsCountRangeElement.value;
        }
        this.rewardPerWordRangeElement.oninput = (event) => {
            this.rewardPerWord = parseInt(this.rewardPerWordRangeElement.value);
            this.rewardPerWordRangeOutput.textContent = this.rewardPerWordRangeElement.value;
        }
        this.penaltyPerWordRangeElement.oninput = (event) => {
            this.penaltyPerWord = parseInt(this.penaltyPerWordRangeElement.value);
            this.penaltyPerWordRangeOutput.textContent = this.penaltyPerWordRangeElement.value;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    rulesPage = new RulesPage(document.getElementById('rulesPageElement'));
    rulesPage.init();
});
