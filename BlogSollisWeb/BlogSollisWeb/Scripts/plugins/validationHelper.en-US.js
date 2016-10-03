(function ($) {
    $.extend($.validator.messages, {
        required: "*field required",
        decimalRequired: "*field requires value higher than zero",
        intRequired: "*number required",
        int: "*number required",
        email: "*email invalid",
        url: "*url invalid",
        date: "date invalid",
        datebr: "date invalid",
        number: "*number invalid",
        decimal: "*decimal invalid",
        digits: "*digits only",
        maxlength: $.validator.format("*maximum length of {0} caracters exceded."),
        minlength: $.validator.format("*field requires at least {0} characters."),
        rangelength: $.validator.format("*field requires values between range of {0} and {1} characters."),
        range: $.validator.format("*field requires values between {0} and {1}."),
        rangedecimal: "*field requires values between {0} e {1}.",
        max: $.validator.format("*field requires a value lower or equal to {0}."),
        min: $.validator.format("*field requires a value higher or equal to  {0}.")
    });

    //validar data formato pt-BR
    $.validator.addMethod("datebr", function (dateString, element) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        var valid = ((day > 0) && (day <= monthLength[month - 1]));
        return valid;
    }, "*Date invalid");

    //Validar decimal requerido
    $.validator.addMethod('decimalRequired', function (value, element) {
        var result = (parseFloat(value.replace(".", ",")) > 0.00);
        return result;
    });
}(jQuery));