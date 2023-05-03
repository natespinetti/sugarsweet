$(document).ready(function(){
    // Initialize the tabs
    $('#myTab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});
