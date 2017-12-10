$(function() {

    var toons = [
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

    function setCharacterHTML(toon) {
        return "<div class=\"col-md-2\">\n" +
            "<div id='"+ toon.name +"' class=\"character card\">\n" +
            "<h4 class=\"name\">"+ toon.name +"</h4>\n" +
            "<img src='./assets/images/"+ toon.name +".jpg' class=\"toon-img\">\n" +
            "<div class=\"hit-points\">"+ toon.hp +"</div>\n" +
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
    $('.character').click(function(event){
        var heroName = event.currentTarget.id;

        $.each(toons, function (index, arrayItem){
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
        $('#mainToon').html(setCharacterHTML(hero));
        $.each(enemies, function (index, enemy){
            $('#toonsLeft').append(setCharacterHTML(enemy));
        })

        $('#toonsLeft').find('.character').click(function(evt) {
            var opponentName = evt.currentTarget.id;
            $.each(enemies, function (index, enemy) {
                if (opponentName === enemy.name) {
                    villan = enemy;
                    $('#toonsLeft').slideToggle();


                }
            })
        $('#opponent').html(setCharacterHTML(villan));
            console.log(villan);
            //START HERE
        });


    });












// choose an enemy
    //move enemy to target

// attack phase
    //each character attacks and takes damage
        //main toon attack power increments up
        // hp increments down
        // update round results
            //bonus make chance of dodge! chance of critical
        // determine if there is a winner
            //if hp === 0 game over
            //eliminate toon that is at 0 hp
            //reset hp of toon











});