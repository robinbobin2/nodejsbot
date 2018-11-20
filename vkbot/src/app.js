
const express = require('express')
const app = express();
const PORT = 3000;
const API = require('node-vk-bot-api')
const bodyParser = require('body-parser')
const {Botact} = require('botact')
const request = require('request');
const botact = new Botact({
    token: '1df9867e800428872f3ac5c67436e5990c29525d6beba44d0dcd6c754a3820f2088cd5344779b8f5c25ec',
    confirmation: 'fc132ca0'
})
let stage = 0
let sauna = false
let chosen = 0;
let countPeople = 0;
let hours = 0
botact.on(function (ctx) {
    botact.execute('users.get', {
        user_ids: ctx.user_id
    }, (body) => {
        ctx.reply(body['response'][0].first_name + " "+ body['response'][0].last_name)
    })
});


botact.command('привет', function (ctx) {
    botact.options = { foo: 'bar' }
    botact.options;
    if (stage == 0) {
        ctx.reply(
            'Введите цифру комнаты чтобы начать рассчет цены: \n'+
            '1 - Синяя комната\n' +
            '2 - Красная комната\n' +
            '3 - Сауна с бассейном\n' +
            '4 - ИК - Кабина\n' +
            '5 - Номер на 5 мест\n', null, {
                one_time: false,
                buttons: [
                    [
                        {
                            action: {
                                type: 'text',
                                payload: {
                                    button: '1'
                                },
                                label: 'Синяя комната'
                            },
                            color: 'primary'
                        }
                    ]
                ]
            })
        stage = 1
    } else {
        ctx.reply('9 - сбросить настройки 0 - продолжить')
    }

    botact.command('1', function (ctx) {
        if (stage == 1) {
            ctx.reply('Выбрана синяя комната');
            chosen = 1

            ctx.reply('Введите количество человек от 1 до 2');

        }
        if (stage == 2) {
            ctx.reply('Выбран 1 человек');
            countPeople = 1;
            if (chosen == 1) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 2) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 3) {
                ctx.reply('Введите количество часов: от 2 до 12');
            }
            if (chosen == 4) {
                ctx.reply('Введите количество часов: от 1 до 12');
            }
            if (chosen == 5) {
                ctx.reply('Введите количество суток: от 1 до 12');
            }
        }
        if (stage == 1 ) {
            stage = 2
        }

    });

    botact.command('2', function (ctx) {
        if (stage == 2) {
            ctx.reply('Выбрано 2 человека');
            countPeople = 2;
            if (chosen == 1) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 2) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 3) {
                ctx.reply('Введите количество часов: от 2 до 12');
            }
            if (chosen == 4) {
                ctx.reply('Введите количество часов: от 1 до 12');
            }
            if (chosen == 5) {
                ctx.reply('Введите количество суток: от 1 до 12');
            }
            stage = 3;
        }
        if (stage == 1) {
            ctx.reply('Выбрана красная комната');
            chosen = 2
            stage = 2
            ctx.reply('Введите количество человек от 1 до 2');

        }



    });
    botact.command('3', function (ctx) {
        if (stage == 2) {
            ctx.reply('Выбрано 3 человека');
            countPeople = 3;
            if (chosen == 1) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 2) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 3) {
                ctx.reply('Введите количество часов: от 2 до 12');
            }
            if (chosen == 4) {
                ctx.reply('Введите количество часов: от 1 до 12');
            }
            if (chosen == 5) {
                ctx.reply('Введите количество суток: от 1 до 12');
            }
            stage = 3;
        }
        if (stage == 1) {
            ctx.reply('Выбрана Сауна с бассейном');
            chosen = 3
            stage = 2
            ctx.reply('Введите количество человек от 1 до 6');

        }


    });

    botact.command('4', function (ctx) {
        if (stage == 2) {
            ctx.reply('Выбрано 4 человека');
            countPeople = 4;
            if (chosen == 1) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 2) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 3) {
                ctx.reply('Введите количество часов: от 2 до 12');
            }
            if (chosen == 4) {
                ctx.reply('Введите количество часов: от 1 до 12');
            }
            if (chosen == 5) {
                ctx.reply('Введите количество суток: от 1 до 12');
            }
            stage = 3;
        }
        if (stage == 1) {
            ctx.reply('Выбрана ИК-кабина');
            chosen = 4
            stage = 2
            ctx.reply('Введите количество человек (максимально - 1)');
        }


    });
    botact.command('5', function (ctx) {
        if (stage == 2) {
            ctx.reply('Выбрано 5 человек');
            countPeople = 5;
            if (chosen == 1) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 2) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 3) {
                ctx.reply('Введите количество часов: от 2 до 12');
            }
            if (chosen == 4) {
                ctx.reply('Введите количество часов: от 1 до 12');
            }
            if (chosen == 5) {
                ctx.reply('Введите количество суток: от 1 до 12');
            }
            stage = 3;
        }
        if (stage == 1) {
            ctx.reply('Выбран номер на 5 мест');
            chosen = 10
            stage = 2
            ctx.reply('Введите количество человек от 1 до 5');
        }


    });
    botact.command('6', function (ctx) {
        if (stage == 2) {
            ctx.reply('Выбрано 6 человек');
            countPeople = 6;
            if (chosen == 1) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 2) {
                ctx.reply('Введите количество часов: 6 часов, 12 часов или от 1 до 31 суток');
            }
            if (chosen == 3) {
                ctx.reply('Введите количество часов: от 2 до 12');
            }
            if (chosen == 4) {
                ctx.reply('Введите количество часов: от 1 до 12');
            }
            if (chosen == 5) {
                ctx.reply('Введите количество суток: от 1 до 12');
            }
            stage = 3;
        }


    });
    botact.command('1 час', function (ctx) {
        if (stage == 3) {
            ctx.reply('Выбран 1 час');
            hours = 1
            stage = 4
            ctx.reply('Напишите "рассчитать", чтобы узнать цену');
        }
    });
    botact.command('2 часа', function (ctx) {
        if (stage == 3) {
            ctx.reply('Выбрано 2 часа');
            hours = 2
            stage = 4
            ctx.reply('Напишите "рассчитать", чтобы узнать цену');

        }
    });
    botact.command('3 часа', function (ctx) {
        if (stage == 3) {
            ctx.reply('Выбрано 3 часа');
            hours = 3
            stage = 4
            ctx.reply('Напишите "рассчитать", чтобы узнать цену');

        }
    });
    botact.command('4 часа', function (ctx) {
        if (stage == 3) {
            ctx.reply('Выбрано 4 часа');
            hours = 4
            stage = 4
            ctx.reply('Напишите "рассчитать", чтобы узнать цену');

        }
    });
    botact.command('5 часов', function (ctx) {
        if (stage == 3) {
            ctx.reply('Выбрано 5 часов');
            hours = 5
            stage = 4
            ctx.reply('Напишите "рассчитать", чтобы узнать цену');

        }
    });
    botact.command('6 часов', function (ctx) {
        if (stage == 3) {
            ctx.reply('Выбрано 6 часов');
            hours = 6
            stage = 4
            ctx.reply('Напишите "рассчитать", чтобы узнать цену');

        }
    });

    botact.command('12 часов', function (ctx) {
        if (stage == 3) {
            ctx.reply('Выбрано 12 часов');
            hours = 12;
            stage = 4
            ctx.reply('Напишите "рассчитать", чтобы узнать цену');

        }
    });

    botact.command('заново', function (ctx) {
        stage = 0
        hours = 0
        countPeople = 0
        ctx.reply('Данные удалены. Напиши "привет", чтобы начать заново');
    });

    botact.command('рассчитать', function (ctx) {
        if (stage == 4 && countPeople != 0 && hours != 0 && chosen != 0) {
            ctx.reply('Сейчас посчитаем...');
            request.get(
                'http://sauna24ufa.ru/connect.php?hours='+hours+'&room='+chosen+'&client='+countPeople,
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                        request.get(
                            'http://sauna24ufa.ru/calc.php',
                            { hours: hours,
                                room:chosen,
                                client: countPeople
                            },
                            function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    ctx.reply(body);

                                }
                            }
                        );
                    }
                }
            );
        }
        // ctx.reply('Напиши "заново", чтобы начать заново');
    });

    // botact.command('2', function (ctx) {
    //     if (stage == 1) {
    //         ctx.reply('Введите количество человек от 1 до 10')
    //         sauna = true
    //         stage = 2
    //     } else if(stage == 2 && sauna == false) {
    //         ctx.reply('выбрана синяя комната')
    //         ctx.reply('Введите количество человек')
    //         stage = 3
    //     } else if(stage == 2 && sauna == true) {
    //         ctx.reply('Выбран 1 человек, введите желаемую дату')
    //         stage = 3
    //     }
    //
    // })
    //
    // botact.command('синяя', function (ctx) {
    //     ctx.reply('рассчитать цену')
    //
    // })

});

