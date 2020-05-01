
const cardSize = {
    width: 235,
    height: 328
};

const view = {
    width: 1920,
    height: 1080
};

const stateFont = {
    fontFamily: 'Bookman',
    fontSize: 26,
    color: '#ffffff',
    fontStyle: 'bold italic'
};

const shipNameFont = {
    fontFamily: 'Bookman',
    fontSize: 23,
    color: '#ffffff',
    fontStyle: 'bold italic'
};

export const Config = {
    view: view,
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
        color: '#00000{}',
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
                        color: '#00000{}',
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
        },
        team: {
            y: 278,
            borderOffset: {
                x: 50
            },
            numbersFont: stateFont, 
            pirates: {
                image: {
                    texture: 'strength',
                    position: {
                        x: 0,
                        y: 0
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5
                    }
                },
                state: {
                    template: '{}',
                    font: {
                        fontFamily: 'Bookman',
                        fontSize: 33,
                        color: '#ffffff',
                        fontStyle: 'bold italic'
                    },
                    position: {
                        x: 2,
                        y: 2
                    },
                    origin: {
                        x: 0.5,
                        y: 1
                    }
                }
            },
            sailor: {
                image: {
                    texture: 'sailor',
                    position: {
                        x: 0,
                        y: 0
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                state: {
                    template: 'x{}',
                    font: stateFont,
                    position: {
                        x: -2,
                        y: 32
                    },
                    origin: {
                        x: 0,
                        y: 1
                    }
                }
            },
            carpenter: {
                image: {
                    texture: 'carpenter',
                    position: {
                        x: 0,
                        y: 0
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                state: {
                    template: 'x{}',
                    font: stateFont,
                    position: {
                        x: -1,
                        y: 32
                    },
                    origin: {
                        x: 0,
                        y: 1
                    }
                }
            },
            chaplain: {
                image: {
                    texture: 'chaplain',
                    position: {
                        x: 0,
                        y: 0
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                state: {
                    template: 'x{}',
                    font: stateFont,
                    position: {
                        x: -6,
                        y: 32
                    },
                    origin: {
                        x: 0,
                        y: 1
                    }
                }
            },
            mercenary: {
                image: {
                    texture: 'mercenary',
                    position: {
                        x: 0,
                        y: 0
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                state: {
                    template: 'x{}',
                    font: stateFont,
                    position: {
                        x: -6,
                        y: 32
                    },
                    origin: {
                        x: 0,
                        y: 1
                    }
                }
            },
            governor: {
                image: {
                    texture: 'governor',
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -8,
                        y: 32
                    },
                    origin: {
                        x: 1,
                        y: 1
                    }
                }
            },
            captain: {
                image: {
                    texture: 'captain',
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -10,
                        y: 32
                    },
                    origin: {
                        x: 1,
                        y: 1
                    }
                }
            },
            rogue: {
                image: {
                    texture: 'rogue',
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -10,
                        y: 32
                    },
                    origin: {
                        x: 1,
                        y: 1
                    }
                }
            },
            courtesan: {
                image: {
                    texture: 'courtesan',
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 1,
                        y: 0
                    }
                },
                state: {
                    template: 'xN-{}',
                    font: stateFont,
                    position: {
                        x: 0,
                        y: 32
                    },
                    origin: {
                        x: 0,
                        y: 1
                    }
                }
            },
            brig: {
                image: {
                    texture: 'coin_small',
                    position: {
                        x: 2,
                        y: 14
                    },
                    origin: {
                        x: 0,
                        y: 0.5
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -2,
                        y: 14
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                text: {
                    value: 'Brig',
                    font: shipNameFont,
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                }
            },
            galleon: {
                image: {
                    texture: 'coin_small',
                    position: {
                        x: 2,
                        y: 14
                    },
                    origin: {
                        x: 0,
                        y: 0.5
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -2,
                        y: 14
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                text: {
                    value: 'Galleon',
                    font: shipNameFont,
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                }
            },
            frigate: {
                image: {
                    texture: 'coin_small',
                    position: {
                        x: 2,
                        y: 14
                    },
                    origin: {
                        x: 0,
                        y: 0.5
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -2,
                        y: 14
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                text: {
                    value: 'Frigate',
                    font: shipNameFont,
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                }
            },
            pinnace: {
                image: {
                    texture: 'coin_small',
                    position: {
                        x: 2,
                        y: 14
                    },
                    origin: {
                        x: 0,
                        y: 0.5
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -2,
                        y: 14
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                text: {
                    value: 'Pinnace',
                    font: shipNameFont,
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                }
            },
            flute: {
                image: {
                    texture: 'coin_small',
                    position: {
                        x: 2,
                        y: 14
                    },
                    origin: {
                        x: 0,
                        y: 0.5
                    }
                },
                state: {
                    template: '+{}',
                    font: stateFont,
                    position: {
                        x: -2,
                        y: 14
                    },
                    origin: {
                        x: 1,
                        y: 0.5
                    }
                },
                text: {
                    value: 'Flute',
                    font: shipNameFont,
                    position: {
                        x: 0,
                        y: -30
                    },
                    origin: {
                        x: 0.5,
                        y: 0
                    }
                }
            }
        }
    }
};