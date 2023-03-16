(function () {
    'use strict';

    var activeComp = app.project.activeItem;
    var activeLayer = activeComp.selectedLayers[0];
    var alert_ = function (sth) {
        alert(sth.toString());
    };

    alert_(activeLayer.index);

})();
