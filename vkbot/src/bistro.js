const express = require('express')
const app = express();
const PORT = 3000;
const API = require('node-vk-bot-api')
const bodyParser = require('body-parser')
const {Botact} = require('botact')
const request = require('request');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const viber = new ViberBot({
    authToken: "487c0dc835e7d5f7-c6daf6f3f0cc3587-b324851a1ac63ca",
    name: "Бистро Сезам Миасс",
    avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});
const botact = new Botact({
    token: '75e1b9fbf4202bffaa69b23bb1e03ad24d203ae01d7118d24211b3068074b4ff0128c665b053c16121fe8',
    confirmation: 'b6383b11'
})
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "vh72.timeweb.ru",
    user: "cb58093_new",
    password: "123123",
    database: "cb58093_new"
});
var products=[];
let array=[]
let post_title = "";
let buttons = []
let type = 0
let stage = []
let cart = [];
let string_cart = ''
let userinfo = [];
let last = [];
let offer_stage = [];
let phone = []
let address = []
let kvar = []
let last_name = []
let first_name = []
let billing_address_1 = [];
let change_count = [];
let billing_dom = [];
let billing_kvart = [];
let cash = []
var hour = new Date().getHours();
var day = new Date().getDay();

console.log(day)
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM wp_posts WHERE post_type = 'product'", function (err, result, fields) {
        if (err) throw err;
        for (let item of result) {
            con.query("SELECT * FROM wp_postmeta WHERE post_id = "+item.ID+" ", function (err1, result1, fields1) {
                if (err1) throw err;
                for (let item1 of result1) {
                    if (item1.meta_key === "_price") {
                        let price = item1.meta_value;
                    }
                    if (item1.meta_key === "thumb_vk")  {
                        products.push({
                            id: item.ID,
                            title: item.post_title,
                            thumb: item1.meta_value
                        })
                    }

                }
                for(let item1 of result1) {
                    for(let prod of products) {
                        if (item1.meta_key === "_price") {
                             if (prod.id === item.ID) {
                                 prod.price = item1.meta_value;
                             }
                        }
                    }
                }
            });
        }
    });
});
con.on('error', function(err) {
    console.log('error');

});


botact.command('рассылка', function (ctx) {
    ctx.sendMessage(330610209, 'Тест рассылки Ярослав')
    ctx.sendMessage(69503915, 'Тест рассылки лида')
});

