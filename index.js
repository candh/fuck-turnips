var messages = [
    'I really really hate turnips',
    'Why did God even made turnips',
    'I think they should just get banned because I really hate them',
    'This is a disgusting vegetable and it should get banned.',
    'Seriously bro? Turnips? hate them!',
    'I rather have sex with Donald Trump than eat turnips',
    'I agreee!!!!! bruhh, pakistani & indian women have fuck up the turnips',
    'Honestly bro, they taste so disgusting',
    'haha, i hate turnips',
    'really support this petition',
    'this vegetable is not acceptable',
    'no. just no. say no to turnips',
    'we dont need turnips',
    'bye bye turnips',
    'hate you! i hate you! i hate turnips',
    'FUCK turnips - Filthy Frank 2016',
    'meme power bro i really hate turnips',
    'why wont turnips just die',
    'harambe didnt die for this shit',
    'really really good petition, yeah man, fuck turnips tbh',
    'i dont like turnips',
    'i cant think of a more disgusting vegetable',
    'this is why aliens wont visit us anymore',
    'turnips? more like.. no thanks! haha amiright?',
    'i Seriously hate, just really hate them',
    'i dont even wanna say their name they honestly disturb me'
]
var cities = [
    'Lahore',
    'Multan',
    'Islamabad',
    'Murree',
    'Karachi',
    'Quetta',
    'Nawabshah',
    'DJ Khan',
    'Faisal Abad',
    'Sialkot',
    'Gilgit',
    'Skardu',
    'Ghangche',
    'Shigar',
    'Makhan pura',

    'Asqurdas',
    'Sumo',
    'Nagar',
    'Gupi',
    'Gultari',
    'Lakshmipur',
    'Coxs Bazar'
];

var casper = require('casper').create({
    viewportSize: {
        width: 800,
        height: 600
    },
    verbose: true,
    loadImages: false
});
var citi = Math.floor(Math.random() * (cities.length - 0 + 1)) + 0;
var rando = Math.floor(Math.random() * (messages.length - 0 + 1)) + 0;
var randomnumber = Math.floor(Math.random() * (9000 - 1 + 1)) + 1;
var data;
//data to fill out the form
casper.start('http://uinames.com/api/?region=united%20states', function() {
    data = JSON.parse(this.getPageContent());
    console.log(JSON.stringify(data))
    var f = data["name"] + data["surname"];
    data["email"] = f.toLowerCase() + randomnumber + "@gmail.com";
    // f = f.toLowerCase() + randomnumber + "@gmail.com";
    // data["email"] = f.replace(/[^\w\s]/gi, '');
});



casper.thenOpen('https://www.change.org/p/farmers-ban-turnips', function() {
    casper.wait(5000);
    this.capture('debug.png');


    // filling the form
    this.fill('form.sign', {
        'first_name': data["name"],
        'last_name': data["surname"],
        'email': data["email"],

    });

    this.fillSelectors('form.sign', {
        'select[name="country_code"]': 'Estonia'
    });

    casper.wait(2000);

    this.fill('form.sign', {
        'city': cities[citi]
    });

    if (this.exists('input[name="postal_code"]')) {
        this.fill('form.sign', {
            'postal_code': '4000'
        });
        console.log(true)
    } else {
        console.log(false);
    }



    if (this.exists(".js-autopublish-wrapper")) {
        this.evaluate(function() {
            //delete div '.js-autopublish-wrapper'
            $('.js-autopublish-wrapper').remove();
        });
    } else {
        console.log(false);
    }
    this.sendKeys('.textarea-no-resize', messages[rando]);



    this.click('.js-sign-button')
    this.wait(2000);
    this.capture('debug2.png');




});
casper.then(function() {
    if (this.getTitle() == "Share petition · Farmers: Ban Turnips · Change.org") {
        console.log("Successfully signed");
    } else {
        console.log('check pictures');
    }
})

casper.run({});
({});
