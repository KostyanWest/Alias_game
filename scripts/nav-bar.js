let activeNavButtonElement = null;
const navMap = new Map();

function navButtonClick(event) {
    const currentButtonElement = event.currentTarget;
    const oldPageElement = navMap.get(activeNavButtonElement);
    oldPageElement.classList.add('page_hidden');

    activeNavButtonElement.disabled = false;
    activeNavButtonElement = currentButtonElement;
    currentButtonElement.disabled = true;

    setTimeout(() => {
        oldPageElement.classList.add('hidden');
        if (activeNavButtonElement === currentButtonElement) {
            const newPageElement = navMap.get(currentButtonElement);
            newPageElement.classList.remove('hidden');
            setTimeout(() => {
                newPageElement.classList.remove('page_hidden');
            }, 20);
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    activeNavButtonElement = document.getElementById('navPlayButtonElement');
    navMap.set(document.getElementById('navPlayButtonElement'), document.getElementById('playPageElement'));
    navMap.set(document.getElementById('navTeamsButtonElement'), document.getElementById('teamsPageElement'));
    navMap.set(document.getElementById('navRulesButtonElement'), document.getElementById('rulesPageElement'));
    navMap.set(document.getElementById('navDictsButtonElement'), document.getElementById('dictsPageElement'));
    document.getElementById('navPlayButtonElement').onclick = navButtonClick;
    document.getElementById('navTeamsButtonElement').onclick = navButtonClick;
    document.getElementById('navRulesButtonElement').onclick = navButtonClick;
    document.getElementById('navDictsButtonElement').onclick = navButtonClick;
});
