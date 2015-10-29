// OPENING
$('.game').on('click', '#start', function(event) {
  $(this).addClass('hidden');
  $(this).parent('.opening').addClass('hidden');
  $('.instructions').removeClass('hidden');
});

// GAME
 var goal = 100;
 var points = 0;
 var percentage = 0;
 var repeats = [];

function Jedi(name) {
  this.name = name;
  this.flyTo = function(planet) {
    if (_.contains(repeats, planet)) {
      console.log("You've already been there. Choose another location.");
    } else {
    repeats.push(planet);
    if (planet === alderaan) {
      points = -5000;
      console.log("Oh no, Something has gone terribly wrong. You were killed in a massive explosion just moments after reaching Alderaan. The galaxy is doomed.");
    } else {
      points += planet.points;
      percentage = (points/goal)*100;
      if (points >= 100) {
        console.log("You've reached " + planet.name + ", completed your mission & saved us all! Well done.");
      } else if (points < 0) {
        console.log("You failed, remember?  You'll have to refresh the mission and start again.");
      } else {
      console.log("You've travelled swifty and reached " + planet.name + ". " + percentage + "% of your mission is complete.");
      points += planet.species.points;
      percentage = (points/goal)*100;
        if (points >= 100) {
          console.log("You've also encountered some helpful " + planet.species.name + " & they've helped you complete the mission! You saved the galaxy!");
        } else if (points < 0) {
          points = -5000;
          console.log("Unfortunately, you also ran into an unfriendly " + planet.species.name + " who has injured you. You're too far behind to save us now. The galaxy is doomed.")
        } else {
            if (planet.species.helpful) {
              console.log("You've also encountered some friendly " + planet.species.name + ". They've made your journey easier & you're mission is " + percentage + "% complete.");
            } else {
              console.log("Unfortunately, you also ran into an unfriendly " + planet.species.name + " who has injured you & set you back.  You're now only " + percentage + "% complete with your mission.");
            }
          }
        }
        this.tryMission = function() {
          points += planet.mission.points;
          percentage = (points/goal)*100;
            if (points >= 100) {
              console.log(planet.mission.plot + " Way to go! You completed your mission & saved the galaxy!");
            } else if (points < 0) {
              points = -5000;
              console.log(planet.mission.plot + " You're too far lost to save us now, the galaxy is doomed.")
            } else {
              console.log(planet.mission.plot + " " + percentage + "% of your mission is complete.");
            }
         }
      }
    }
  }
};


function Location (options) {
  var options = options || {};
  this.name = options.name;
  this.points = options.points;
  this.species = new Species();
  this.natives = function(species) {
    this.species = species;
  };
  this.special = new Mission;
  this.special = function(mission) {
    this.mission = mission;
  };
};

function Species (options) {
  var options = options || {};
  this.name = options.name;
  this.helpful = options.helpful;
  this.points = options.points;
};

function Mission (options) {
  var options = options || {};
  this.plot = options.plot;
  this.points = options.points;
};

// LOCATIONS & SPECIES
  // ALDERAAN
  var alderaan = new Location ({
    name: "Alderaan",
    points: -1,
  });

  // ENDOR
  var endor = new Location ({
    name: "Endor",
    points: 20
  });

  endor.natives({
    name: "Ewoks",
    helpful: true,
    points: 20
  });

  endor.special({
    plot: "Uh oh. You've angered these furry little creatures and they've banned you from Endor entirely. Bad Jedi!",
    points: -20
  });

  // TATOOINE
  var tatooine = new Location ({
    name: "Tatooine",
    points: 20
  });

  tatooine.natives({
    name: "Womp Rat",
    helpful: false,
    points: -10
  });

  tatooine.special({
    plot: "You managed to find an old Jedi who is willing to assist you.",
    points: 30
  });

  // NABOO
  var naboo = new Location({
    name: "Naboo",
    points: 20
  });

  naboo.natives({
    name: "person",
    helpful: false,
    points: -10
  });

  naboo.special({
    plot: "You stumbled upon a horribly annoying creature named Jar Jar Binks.  You must backtrack & leave Naboo as fast as you can.",
    points: -30
  });

 // HOTH
 var hoth = new Location({
   name: "Hoth",
   points: 20
 });

 hoth.natives({
   name: "Tauntauns",
   helpful: true,
   points: 20
 });

 hoth.special({
   plot: "You've been attacked by a Wampa! Get out of there!",
   points: -30
 });

 // DAGOBAH
 var dagobah = new Location({
   name: "Dagobah",
   points: 20
 });

 dagobah.natives({
   name: "People eating plant",
   helpful: false,
   points: -20
 });

 dagobah.special({
   plot: "Your persistence has paid off wonderfully. You've found the old Jedi Grand Master only heard of in legends & he's agreed to teach you.",
   points: 40
 });

 // CORUSCANT
 var coruscant = new Location({
   name: "Coruscant",
   points: 10
 });

 coruscant.natives({
   name: "politicians",
   helpful: true,
   points: 10
 });

 coruscant.special({
   plot: "You've stumbled upon the old Jedi Archives. This should help you during your mission.",
   points: 10
 });

 // KASHYYYK
 var kashyyyk = new Location({
   name: "Kashyyyk",
   points: 10
 });

 kashyyyk.natives({
   name: "Wookies",
   helpful: true,
   points: 20
 });

 kashyyyk.special({
   plot: "Oh no, there is an invasion by a droid army!  You must leave as soon as you can.",
   points: -20
 });
