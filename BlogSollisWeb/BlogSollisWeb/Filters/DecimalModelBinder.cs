using System;

/// <summary>
/// http://haacked.com/archive/2011/03/19/fixing-binding-to-decimals.aspx
/// </summary>
using System.Web.Mvc;

public class DecimalModelBinder : IModelBinder
{
    public object BindModel(ControllerContext controllerContext,
        ModelBindingContext bindingContext)
    {
        ValueProviderResult valueResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
        ModelState modelState = new ModelState
        {
            Value = valueResult
        };
        object actualValue = null;
        try
        {
            if (valueResult != null)
            {
                actualValue = Convert.ToDecimal(valueResult.AttemptedValue);
            }
        }
        catch (FormatException e)
        {
            modelState.Errors.Add(e);
        }

        bindingContext.ModelState.Add(bindingContext.ModelName, modelState);
        return actualValue;
    }
}