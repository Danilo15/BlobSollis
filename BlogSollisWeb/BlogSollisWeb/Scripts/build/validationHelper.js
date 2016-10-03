(function ($) {
    $.validator.addMethod("cpf", function (value, element) {
        value = value.replace('.', '');
        value = value.replace('.', '');
        value = value.replace('-', '');

        var i = 0,
            s = value,
            c = s.substr(0, 9),
            dv = s.substr(9, 2),
            d1 = 0,
            v = false;

        for (i; i < 9; i += 1) {
            d1 += c.charAt(i) * (10 - i);
        }
        if (d1 == 0) {
            v = true;
            return false;
        }
        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;
        if (dv.charAt(0) != d1) {
            v = true;
            return false;
        }

        d1 *= 2;
        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (11 - i);
        }
        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;
        if (dv.charAt(1) != d1) {
            v = true;
            return false;
        }
        if (!v) {
            return true;
        }

        return retorno;
    });

    $.validator.addMethod("cnpj", function (value, element) {
        var str = value,
            cnpj, numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
        str = str.replace('.', '');
        str = str.replace('.', '');
        str = str.replace('-', '');
        str = str.replace('/', '');
        cnpj = str;

        digitos_iguais = 1;
        if (cnpj.length < 14 && cnpj.length < 15)
            return false;
        for (i = 0; i < cnpj.length - 1; i++)
            if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
        }
        else
            return false;
    });

    //Validar range de data min-max
    $.validator.addMethod('rangeDate', function (value, element, param) {
        var dateValue,
            min,
            max,
            dateMin,
            dateMax,
            result;

        if (!value) {
            return true; // not testing 'is required' here!
        }

        try {
            dateValue = $.datepicker.parseDate("dd/mm/yy", value);
        } catch (e) {
            return false;
        }

        min = element.attributes["data-val-rangedate-min"].value;
        max = element.attributes["data-val-rangedate-max"].value;
        dateMin = $.datepicker.parseDate("yy/mm/dd", min);
        dateMax = $.datepicker.parseDate("yy/mm/dd", max);
        result = (dateMin <= dateValue && dateValue <= dateMax);

        return result;
    });

    //Validar int requerido
    $.validator.addMethod('intRequired', function (value, element) {
        var number = parseInt(value, 10),
            result = !isNaN(number) && (number > 0);

        return result;
    });

    //Validar int 
    $.validator.addMethod('int', function (value, element) {
        var result = true,
            number = 0;

        result = !isNaN(number) && (number >= 0);

        if (value.length > 0) {
            number = parseInt(value, 10);
            result = !isNaN(number) && (number >= 0);            
        }
        
        return result;
    });

    //Validar decimal requerido
    $.validator.addMethod('decimal', function (value, element) {
        var result = (value.toDecimal() >= 0 || !value.toDecimal().length);
        return result;
    });

    //Validar range decimal requerido
    $.validator.addMethod('rangedecimal', function (value, element) {
        var result,
            valor,
            min,
            max;

        valor = parseFloat(value, 10);
        min = element.attributes["data-decimal-min"].value;
        max = element.attributes["data-decimal-max"].value;
        result = !(valor < min || valor > max);

        $.validator.messages["rangedecimal"] = $.validator.messages["rangedecimal"].format(min, max);

        return result;
    });

    //Validar range de data min-max
    $.validator.addMethod('rangeDate', function (value, element, param) {
        var dateValue,
            min,
            max,
            dateMin,
            dateMax,
            result;

        if (!value) {
            return true; // not testing 'is required' here!
        }

        try {
            dateValue = $.datepicker.parseDate("dd/mm/yy", value);
        } catch (e) {
            return false;
        }

        min = element.attributes["data-val-rangedate-min"].value;
        max = element.attributes["data-val-rangedate-max"].value;
        dateMin = $.datepicker.parseDate("yy/mm/dd", min);
        dateMax = $.datepicker.parseDate("yy/mm/dd", max);
        result = (dateMin <= dateValue && dateValue <= dateMax);

        return result;
    });
}(jQuery));