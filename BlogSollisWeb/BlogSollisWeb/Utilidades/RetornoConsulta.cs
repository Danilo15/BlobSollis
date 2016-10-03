public class RetornoConsulta
{
    #region Propriedades

    private bool _eSucesso;

    public bool ESucesso
    {
        get
        {
            return _eSucesso;
        }
        set
        {
            _eSucesso = value;
        }
    }

    private string _mensagem = string.Empty;

    public string Mensagem
    {
        get
        {
            return _mensagem;
        }
        set
        {
            _mensagem = value;
        }
    }

    private string _gridHtml;

    public string GridHtml
    {
        get
        {
            return _gridHtml;
        }
        set
        {
            _gridHtml = value;
        }
    }

    private string _detalhesHtml;

    public string DetalhesHtml
    {
        get
        {
            return _detalhesHtml;
        }
        set
        {
            _detalhesHtml = value;
        }
    }

    private object _json;

    public object Json
    {
        get
        {
            return _json;
        }
        set
        {
            _json = value;
        }
    }

    #endregion Propriedades
}