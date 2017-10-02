var UIGeneral = function () {

    var handlePulsate = function () {
        if (!jQuery().pulsate) {
            return;
        }

        if (App.isIE8() == true) {
            return; // pulsate plugin does not support IE8 and below
        }

        if (jQuery().pulsate) {
            jQuery('#descripcion-pulso').pulsate({
                color: "#bf1c56",
                reach: 20,
                pause: 2500,
                speed: 1000,
                glow: true
            });
        }
    };

    return {
        //main function to initiate the module
        init: function () {
            handlePulsate();
        }

    };

}();

jQuery(document).ready(function() {    
   UIGeneral.init();
});

