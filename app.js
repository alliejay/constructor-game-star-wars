$(document).ready(function () {
  page.init();
});

// VARIABLES
 window.goal = 100;
 window.points = 0;
 window.percentage = 0;
 var repeats = [];
 var missionRepeats = [];
 var speciesRepeats = [];
 var luke = new Jedi("Luke");

// R2D2 HOVER SOUNDS
 $("#droidCam").mouseenter('#speak', (function() {
    $("#sound-" + Math.ceil(Math.random() * 3))[0].play();
 }));

// GAME
var page = {
  init: function () {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function () {
  },

  initEvents: function () {
    // START
    $('.container').on('click', '#start', function(event) {
      $(this).addClass('hidden');
      $('.opening').addClass('hidden');
      $('.instructions').removeClass('hidden');
      $('.spaceship').removeClass('hidden');
      $('footer').removeClass('hidden');
      $('#introAudio')[0].pause();
    });

    // GOING TO A PLANET/MOON
    $('.instructions').on('click', 'li', function () {
      var atLocation = $(this);
      var planetIMG = $(this).children('img');
      var selectedPlanet = $(this).attr('rel');
      _.each(planetArray, function (el, idx, arr) {
        if (el.name === selectedPlanet) {
          luke.flyTo(el);
        }
      });
      _.each(planetInfo, function (el, idx, arr) {
        if (el.title === selectedPlanet) {
          // ALDERAAN EXPLOSION
          if (el.title === "Alderaan") {
            var aldTemplate = _.template($('#alderaanTmpl').html());
            var aldHTML = aldTemplate(planetInfo[idx]);
            $('.instructions').addClass('hidden');
            $('.visiting').html(aldHTML);
            $('.visiting').removeClass('hidden');
          } else {
            var planetTemplate = _.template($('#planetTmpl').html());
            var planetHTML = planetTemplate(planetInfo[idx]);
            $('.instructions').addClass('hidden');
            $('.visiting').html(planetHTML);
            $('.visiting').removeClass('hidden');
          }
        }
      });
    });

    // ATTEMPT JEDI QUEST
    $('.options').on('click', 'button[name="try"]', function() {
        luke.tryMission();
    });

    // EXIT ORBIT
    $('.options').on('click', 'button[name="back"]', function () {
      $('.visiting').addClass('hidden');
      $('.instructions').removeClass('hidden');
    });

    // DEPLOY POD
    $('.options').on('click', 'button[name="interaction"]', function() {
      luke.interact();
    });

    // LAUNCH TEXT
    $('.options').on('click', '#missile', function() {
      $('.controlPanelBottom').html("<p>Master Jedi, don't touch that! Are you trying to exterminate an entire race?!</p>")
    });

    // COMPASS TEXT
    $('.options').on('click','#compass', function() {
      $('.controlPanelBottom').html("<p>Stop messing with the controls! I am the pilot here!</p>")
    });
},
};


// CONSTRUCTORS
function Jedi(name) {
  this.name = name;

// FLY TO LOCATION
  this.flyTo = function(planet) {
    if (_.contains(repeats, planet)) {
      $('.controlPanelBottom').html("<p>You're losing it, Jedi.  We've already been there! Choose another location.</p><br><br>");
    } else {
    repeats.push(planet);
    $('.controlPanelBottom').html("<p class='css-typing'>Activa...</p>");
    if (planet === alderaan) {
      points = -5000;
      function alderaanText() {
          $('.controlPanelBottom').append("<p>Oh no, Something has gone terribly wrong. You were killed in a massive explosion just moments after reaching Alderaan. The galaxy is doomed.</p><br><br>");
          $('#doomed')[0].play();
      };
      setTimeout(alderaanText, 4000);
      $('.pointCount').html("<p>FATAL ERROR 50302845902848</p>");
      $('controlButtons').on('click', 'button', function() {
        $('.controlPanelBottom').html("FATAL ERROR")
      })
      $('#droidCam').html("<p>DROID CAM</p> <img src='img/skull.png'/>");
    } else {
      $('.controlPanelBottom').html("<p class='css-typing'>Activating hyperdrive. Entering orbit in 3.. 2.. 1..</p>");
      points += planet.points;
      percentage = (points/goal)*100;
      if (points >= 100) {
        function planet1Delay() {
        $('.controlPanelBottom').append("<p>You've reached " + planet.name + ", completed your mission & saved us all! Well done.</p><br><br>");
        $('#laughing')[0].play();
        };
        setTimeout(planet1Delay, 4000);
        $('.pointCount').html("<p>MISSION STATUS: 100% COMPLETE</p>");
      } else if (points < 0) {
        $('.controlPanelBottom').html("<p>You failed, remember?  You'll have to refresh the mission and start again.</p><br><br>");
      } else {
      function planet2Delay() {
      $('.controlPanelBottom').append("<p>You've travelled swifty and reached " + planet.name + ". " + percentage + "% of your mission is complete.</p><br><br>");
        if (planet.name === "Hoth" || planet.name === "Tatooine" || planet.name === "Dagobah") {
          $('#desolate')[0].play();
        }
      };
      setTimeout(planet2Delay, 4000);
      $('.pointCount').html("<p>MISSION STATUS: " + percentage + "% COMPLETE</p>");
    }

//INTERACTION WITH NATIVE SPECIES
      this.interact = function() {
      if (_.contains(speciesRepeats, planet)) {
        $('.controlPanelBottom').html("<p>You're already deployed, Master Jedi. Return to the ship for a medical check, too much time on" + planet.name + " is messing with your head.</p><br><br>");
      } else {
      speciesRepeats.push(planet);
      points += planet.species.points;
      percentage = (points/goal)*100;
      $('.controlPanelBottom').html("<p class='css-typing'>DEPLOYING CRAFT TO " + planet.name + ".</p>");
        if (points >= 100) {
          function species1Delay() {
          $('.controlPanelBottom').append("<p>You've encountered some helpful " + planet.species.name + " & they've helped you defeat the Imperial Scum! The galaxy has been saved!</p><br><br>");
          $('#laughing')[0].play();
          };
          setTimeout(species1Delay, 4000);
          $('.pointCount').html("<p>MISSION STATUS: 100% COMPLETE</p>");
        } else if (points < 0) {
          points = -5000;
          function species2Delay() {
          $('.controlPanelBottom').append("<p>Master Jedi?! Can you hear us?! An unfriendly " + planet.species.name + " has fatally injured you. The galaxy is doomed.</p><br><br>");
          $('#doomed')[0].play();
          };
          setTimeout(species2Delay, 4000);
          $('.pointCount').html("<p>MISSION STATUS: 0% COMPLETE</p>");
        } else {
            if (planet.species.helpful) {
              function species3Delay() {
              $('.controlPanelBottom').append("<p>Excellent work, Master Jedi. You've encountered some friendly " + planet.species.name + ". They've made our journey easier & you're mission is " + percentage + "% complete.</p><br><br>");
              };
              setTimeout(species3Delay, 4000);
              $('.pointCount').html("<p>MISSION STATUS: " + percentage + " % COMPLETE</p>");
            } else {
              function species4Delay() {
              $('.controlPanelBottom').append("<p>Master Jedi, be careful! An unfriendly " + planet.species.name + " has injured you & set us back.  We're now " + percentage + "% complete with our mission.</p><br><br>");
              $('#mess')[0].play();
              };
              setTimeout(species4Delay, 4000);
              $('.pointCount').html("<p>MISSION STATUS: " + percentage + " % COMPLETE</p>");
            }
          }
        }
      }
        this.tryMission = function() {
          if (_.contains(missionRepeats, planet)) {
            $('.controlPanelBottom').html("<p>The our side mission has already been attempted.  Stop wasting time, we have a galaxy to save.</p><br><br>");
          } else {
          missionRepeats.push(planet);
          points += planet.mission.points;
          percentage = (points/goal)*100;
          $('.controlPanelBottom').html("<p class='css-typing'>Initiating precision tracking.  Proceed with caution. </p>");
            if (points >= 100) {
              function mission1delay() {
              $('.controlPanelBottom').append("<p>" + planet.mission.plot + " Way to go! You completed your mission & saved the galaxy!</p><br><br>");
              $('#laughing')[0].play();
            };
              setTimeout(mission1delay, 5000);
              $('.pointCount').html("<p>MISSION STATUS: 100% COMPLETE</p>");
            } else if (points < 0) {
              points = -5000;
              function mission2delay () {
              $('.controlPanelBottom').append("<p>" + planet.mission.plot + " We're too far lost to be of any help, the galaxy is doomed.</p><br><br>");
              $('#doomed')[0].play();
            };
              setTimeout(mission2delay, 5000);
              $('.pointCount').html("<p>MISSION STATUS: 0% COMPLETE</p>");
            } else {
              function mission3delay(){
              $('.controlPanelBottom').append("<p>" + planet.mission.plot + " " + percentage + "% of your mission is complete.</p><br><br>");
            };
              function nabooDelay() {
              if (planet.name === "Naboo") {
                $('#lang')[0].play();
              }
            };
              setTimeout(mission3delay, 5000);
              setTimeout(nabooDelay, 7000);
              $('.pointCount').html("<p>MISSION STATUS: " + percentage + " % COMPLETE</p>");
            }
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
  sound: null
});

// ENDOR
var endor = new Location ({
  name: "Endor",
  points: 20,
  sound: null
});

endor.natives({
  name: "Ewoks",
  helpful: true,
  points: 20
});

endor.special({
  plot: "Uh oh. Master Jedi, your poking around has angered these furry little creatures and they've banned you from Endor entirely.",
  points: -20
});

// TATOOINE
var tatooine = new Location ({
  name: "Tatooine",
  points: 20,
  sound: desolate
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
  points: 20,
  sound: null
});

naboo.natives({
  name: "person",
  helpful: false,
  points: -10
});

naboo.special({
  plot: "You've discovered a horribly annoying creature named Jar Jar Binks.  You must backtrack & leave Naboo as fast as you can or R2D2 is threatening to abandon you.",
  points: -30
});

// HOTH
var hoth = new Location({
 name: "Hoth",
 points: 20,
 sound: desolate
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
 points: 20,
 sound: null
});

dagobah.natives({
 name: "people eating plant",
 helpful: false,
 points: -20
});

dagobah.special({
 plot: "What's this?! You've discovered the old Jedi Grand Master only heard of in legends. His help is priceless.",
 points: 40
});

// CORUSCANT
var coruscant = new Location({
 name: "Coruscant",
 points: 10,
 sound: null
});

coruscant.natives({
 name: "politicians",
 helpful: true,
 points: 10
});

coruscant.special({
 plot: "You've stumbled upon the old Jedi Archives. This should help defeat the Imperial Army.",
 points: 10
});

// KASHYYYK
var kashyyyk = new Location({
 name: "Kashyyyk",
 points: 10,
 sound: null
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


var planetArray = [
  alderaan,
  endor,
  tatooine,
  naboo,
  hoth,
  dagobah,
  coruscant,
  kashyyyk
];

var planetInfo = [
  {
    title: "Alderaan",
    url: "img/alderaan-explosion.png"
  },
  {
    title: "Endor",
    url: "img/endor.png"
  },
  {
    title: "Tatooine",
    url: "img/tatooine.png"
  },
  {
    title: "Naboo",
    url: "img/naboo.png"
  },
  {
    title: "Hoth",
    url: "img/hoth.png"
  },
  {
    title: "Dagobah",
    url: "img/dagobah.png"
  },
  {
    title: "Coruscant",
    url: "img/coruscant.png"
  },
  {
    title: "Kashyyyk",
    url: "img/kashyyyk.png"
  }
];
