
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
    },
    topPanel: {
        titleRow: {
            y: 29
        },
        players: {
            first: {
                x: 35 + cardSize.width / 2,
                y: 134
            },
            offset: 216,
            elements: {
                tape: {
                    y: 67,
                },
                name: {
                    y: 71,
                    font: {
                        fontFamily: 'Bookman',
                        fontSize: 28,
                        color: '#000000',
                        fontStyle: 'bold italic'
                    }
                },
                stats: {
                    icons: {
                        x: -69 
                    },
                    text: {
                        x: -58,
                        font: {
                            fontFamily: 'Bookman',
                            fontSize: 33,
                            color: '#ffffff',
                            fontStyle: 'bold italic'
                        }
                    },
                    points: {
                        y: -47,
                        text: {
                            y: -17
                        }
                    },
                    coins: {
                        y: 20,
                        text: {
                            y: 53
                        }
                    }
                },
                avatars: [
                    {
                        image: 'captain_avatar',
                        x: 32,
                        y: -21
                    },
                    {
                        image: 'courtesan_avatar',
                        x: 34,
                        y: -11
                    },
                    {
                        image: 'oldman_avatar',
                        x: 31,
                        y: -13
                    },
                    {
                        image: 'gunsmith_avatar',
                        x: 20,
                        y: -19
                    },
                    {
                        image: 'pirate_avatar',
                        x: 31,
                        y: -13
                    }
                ]
            }
        }
    }
};