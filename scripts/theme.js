document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lightThemeButtonElement').onclick = () => {
        document.querySelector('.body_viewport').classList.remove('color-scheme_dark');
        document.getElementById('lightThemeButtonElement').classList.add('hidden');
        document.getElementById('darkThemeButtonElement').classList.remove('hidden');
        document.getElementById('lightGithubLogoElement').classList.add('hidden');
        document.getElementById('darkGithubLogoElement').classList.remove('hidden');
    };
    document.getElementById('darkThemeButtonElement').onclick = () => {
        document.querySelector('.body_viewport').classList.add('color-scheme_dark');
        document.getElementById('darkThemeButtonElement').classList.add('hidden');
        document.getElementById('lightThemeButtonElement').classList.remove('hidden');
        document.getElementById('darkGithubLogoElement').classList.add('hidden');
        document.getElementById('lightGithubLogoElement').classList.remove('hidden');
    };
});