setTimeout(()=> {
    if (products.length > 0) {

        for (let item of products) {
            botact.command(item.title, function (ctx) {
                last[ctx.user_id] = [];
                last[ctx.user_id]['title'] = item.title;
                last[ctx.user_id]['id'] = item.id;
                // console.log(last[ctx.user_id])
                if (cart[ctx.user_id] == undefined) {
                    cart[ctx.user_id]=[]
                    cart[ctx.user_id][0] = {
                        title: item.title,
                        count: 1,
                        id: item.id,
                        price: item.price
                    }
                } else {
                    cart[ctx.user_id].push({
                        title: item.title,
                        count: 1,
                        id: item.id,
                        price: item.price
                    });
                }
                console.log(cart[ctx.user_id])
                for (let itemcart of cart[ctx.user_id]) {
                    if (string_cart == "") {
                        string_cart = itemcart.title;
                    } else {
                        string_cart = string_cart+ ", "+itemcart.title;

                    }
                }
                ctx.reply(
                    "Добавлен 1 " + item.title+"\n В корзине:\n"
                    +cart[ctx.user_id].map(
                    (string_cart => (string_cart.title+" в количестве "+ string_cart.count+"\n"+ ", стоимостью "+ string_cart.count*string_cart.price+ " рублей")))
                    , null, {
                        one_time: true,
                        buttons: [
                            [
                                {
                                    action: {
                                        type: 'text',
                                        payload: {
                                            button: '1'
                                        },
                                        label: 'Изменить количество'
                                    },
                                    color: 'primary'
                                },
                                {
                                    action: {
                                        type: 'text',
                                        payload: {
                                            button: '2'
                                        },
                                        label: 'Выбрать еще товар'
                                    },
                                    color: 'primary'
                                }
                            ],
                            [
                                {
                                    action: {
                                        type: 'text',
                                        payload: {
                                            button: '3'
                                        },
                                        label: 'Посмотреть корзину'
                                    },
                                    color: 'positive'
                                },
                                {
                                    action: {
                                        type: 'text',
                                        payload: {
                                            button: '4'
                                        },
                                        label: 'Оформить заказ'
                                    },
                                    color: 'positive'
                                }
                            ]


                        ]

                    })

            })
        }

        botact.hears(/.*/, function (ctx) {
            console.log(ctx.body);
            console.log('улица');

            if (offer_stage[ctx.user_id] === 2) {


                billing_address_1[ctx.user_id] = ctx.body
                offer_stage[ctx.user_id] = 3
                ctx.reply("Введите номер дома", null, {
                    one_time: true,
                    buttons: []

                });
                console.log(offer_stage[ctx.user_id]);
            }

        });
    }
}, 6000)
setTimeout(()=>{
    console.log(products);

    botact.hears(/^.*?ачат\*?/, function (ctx) {
        console.log(ctx.body);
        if ((hour >= 9 && hour < 17) && (day !== 7)) {
            // stage[ctx.user_id] = 0
                stage[ctx.user_id] = 0
            if (stage[ctx.user_id] === 0) {
                buttons = []
                let first = []
                let sec = []
                let third = []
                let fourth = []
                // botact.reply(ctx.user_id, null, 'doc330610209_466284799')
                for (let item of products) {
                    console.log(item.title);
                    if (first.length < 3) {
                        first.push(
                            {
                                action: {
                                    type: 'text',
                                    label: item.title
                                },
                                color: 'primary'
                            }
                        );
                    } else {
                        if (sec.length < 3) {
                            sec.push(
                                {
                                    action: {
                                        type: 'text',
                                        label: item.title
                                    },
                                    color: 'primary'
                                }
                            );
                        } else {
                            if (third.length < 2) {
                                third.push(
                                    {
                                        action: {
                                            type: 'text',
                                            label: item.title
                                        },
                                        color: 'primary'
                                    }
                                );
                            } else {
                                if (fourth.length < 2) {
                                    fourth.push(
                                        {
                                            action: {
                                                type: 'text',
                                                payload: {
                                                    button: type
                                                },
                                                label: item.title
                                            },
                                            color: 'primary'
                                        }
                                    );
                                }
                            }

                        }
                    }

                }
                ctx.reply(
                    products.map(title => (title.title+ ", стоимостью "+ title.price+ " рублей"+"\n")), products.map(thumb => (thumb.thumb)), {
                        one_time: false,
                        buttons: [

                            first,
                            sec,
                            third,
                            fourth


                        ]

                    })
            }
            stage[ctx.user_id] = 1

        } else {
            ctx.reply('Извините, доставка работает с понедельника по субботу с 10 утра до 7 вечера');
            stage[ctx.user_id] = 0;
        }
    });

}, 5000)
botact.command('Выбрать еще товар', function (ctx) {
    buttons = []
    let first = []
    let sec = []
    let third = []
    let fourth = []
    // botact.reply(ctx.user_id, null, 'doc330610209_466284799')
    for (let item of products) {
        if (first.length < 4) {
            first.push(
                {
                    action: {
                        type: 'text',
                        label: item.title
                    },
                    color: 'primary'
                }
            );
        } else {
            if (sec.length < 3) {
                sec.push(
                    {
                        action: {
                            type: 'text',
                            label: item.title
                        },
                        color: 'primary'
                    }
                );
            } else {
                if (third.length < 3) {
                    third.push(
                        {
                            action: {
                                type: 'text',
                                label: item.title
                            },
                            color: 'primary'
                        }
                    );
                }

            }
        }
    }

        ctx.reply(
            products.map(title => (title.title+"\n")), products.map(thumb => (thumb.thumb)), {
                one_time: false,
                buttons: [

                    first,
                    sec,
                    third,
                    [
                        {
                            action: {
                                type: 'text',
                                payload: {
                                    button: '3'
                                },
                                label: 'Посмотреть корзину'
                            },
                            color: 'positive'
                        },
                        {
                            action: {
                                type: 'text',
                                payload: {
                                    button: '4'
                                },
                                label: 'Оформить заказ'
                            },
                            color: 'positive'
                        }
                    ]


                ]

            })
});
botact.command('Посмотреть корзину', function (ctx) {
    if (cart[ctx.user_id]) {


        // for (let itemcart of cart[ctx.user_id]) {
        //     if (string_cart === "") {
        //         string_cart = itemcart.title;
        //     } else {
        //         string_cart = string_cart + ", " + itemcart.title;
        //
        //     }
        // }
        console.log(cart[ctx.user_id].map(
            (string_cart => (string_cart.title+" в количестве "+ string_cart.count+ ", стоимостью "+ string_cart.count*string_cart.price+ " рублей"+"\n"))))
        string_cart = cart[ctx.user_id].map(
            ((string_cart) => (string_cart.title+" в количестве "+ string_cart.count+ ", стоимостью "+ string_cart.count*string_cart.price+ " рублей"+"\n")))
    } else {
        string_cart = "Ваша корзина пуста"
    }
    ctx.reply(
        "В корзине:\n"
        +string_cart
        , null, {
            one_time: true,
            buttons: [
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '1'
                            },
                            label: 'Очистить корзину'
                        },
                        color: 'negative'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '2'
                            },
                            label: 'Выбрать еще товар'
                        },
                        color: 'primary'
                    }
                ],
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '4'
                            },
                            label: 'Оформить заказ'
                        },
                        color: 'positive'
                    }
                ]


            ]

        })
    string_cart = ""
});

