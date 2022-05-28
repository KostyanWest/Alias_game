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
        if (dictsPage === null || dictsPage.selectedDictName == '') {
            alert('Ошибка: Выберите словарь для игры');
            return;
        }
        // TODO
    }
});
