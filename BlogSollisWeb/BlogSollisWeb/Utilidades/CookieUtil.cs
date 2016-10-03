using System;
using System.Collections.Specialized;
using System.Web;

public class CookieUtil
{
    private System.Web.HttpContext context;

    #region Constructor

    public CookieUtil()
    {
        context = System.Web.HttpContext.Current;
    }

    #endregion Constructor

    #region GravarCookie

    public void Gravar(string pId, NameValueCollection pNameValueCollection, TimeSpan pTimeSpan)
    {
        HttpCookie cookie = new HttpCookie(pId);
        cookie.Values.Add(pNameValueCollection);
        cookie.Expires = DateTime.Now.Add(pTimeSpan);
        context.Response.Cookies.Add(cookie);
    }

    #endregion GravarCookie

    #region Existe

    public bool Existe(string pIdCookie)
    {
        bool retorno = false;

        if (context.Request.Cookies[pIdCookie] != null)
        {
            retorno = true;
        }

        return retorno;
    }

    #endregion Existe

    #region ValorExiste

    public bool ValorExiste(string pIdCookie, string pKey, string pValue)
    {
        bool retorno = false;

        if (context.Request.Cookies[pIdCookie].Values[pKey].ToString() == pValue)
        {
            retorno = true;
        }

        return retorno;
    }

    #endregion ValorExiste

    #region ValorObter

    public string ValorObter(string pIdCookie, string pKey)
    {
        string retorno = string.Empty;

        retorno = context.Request.Cookies[pIdCookie].Values[pKey].ToString();

        return retorno;
    }

    #endregion ValorObter

    #region ApagarCookie

    public void ApagarCookie(string idCookie)
    {
        if (context.Request.Cookies[idCookie] != null)
        {
            context.Request.Cookies[idCookie].Expires = DateTime.Now.AddDays(-1d);
            context.Response.Cookies.Add(context.Request.Cookies[idCookie]);
        }
    }

    #endregion ApagarCookie
}