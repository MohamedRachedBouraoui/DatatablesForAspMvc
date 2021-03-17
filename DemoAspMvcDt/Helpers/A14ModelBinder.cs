using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;

namespace DemoAspMvcDt.Helpers
{
    public class A14ModelBinder : DefaultModelBinder
    {

        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var validerAvecAttribute = bindingContext.ModelType.GetCustomAttributes(typeof(ValiderAvecAttribute), true)
                .FirstOrDefault() as ValiderAvecAttribute;

            if (validerAvecAttribute == null)
            {
                return base.BindModel(controllerContext, bindingContext);
            }

            object viewModelObj = base.BindModel(controllerContext, bindingContext);

            var constructors = validerAvecAttribute.Validateur.GetConstructors();
            var constructorsWithParams = constructors.Where(c => c.GetParameters().Any()).ToList();

            object instanceValidateur = null;
            IList<ValidationFailure> errors = null;
            if (constructorsWithParams.Any() == false)
            {
                instanceValidateur = Activator.CreateInstance(validerAvecAttribute.Validateur);
                System.Reflection.MethodInfo methodInfo = validerAvecAttribute.Validateur.GetMethod("Validate", new[] { bindingContext.ModelType });

                var validationResult = (ValidationResult)methodInfo.Invoke(instanceValidateur, new object[] { viewModelObj });
                errors = validationResult.Errors;
            }
            else
            {
                var objectList = new List<object>();

                var dependencyResolver = GlobalConfiguration.Configuration.DependencyResolver;
                using (var lifetimeScope = dependencyResolver.BeginScope())
                {
                    foreach (var _constructor in constructorsWithParams)
                    {
                        var _params = _constructor.GetParameters();
                        foreach (var param in _params)
                        {
                            object service = lifetimeScope.GetService(param.ParameterType);
                            objectList.Add(service);
                        }
                    }
                    instanceValidateur = Activator.CreateInstance(validerAvecAttribute.Validateur, objectList.ToArray());

                    System.Reflection.MethodInfo methodInfo = validerAvecAttribute.Validateur.GetMethod("Validate", new[] { bindingContext.ModelType });

                   var  validationResult = (ValidationResult)methodInfo.Invoke(instanceValidateur, new object[] { viewModelObj });
                    errors = validationResult.Errors;
                }
            }

            if (errors.Any())
            {
                foreach (var failure in errors)
                {
                    bindingContext.ModelState.AddModelError(failure.PropertyName, failure.ErrorMessage);
                }
            }

            return base.BindModel(controllerContext, bindingContext);
        }
    }

    public class A14ModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(Type modelType)
        {
            return new A14ModelBinder();
        }
    }
}