botact.command('Очистить корзину', function (ctx) {
    string_cart = "Ваша корзина пуста"
    cart[ctx.user_id] = []
    ctx.reply(
        string_cart
        , null, {
            one_time: true,
            buttons: [
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '2'
                            },
                            label: 'Выбрать еще товар'
                        },
                        color: 'primary'
                    }
                ]


            ]

        })
    string_cart = ""
});


botact.hears(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/, function (ctx) {
    console.log(ctx.body)
    console.log('цифры');
    console.log(offer_stage[ctx.user_id]);
        if(offer_stage[ctx.user_id] === 5) {
            offer_stage[ctx.user_id] = 6
        phone[ctx.user_id] = ctx.body;
        ctx.reply("В нашем магазине оплата только наличными", null, {
            one_time: true,
            buttons:  [
            [
                {
                    action: {
                        type: 'text',
                        payload: {
                            button: '3'
                        },
                        label: 'Понятно, оплачу наличными'
                    },
                    color: 'positive'
                }
            ]


        ]

    })
    }
})
botact.hears(/[1-99]/, function (ctx) {
    //номер дома
    if (offer_stage[ctx.user_id] === 3) {
        billing_dom[ctx.user_id] = ctx.body;
        ctx.reply("Доставка в квартиру или дом?", null, {
            one_time: true,
            buttons: [
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '1'
                            },
                            label: 'Частный дом (коттедж)'
                        },
                        color: 'positive'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '2'
                            },
                            label: 'Квартира'
                        },
                        color: 'positive'
                    }
                ],
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '3'
                            },
                            label: 'Завершить'
                        },
                        color: 'primary'
                    }
                ]
            ]

        });
        offer_stage[ctx.user_id] = 4
    } else if(offer_stage[ctx.user_id] === 5) {
            ctx.reply("Введите номер телефона", null, {
                one_time: true,
                buttons: []

            });
            offer_stage[ctx.user_id] = 6;
        }

    // else if(offer_stage[ctx.user_id] === 5) {
    //     billing_kvart[ctx.user_id] = ctx.body;
    //     ctx.reply("Введите номер телефона", null, {
    //         one_time: true,
    //         buttons: []
    //
    //     });
    //     offer_stage[ctx.user_id] = 6;
    // }
    else if(offer_stage[ctx.user_id] === 6) {
        address[ctx.user_id] = ctx.body;
        ctx.reply("Отправить заказ на кухню?", null, {
            one_time: true,
            buttons: [
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '2'
                            },
                            label: 'Да'
                        },
                        color: 'primary'
                    }
                ]
            ]

        });
        offer_stage[ctx.user_id] = 6;
    }
    else {
        if (last[ctx.user_id]['title'] && offer_stage[ctx.user_id] !== 3) {
            string_cart = "Ваша корзина пуста"
            for (let item of cart[ctx.user_id]) {
                if (item.title ===  last[ctx.user_id]['title']) {
                    item.count = ctx.body;
                }
            }
            if (offer_stage[ctx.user_id] !== 3) {
                ctx.reply(
                    ' Добавлено ' + ctx.body + ' единиц для ' + last[ctx.user_id]['title']
                    , null, {
                        one_time: true,
                        buttons: [
                            [
                                {
                                    action: {
                                        type: 'text',
                                        payload: {
                                            button: '2'
                                        },
                                        label: 'Выбрать еще товар'
                                    },
                                    color: 'primary'
                                }
                            ],
                            [
                                {
                                    action: {
                                        type: 'text',
                                        payload: {
                                            button: '3'
                                        },
                                        label: 'Оформить заказ'
                                    },
                                    color: 'positive'
                                }
                            ]


                        ]

                    })

            string_cart = ""
            last[ctx.user_id] = []
            }
        }
    }

});
botact.command('По карте', function (ctx) {
    cash[ctx.user_id] = 'card';
    ctx.reply("Отправить заказ на кухню?", null, {
        one_time: true,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        payload: {
                            button: '2'
                        },
                        label: 'Да'
                    },
                    color: 'primary'
                }
            ]
        ]

    });
    offer_stage[ctx.user_id] = 6;
});

