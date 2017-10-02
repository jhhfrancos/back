var img = 1;
var FormWizard = function () {


    return {
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return; 
            }

            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            var formTotal = $('#form_wizard_1');
            
            var displayConfirm = function() {

            };

            // default form wizard
            formTotal.bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index, clickedIndex) {
                    
                },
                onNext: function (tab, navigation, index) {
                    cambiarImagen(++img % 4 + 1);
                    if(index == 1){
                        showPaso(8);
                    }
                    if (index == 2) {
                        showPaso(14);
                    }
                },
                onPrevious: function (tab, navigation, index) {
                    
                },
                onTabClick: function (tab, navigation, index) {
                    //return false;
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    formTotal.find('.bar').css({
                        width: $percent + '%'
                    });
                    if (index >= 2) {
                        $("#btn_siguiente").hide();
                        $("#btn_finalizar").show();
                    } else {
                        $("#btn_siguiente").show();
                        $("#btn_finalizar").hide();
                    }
                    $('#menuWizard').find('li').css("display", function (i) {
                        return (i <= index) ? "block" : "none"} /*"block"*/
                    );
                    
                }
            });

        }

    };

}();

jQuery(document).ready(function() {
    FormWizard.init();
});