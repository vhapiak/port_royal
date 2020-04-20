
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
    buttonFont: {
        fontFamily: 'Bookman',
        fontSize: 27,
        color: '#000000',
        fontStyle: 'bold italic'
    },
    mainLayer: {
        verticalLayer: {
            x: 35 + cardSize.width / 2,
            deckRow: {
                y: 381 + cardSize.height / 2
            },
            firstButtonRow: {
                y: 761
            },
            secondButtonRow: {
                y: 828
            }
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
        }
    }
};