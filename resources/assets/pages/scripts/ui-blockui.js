var UIBlockUI = function() {

    var handleSample1 = function() {

            App.blockUI({
                target: '#contenidoWizard',
                //overlayColor: 'none',
                animate: true
            });
        
    }

    return {
        //main function to initiate the module
        init: function() {

            handleSample1();

        }

    };

}();

jQuery(document).ready(function() {    
   UIBlockUI.init();
});