botact.event('group_join', ({ reply }) => reply('Спасибо за подписку! Я ЖАР БОТ, напишите мне "привет", чтобы  узнать цену на сауну или комнату'))
botact.event('group_leave', ({ reply }) => reply('Очень жаль, что отписался, напиши мне "скидка", чтобы получить индивидуальную скидку на сауну или комнату'))


app.use(bodyParser.json())




app.post('/', botact.listen)

app.listen(3000)

// const bot = new API("92611b25dec6ef708e35ad8d960bed54355aeb8733582fd2a6f36081f1621910aba1f0eb7ca0d50673397")
// bot.use(ctx => ctx.date = new Date())
//
// bot.on(({ date }) => {
//     console.log(date)
//     // Fri Nov 24 2017 16:00:21 GMT+0300 (MSK)
// })
// bot.command('привет', ({ reply }) => reply('Привет! Я бот, ты можешь спросить у меня как дела или написать слово "дата" чтобы узнать текущую дату'))
// bot.hears(/(как дела|я твою маму ебала|Я твою маму ебал)/, ({ reply }) => {
//     reply('Мать ебал и на лицо срал')


//
// })
// bot.use(ctx => ctx.date = new Date())
//
// bot.on(({ date }) => {
//     answer = date
// })
// bot.hears(/(я твою маму ебал|я твою маму ебала|Я твою маму ебал)/, ({ reply }) => reply())
// bot.hears('дата', ({ reply }) => reply(answer))
// bot.on(({ reply }) => reply(ctx.date))
//
//
// bot.command('привет', function (ctx) {
//     // with shortcut from context
//     ctx.reply('Привет, напиши "меню", чтобы посмотреть что я могу')
//     // function from context
//     // ctx.sendMessage(ctx.peer_id, 'https://pp.userapi.com/c847123/v847123137/4fec3/ET-MrIC-L-M.jpg')
//     // simple usage
//     // bot.hears(/(car|tesla)/, ({ reply }) =>
//     //     reply('I love Tesla!')),
//
//
//
//     // bot.reply(ctx.peer_id, 'Hi, this is start!')
// });
// bot.command('меню', function (ctx) {
//     ctx.sendMessage(ctx.peer_id, '1 - забронировать комнату 2 - рассчитать цену');
//     bot.command('1', function (ctx) {
//         ctx.sendMessage(ctx.peer_id, 'введите количество человек от 1 до 10');
//         bot.hears(/(1|2)/, ({ reply }) => reply(ctx))
//
//     })
// })