let gameSession = null;

class GameSession {
    constructor() {
        this.teams = [];
        teamsPage.getTeamNames().forEach(teamName => {
            const team = {
                name: teamName,
                score: 0,
            };
            this.teams.push(team);
        });
    }

    start() {
        document.getElementById('navBarElement').classList.add('hidden');
        this.teamNumber = this.teams.length;
        this.roundNumber = -1;
        this.nextRound();
    }

    end() {
        this.switchPage(document.getElementById('roundResultPageElement'), document.getElementById('roundResultPageElement'));
        setTimeout(() => {
            roundPage.resultPage.init({ name: 'Результаты', score: '' });
            gameSession.teams.sort(team => -(team.score)).forEach(team => {
                roundPage.resultPage.addTeam(team);
            });
            document.getElementById('roundResultPageElement').querySelector(':scope footer button.color-scheme__secondary').onclick = () => {
                this.switchPage(document.getElementById('roundResultPageElement'), document.getElementById('playPageElement'));
                document.getElementById('navBarElement').classList.remove('hidden');
            };
        }, 100);
    }

    nextRound() {
        if (++this.teamNumber >= this.teams.length) {
            this.teamNumber = 0;
            this.roundNumber++;
        }
        if (this.roundNumber < rulesPage.roundsCount) {
            this.switchPage(document.getElementById('roundResultPageElement'), document.getElementById('roundPageElement'));
            setTimeout(() => {
                roundPage.init(this.teams[this.teamNumber], this.roundNumber + 1, dictsPage.selectedWordSet);
            }, 100);
        }
        else {
            this.end();
        }
    }

    switchPage(from, to) {
        from.classList.add('page_hidden');
        setTimeout(() => {
            from.classList.add('hidden');
            to.classList.remove('hidden');
            setTimeout(() => {
                to.classList.remove('page_hidden');
            }, 20);
        }, 100);
    }
}
