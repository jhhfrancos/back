
var victimasAutofill = function () {

    return {
        
        init: function () {
            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            $("select").select2({
                placeholder: "Selecciona una persona...",
                allowClear: true,
                formatResult: format,
                width: '500px',
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });
        }

    };

}();


jQuery(document).ready(function () {
    victimasAutofill.init();
    //$('select').css('z-index', 99999999999999)
});