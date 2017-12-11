$(function() {
    game();

});


function game() {

    new Audio("./assets/audio/starwars.mp3").play();

    var toons = characterData();

    function setCharacterHTML(toon) {
        return "<div class=\"col-md-2\">\n" +
            "<div id='" + toon.name + "' class=\"character card\">\n" +
            "<h4 class=\"name\">" + toon.name + "</h4>\n" +
            "<img src='./assets/images/" + toon.name.toLowerCase() + ".jpg' class=\"toon-img\">\n" +
            "<div class=\"hit-points\">" + toon.hp + "</div>\n" +
            "</div>\n" +
            "</div>";
    }

    function toggleSelectArea() {
        $('#toonSelect').slideToggle();
        $('#select-title').slideToggle();
    }

    // set selection html
    $.each(toons, function (index, toon) {
        var toonTemplate = setCharacterHTML(toon);
        if (toon.boss === false) {
            $("#toonSelect").append(toonTemplate);
        }
    });

    var hero = {};
    var enemies = [];
    var villan = {};


    // pick a hero
    $('.character').click(function (event) {
        var heroName = event.currentTarget.id;

        $.each(toons, function (index, arrayItem) {
            //move that hero to main toon
            if (heroName === arrayItem.name) {
                hero = arrayItem;
            } else {
                //move other hero's to toonsLeft
                enemies.push(arrayItem)
            }
        });
        //clear selection html
        toggleSelectArea();

        //update hero and enemies html
        $('#toonsLeft').show();
        $('#mainToon').html(setCharacterHTML(hero)).show();
        $.each(enemies, function (index, enemy) {
            $('#toonsLeft').append(setCharacterHTML(enemy));
        })

        $('#toonsLeft').find('.character').click(function (evt) {
            var opponentName = evt.currentTarget.id;
            $.each(enemies, function (index, enemy) {
                if (opponentName === enemy.name) {
                    villan = enemy;
                    enemies.slice(index, 1);
                }
            });
            $('#toonsLeft').find('#' + villan.name).parent('.col-md-2').remove();
            $('#toonsLeft').slideUp();
            $('#opponent').slideDown();

            $('#opponent').html(setCharacterHTML(villan));
            $('#attackBtn').click(function () {
                new Audio("./assets/audio/lightsaber.mp3").play();
                var damage = villan.attack;
                var strike = hero.attack;
                hero.hp -= damage;
                villan.hp -= strike;
                hero.attack += 10;
                console.log(hero.hp);
                console.log(hero.attack);

                $('#results').html("<h3>You were hit for <span style='color: tomato;'>" + damage + "</span> points of damage You striked for <span style='color: tomato;'>" + strike + "</span> points of damage</h3>").show();

                $('#opponent').html(setCharacterHTML(villan));
                $('#mainToon').html(setCharacterHTML(hero));

                if (villan.hp < 1) {
                    $('#results').html('<h3>You have defeated ' + villan.name.toLowerCase() + '!</h3>').show();
                    $('#opponent').slideUp();
                    villan = {};
                    $('#attackBtn').off("click");
                    $('#toonsLeft').show();
                    $('#results').html('').fade();
                }
                if (hero.hp < 1) {
                    $('#results').html('<h3>You have been defeated by ' + villan.name.toLowerCase() + '!</h3>').show();
                    //reset data
                    hero = {};
                    $('#mainToon').slideUp();
                    $('#attackBtn').off("click");
                    $('#toonsLeft').find('.character').off("click");
                    $('#toonsLeft').html('');
                    enemies = [];
                    new Audio("./assets/audio/endgame.mp3").play();
                    toons = characterData();
                    setTimeout(function () {
                        alert('You have lost...but the force is a circle...begin anew???');
                        $('#opponent').html('').show(); //hide for reset
                        toggleSelectArea();
                        $('#results').html('').fade();
                    }, 1500)

                }
            });

        });

    });
}

function characterData() {
    return [
        {
            name: 'Luke',
            hp: 120,
            attack: 5,
            boss: false
        },
        {
            name: 'Obi',
            hp: 120,
            attack: 5,
            boss: false

        },
        {
            name: 'Yoda',
            hp: 100,
            attack: 5,
            boss: false
        },
        {
            name: 'Maul',
            hp: 120,
            attack: 5,
            boss: false
        },
        {
            name: 'Vader',
            hp: 150,
            attack: 30,
            boss: false
        },
        {
            name: 'Emperor',
            hp: 200,
            attack: 50,
            boss: true
        }
    ]
}


