botact.command('Понятно, оплачу наличными', function (ctx) {
    console.log(ctx.body)
    cash[ctx.user_id] = 'cash';
    ctx.reply("Отправить заказ на кухню?", null, {
        one_time: true,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        payload: {
                            button: '2'
                        },
                        label: 'Да'
                    },
                    color: 'primary'
                }
            ],
            [
                {
                    action: {
                        type: 'text',
                        payload: {
                            button: '2'
                        },
                        label: 'Завершить'
                    },
                    color: 'primary'
                }
            ]
        ]

    });
    offer_stage[ctx.user_id] = 6;
});
botact.command('Изменить количество', function (ctx) {
    ctx.reply(
        "Выберите количество товара " +last[ctx.user_id]['title']+", которое хотели бы заказать, либо введите свою цифру"
        , null, {
            one_time: true,
            buttons: [
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '1'
                            },
                            label: '1'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '2'
                            },
                            label: '2'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '3'
                            },
                            label: '3'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '4'
                            },
                            label: '4'
                        },
                        color: 'primary'
                    }
                ],
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '5'
                            },
                            label: '5'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '6'
                            },
                            label: '6'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '7'
                            },
                            label: '7'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '8'
                            },
                            label: '8'
                        },
                        color: 'primary'
                    }
                ],
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '9'
                            },
                            label: '9'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '10'
                            },
                            label: '10'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '11'
                            },
                            label: '11'
                        },
                        color: 'primary'
                    },
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '12'
                            },
                            label: '12'
                        },
                        color: 'primary'
                    }
                ],
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '13'
                            },
                            label: 'Удалить товар из корзины'
                        },
                        color: 'negative'
                    }
                ]


            ]

        })
    string_cart = "";
});

