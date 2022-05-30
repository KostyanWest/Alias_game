function getRandomCssColor() {
    function clampAndMap(num) {
        return Math.floor(Math.max(Math.min(num, 1), 0) * 217).toString(16).padStart(2, '0');
    }
    const h = Math.random();
    const r = clampAndMap(Math.abs(h * 6 - 3) - 1);
    const g = clampAndMap(2 - Math.abs(h * 6 - 2));
    const b = clampAndMap(2 - Math.abs(h * 6 - 4));
    return '#' + r + g + b;
}

class RoundPageDeck {
    constructor(element) {
        this.element = element;
        this.cardTemplate = element.querySelector(':scope .round-page-deck__card');
        this.cardTemplate.parentNode.removeChild(this.cardTemplate);
        this.cardTemplate.classList.add('round-page-deck__card_hidden_deck');
        this.cardTemplate.classList.remove('hidden');
    }

    add() {
        let newCard = this.cardTemplate.cloneNode(true);
        newCard.style.setProperty('--local-rotate', 'rotate(' + (Math.random() * 40 - 20) + 'deg)');
        newCard.style.setProperty('--local-color', getRandomCssColor());
        this.element.insertBefore(newCard, this.element.firstElementChild);
        setTimeout(() => {
            newCard.classList.remove('round-page-deck__card_hidden_deck');
        });
    }

    top() {
        return this.element.lastElementChild;
    }

    pop() {
        let card = this.top();
        this.element.removeChild(card);
        return card;
    }

    removeAll() {
        let children = this.element.children;
        while (children.length > 0)
            this.element.removeChild(children[0]);
    }

    makeGrabbableCard(card) {
        const element = this.element;
        const rect = card.getBoundingClientRect();
        const cardBaseOffset = window.scrollY + rect.top;
        const cardHeight = rect.height;
        let grabOffset = 0;
        let isOverGetArea = false;
        let isOverDropArea = false;

        function move(event) {
            const move_offset = window.scrollY + event.clientY - cardBaseOffset - grabOffset;
            card.style.top = Math.min(Math.max(move_offset, -cardHeight), cardHeight) + 'px';
            const isOverGetAreaNow = (move_offset <= -cardHeight / 2);
            if (isOverGetAreaNow !== isOverGetArea) {
                isOverGetArea = isOverGetAreaNow;
                element.dispatchEvent(new CustomEvent('cardArea', {
                    detail: {
                        card: card,
                        area: 'get',
                        action: isOverGetAreaNow ? 'enter' : 'leave'
                    }
                }));
            }
            const isOverDropAreaNow = (move_offset >= cardHeight / 2);
            if (isOverDropAreaNow !== isOverDropArea) {
                isOverDropArea = isOverDropAreaNow;
                element.dispatchEvent(new CustomEvent('cardArea', {
                    detail: {
                        card: card,
                        area: 'drop',
                        action: isOverDropAreaNow ? 'enter' : 'leave'
                    }
                }));
            }
        }

        function drop(event) {
            card.classList.remove('round-page-deck__card_grabbing');
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', drop);
            card.style.top = '';
            if (isOverGetArea)
                card.classList.add('round-page-deck__card_hidden_get');
            if (isOverDropArea)
                card.classList.add('round-page-deck__card_hidden_drop');
            if (isOverGetArea || isOverDropArea) {
                card.onmousedown = null;
                setTimeout(() => {
                    card.parentNode.removeChild(card);
                    element.dispatchEvent(new CustomEvent('cardRemove', {
                        detail: {
                            card: card
                        }
                    }));
                }, 200);
                element.dispatchEvent(new CustomEvent('cardArea', {
                    detail: {
                        card: card,
                        area: isOverGetArea ? 'get' : isOverDropArea ? 'drop' : 'none',
                        action: 'leave'
                    }
                }));
            }
            element.dispatchEvent(new CustomEvent('cardDrop', {
                detail: {
                    card: card,
                    area: isOverGetArea ? 'get' : isOverDropArea ? 'drop' : 'none'
                }
            }));
            isOverGetArea = false;
            isOverDropArea = false;
        }

        function grab(event) {
            grabOffset = window.scrollY + event.clientY - cardBaseOffset;
            card.classList.add('round-page-deck__card_grabbing');
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', drop);
            element.dispatchEvent(new CustomEvent('cardGrab', {
                detail: {
                    card: card
                }
            }));
        }

        card.classList.add('round-page-deck__card_grabbable');
        card.onmousedown = grab;
    }
}
