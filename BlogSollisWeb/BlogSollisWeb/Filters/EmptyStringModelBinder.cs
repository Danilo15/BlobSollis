﻿using System.Web.Mvc;

public sealed class EmptyStringModelBinder : DefaultModelBinder
{
    public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
    {
        bindingContext.ModelMetadata.ConvertEmptyStringToNull = false;
        return base.BindModel(controllerContext, bindingContext);
    }
}