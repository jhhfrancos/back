var UIBlockUI = function() {

    

    var handleSample2 = function() {


        $('#btn_siguiente').click(function () {
            App.blockUI({
                boxed: true
            });

            window.setTimeout(function() {
                App.unblockUI();
            }, 2000);
        });

        
    }



    return {
        //main function to initiate the module
        init: function() {

            handleSample2();

        }

    };

}();

jQuery(document).ready(function() {    
   UIBlockUI.init();
});