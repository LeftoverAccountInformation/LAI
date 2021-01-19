;(function($) {
    $(function() {
        var focusForm = function(formSelector) {
            return function(e) {
                e.preventDefault();
                $(formSelector)[0].scrollIntoView()
                $(formSelector + ' input')[0].focus();
            }
        };

        $('.dont-have-account-link').click(focusForm('#gigya-register'));
        $('.already-have-account-link').click(focusForm('#gigya-login'));


        var expandSection = function (e) {
            var keydown = e.type === 'keydown';
            if (keydown && e.which !== 13 && e.which !== 32) {
                return;
            }
            e.preventDefault();

            $(this).parent().toggleClass('expanded');

            if (keydown) {
                this.scrollIntoView();
            }
        };
        $('.serial-number-finder .robot-family-header, .serial-number-finder .robot-series-header').on('click keydown', expandSection);
    });
})(jQuery);