botact.command('Оформить заказ', function (ctx) {
    let itog = 0
    for (let item of cart[ctx.user_id]) {
        itog = itog + (item.count*item.price);
    }
    if (itog > 330) {
        offer_stage[ctx.user_id] = 1;
        botact.execute('users.get', {
            user_ids: ctx.user_id

        }, (body) => {
            ctx.reply("Оформить заказ на имя " + body['response'][0].first_name + " " + body['response'][0].last_name + "?", null, {
                one_time: true,
                buttons: [
                    [
                        {
                            action: {
                                type: 'text',
                                payload: {
                                    button: '1'
                                },
                                label: 'Да'
                            },
                            color: 'positive'
                        },
                        {
                            action: {
                                type: 'text',
                                payload: {
                                    button: '2'
                                },
                                label: 'Изменить'
                            },
                            color: 'negative'
                        }
                    ],
                    [
                        {
                            action: {
                                type: 'text',
                                payload: {
                                    button: '2'
                                },
                                label: 'Завершить'
                            },
                            color: 'primary'
                        }
                    ]


                ]

            })
        });
    } else {
        ctx.reply("Минимальная сумма заказа 330 рублей, пожалуйста, выберите еще товар", null, {
            one_time: true,
            buttons: [
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '1'
                            },
                            label: 'Выбрать еще товар'
                        },
                        color: 'positive'
                    }
                    ],
                [
                    {
                        action: {
                            type: 'text',
                            payload: {
                                button: '2'
                            },
                            label: 'Завершить'
                        },
                        color: 'primary'
                    }
                ]


            ]

        })

        string_cart = ""
    }
});
botact.command('Завершить', function (ctx) {
     last[ctx.user_id] = null;
     offer_stage[ctx.user_id] = null;
     phone[ctx.user_id] = null
     // address[ctx.user_id] = null
     // kvar[ctx.user_id] = []
    stage[ctx.user_id] = 0
     // last_name = []
     // first_name = []
     // billing_address_1 = [];
     // change_count = [];
     // billing_dom = [];
     // billing_kvart = [];
     // cash = []
    ctx.reply("Все данные обнулены. Можете оформить новый заказ", null, {
        one_time: true,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        payload: {
                            button: '1'
                        },
                        label: 'Начать'
                    },
                    color: 'primary'
                }
            ]
        ]

    });
})
botact.command('Да', function (ctx) {
    if (offer_stage[ctx.user_id] === 1) {
        botact.execute('users.get', {
            user_ids: ctx.user_id
        }, (body) => {
            first_name[ctx.user_id] = body['response'][0].first_name
            last_name[ctx.user_id] = body['response'][0].last_name
        });
        ctx.reply("Введите улицу", null, {
            one_time: true,
            buttons: [
            ]

        });
        offer_stage[ctx.user_id] = 2;
    } else if (offer_stage[ctx.user_id] === 6) {
        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'http://bistrosezam.ru/new-product',
                form:    {
                first_name: first_name[ctx.user_id],
                    last_name: last_name[ctx.user_id],
                    billing_address_1: billing_address_1[ctx.user_id],
                    billing_phone: phone[ctx.user_id],
                    billing_kvart: billing_kvart[ctx.user_id],
                    billing_cash: cash[ctx.user_id],
                    billing_dom: billing_dom[ctx.user_id],
                    cottage: kvar[ctx.user_id],
                    cart: cart[ctx.user_id]
                }
            },

            function (error, response, body) {
                console.log(error)
                console.log('___________________________________________')
                console.log(response)
                console.log('___________________________________________')

                console.log(body)
                if (!error && response.statusCode == 200) {
                    console.log(body)
                    ctx.reply("Заказ отправлен на кухню. Наш менеджер может позвонить Вам для уточнения деталей, спасибо за Ваш заказ!", null, {
                        one_time: true,
                        buttons: [
                            [
                                {
                                    action: {
                                        type: 'text',
                                        payload: {
                                            button: '1'
                                        },
                                        label: 'Начать'
                                    },
                                    color: 'primary'
                                }
                            ]
                        ]

                    });
                }
                else {
                    console.log(error)

            }
        }
        );
    }
});

botact.command('Квартира', function (ctx) {
    kvar[ctx.user_id] = 1;
    offer_stage[ctx.user_id] = 5
    ctx.reply("Введите номер квартиры", null, {
        one_time: true,
        buttons: [ [
            {
            action: {
                type: 'text',
                payload: {
                    button: '2'
                },
                label: 'Завершить'
            },
            color: 'primary'
        } ]
        ]

    });
});

botact.command('Частный дом (коттедж)', function (ctx) {
    kvar[ctx.user_id] = 0;
    offer_stage[ctx.user_id] = 5
    ctx.reply("Введите номер телефона", null, {
        one_time: true,
        buttons: [
            [
            {
            action: {
                type: 'text',
                payload: {
                    button: '2'
                },
                label: 'Завершить'
            },
            color: 'primary'
        }
        ]
        ]

    });
});



botact.event('group_join', ({ reply }) => reply('Спасибо за подписку! Нажмите на кнопку "Начать", чтобы оформить заказ'));
botact.event('group_leave', ({ reply }) => reply('Очень жаль, что отписались, ждем вас снова'));


app.use(bodyParser.json());


app.post('/', botact.listen);
app.get('/test', function () {
    return "asas";
});

app.listen(3000);