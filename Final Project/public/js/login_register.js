$(document).ready(function () {
    $("#form-signin").submit(function () {
        $("#signinbutton").attr("disabled", true);
        $("#errorinfo").hide();
        return true;
    });


    $("#form-register").submit(function (e) {
        let pwd = $("#password").val();
        let confirmPwd = $("#confirm-password").val();

        if( pwd !== confirmPwd ) {
            e.preventDefault();
            $("#confirm-password")[0].setCustomValidity('Confirm password does not match with password.');
            return false;
        }

        $("#registerbutton").attr("disabled", true);
        $("#errorinfo").hide();
        return true;
    });

});
