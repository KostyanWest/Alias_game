document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('playPageElement').querySelector(':scope button.play-page__button').onclick = () => {
        if (teamsPage === null || teamsPage.getTeamNames().length <= 0) {
            alert('Ошибка: Для игры необходимо как минимум одна команда');
            return;
        }
        if (rulesPage === null) {
            alert('Ошибка: Игровые правила не настроены, это похоже на баг :D');
            return;
        }
        if (dictsPage === null || dictsPage.selectedWordSet === null) {
            alert('Ошибка: Выберите словарь для игры');
            return;
        }
        gameSession = new GameSession();
        gameSession.start();
        document.getElementById('playPageElement').classList.add('page_hidden');
        setTimeout(() => {
            document.getElementById('playPageElement').classList.add('hidden');
        }, 100);
    }
});
