function adjustFooterPosition() {
    var docHeight = $(window).height();
    var footerHeight = $('footer').outerHeight();
    var footerTop = $('footer').position().top + footerHeight;
    if (footerTop < docHeight) {
        $('footer').css('margin-top', (docHeight - footerTop) + 'px');
    }
}
$(document).ready(adjustFooterPosition);
$(window).resize(adjustFooterPosition);
