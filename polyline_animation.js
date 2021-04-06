ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
  var myMap = new ymaps.Map("map", {
    center: [59.96457641293122, 30.46983077074577],
    zoom: 15
  }, {
    searchControlProvider: 'yandex#search'
  });
  var firstAnimatedLine = new ymaps.AnimatedLine([
    [59.96616057271069, 30.47874643276454],
    [59.96596725558087, 30.47775937991445],
    [59.966262600741075, 30.477153200718465],
    [59.96494695202307, 30.473618049292874],
    [59.96475362781055, 30.472244758371005],
    [59.96472140699879, 30.47186924913456],
    [59.96473751740858, 30.470903653955123],
    [59.965210085941386, 30.468843717439743],
    [59.96334125276936, 30.46644045810526],
    [59.96318014152656, 30.465979118121734],
    [59.962970695737106, 30.464788217316194],
    [59.96255180019544, 30.465142268881987],
    [59.962165122667656, 30.463221807211205]
  ], {}, {
    strokeColor: "#ED4543",
    strokeWidth: 5,
    animationTime: 4000
  });

  myMap.geoObjects.add(firstAnimatedLine);

  var firstPoint = new ymaps.Placemark([59.96616057271069, 30.47874643276454], {}, {
    preset: 'islands#blueHomeCircleIcon'
  });
  var secondPoint = new ymaps.Placemark([59.962165122667656, 30.463221807211205], {}, {
    preset: 'islands#bluePocketIcon'
  });

  // Функция анимации пути.
  function playAnimation() {
    myMap.geoObjects.add(firstPoint);
    firstAnimatedLine.animate()
      .then(function () {
        myMap.geoObjects.add(secondPoint);
        return ymaps.vow.delay(null, 2000);
      })
      .then(function () {
        // Удаляем метки с карты.
        myMap.geoObjects.remove(firstPoint);
        myMap.geoObjects.remove(secondPoint);
        playAnimation();
      });
  }
  playAnimation();
}
