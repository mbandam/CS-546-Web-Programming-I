$(document).ready(function () {
    $("#form-signin").submit(function () {
        $("#signinbutton").attr("disabled", true);
        $("#errorinfo").hide();
        return true;
    });
});