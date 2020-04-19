
const cardSize = {
    width: 235,
    height: 328
};

export const Config = {
    cardSize: cardSize,
    titleFont: {
        fontFamily: 'Bookman',
        fontSize: 38,
        color: '#ffffff',
        fontStyle: 'bold italic'
    },
    mainLayer: {
        verticalLayer: {
            x: 35 + cardSize.width / 2
        },
        harborLayer: {
            x: 1097,
            cardsOffset: {
                width: 30,
                height: 22
            },
            cardsInRow: 6
        },
        titleRow: {
            y: 359
        },
        deckRow: {
            y: 381 + cardSize.height / 2
        }
    }
};