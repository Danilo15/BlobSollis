(function ($) {
    $.extend($.validator.messages, {
        required: "*requerido",
        decimalRequired: "*decimal maior que zero requerido",
        intRequired: "*númerico requerido",
        int: "*númerico requerido",
        email: "*e-mail inválido",
        cpf: "*CPF inválido",
        cnpj: "*CNPJ inválido",
        url: "*url inválida.",
        date: "*data inválida.",
        datebr: "*data inválida.",
        dateISO: "Por favor, escribe una fecha (ISO) válida.",
        number: "*número inválido.",
        decimal: "*decimal inválido.",
        digits: "*Insira apenas digitos.",
        maxlength: $.validator.format("*campo permite no máximo {0} caracteres."),
        minlength: $.validator.format("*campo requer no minímo {0} caracteres."),
        rangelength: $.validator.format("*campo requer um valor entre {0} e {1} caracteres."),
        range: $.validator.format("*campo requer um valor entre {0} e {1}."),
        rangedecimal: "*campo requer um valor entre {0} e {1}.",
        max: $.validator.format("*campo requer um valor menor ou igual à {0}."),
        min: $.validator.format("*campo requer um valor maior ou igual à {0}.")
    });

    //validar data formato pt-BR
    $.validator.addMethod("datebr", function (value, element) {
        if (value.length === 0) { return true; }

        //contando chars
        if (value.length !== 10) { return false; }

        // verificando data
        var data = value,
            dia = data.substr(0, 2),
            barra1 = data.substr(2, 1),
            mes = data.substr(3, 2),
            barra2 = data.substr(5, 1),
            ano = data.substr(6, 4);
        
        if (data.length !== 10 || barra1 !== "/" || barra2 !== "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) { return false; }
        if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia === 31) { return false; }
        if (mes === 2 && (dia > 29 || (dia === 29 && ano % 4 !== 0))) { return false; }
        if (ano < 1900) { return false; }

        return true;
    }, "");    
    

    //Validar decimal requerido
    $.validator.addMethod('decimalRequired', function (value, element) {
        var result = (parseFloat(value.replace(",", ".")) > 0.00);
        return result;
    });
}(jQuery));