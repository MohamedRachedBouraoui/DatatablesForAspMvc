using FluentValidation;
using System;

namespace DemoAspMvcDt.Helpers
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ValiderAvecAttribute : Attribute 
    {
        public Type Validateur { get; }
        public ValiderAvecAttribute(Type validateur)
         {
            Validateur = validateur;
        }

    }
}
