using BlogSollisWeb;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Drawing.Imaging;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading;

public static class Utilidades
{
    #region string limitar(string texto, int length)

    public static string limitar(string texto, int length)
    {
        string retorno = texto;

        if (texto.Length > length)
        {
            retorno = texto.Substring(0, length);
        }

        return retorno;
    }

    #endregion string limitar(string texto, int length)

    #region string limitar(string texto, int length, string pattern)

    public static string limitar(string texto, int length, string pattern)
    {
        string retorno = texto;

        if (texto.Length > length)
        {
            retorno = string.Format("{0}{1}", texto.Substring(0, length), pattern);
        }

        return retorno;
    }

    #endregion string limitar(string texto, int length, string pattern)

    #region string limitarCustomizado(string texto, int length, string replace)

    public static string limitarCustomizado(string texto, int length, string replace)
    {
        string retorno = texto;

        if (texto.Length > length)
        {
            retorno = string.Format("{0}{1}", texto.Substring(0, length - 3), replace);
            string newstring = string.Format("{0}{1}", texto.Substring(0, retorno.Length - 3), replace);
            string finalstring = string.Format("{0}{1}", newstring, texto.Substring(texto.Length - 3, 3));
            retorno = finalstring;
        }

        return retorno;
    }

    #endregion string limitarCustomizado(string texto, int length, string replace)

    #region string CNPJFormatar(string pCnpj)

    public static string CNPJFormatar(string pCnpj)
    {
        string retorno = string.Empty;

        if (!String.IsNullOrEmpty(pCnpj))
        {
            retorno = String.Format(@"{0:00\.000\.000\/0000\-00}", Convert.ToInt64(pCnpj));
        }

        return retorno;
    }

    #endregion string CNPJFormatar(string pCnpj)

    #region string CPFFormatar(string pCPF)

    public static string CPFFormatar(string pCPF)
    {
        string retorno = string.Empty;

        retorno = String.Format(@"{0:###\.###\.###\-##}", Convert.ToInt64(pCPF));

        return retorno;
    }

    #endregion string CPFFormatar(string pCPF)

    #region IList<int> MesesCol()

    public static IList<int> MesesCol()
    {
        IList<int> retorno = new List<int>();
        int total = 12;
        for (int i = 0; i < total; i++)
        {
            retorno.Add(i + 1);
        }

        return retorno;
    }

    #endregion IList<int> MesesCol()

    #region IList<int> MesesCol(int max)

    public static IList<int> MesesCol(int max)
    {
        IList<int> retorno = new List<int>();

        for (int i = 0; i < max; i++)
        {
            int valor = (i + 1);
            if (valor % 12 == 0)
            {
                retorno.Add(valor);
            }
        }

        return retorno;
    }

    #endregion IList<int> MesesCol(int max)

    #region static string EmptyInt(int valor)

    public static string EmptyInt(int valor)
    {
        string retorno = string.Empty;

        if (valor > 0)
        {
            retorno = valor.ToString();
        }

        return retorno;
    }

    #endregion static string EmptyInt(int valor)

    #region static void GravarCookieCulture(string culture)

    public static void GravarCookieCulture(string culture)
    {
        CookieUtil CookieUtil1 = new CookieUtil();
        NameValueCollection NameValueCollection1 = new NameValueCollection();
        NameValueCollection1.Add("sigla", culture);
        CookieUtil1.Gravar("culture", NameValueCollection1, new TimeSpan(1, 0, 0, 0));
    }

    #endregion static void GravarCookieCulture(string culture)

    #region static void GravarCookieIdUsuario(int pIdPessoa)

    public static void GravarCookieIdUsuario(int pIdPessoa)
    {
        CookieUtil CookieUtil1 = new CookieUtil();
        NameValueCollection NameValueCollection1 = new NameValueCollection();
        NameValueCollection1.Add("id", pIdPessoa.ToString());
        CookieUtil1.Gravar("id", NameValueCollection1, new TimeSpan(1, 0, 0, 0));
    }

    #endregion static void GravarCookieIdUsuario(int pIdPessoa)
}