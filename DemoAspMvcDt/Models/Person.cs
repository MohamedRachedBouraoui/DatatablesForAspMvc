using DemoAspMvcDt.Helpers;
using FluentValidation;
using FluentValidation.Validators;
using System;
using System.ComponentModel.DataAnnotations;

namespace DemoAspMvcDt.Models
{
    [ValiderAvec(typeof(ValidateurPerson))]
    public class Person
    {
        public int Identifiant { get; set; }

        [Required]
        public string Name { get; set; }

        public int Age { get; set; }

        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }

        [Display(Name = "Birthday")]
        public string DOBAsString { get; set; }

        public string Progress { get; set; }
        public bool IsMaried { get; set; }
    }

    public class ValidateurPerson : AbstractValidator<Person>
    {

        public ValidateurPerson()
        {
            RuleFor(rh => rh.Name).NotEmpty().WithMessage("Le champs 'Name' est requis");
            RuleFor(rh => rh.Age).InclusiveBetween(18,70).WithMessage("Il faut être agé entre 18 et 70");
            RuleFor(rh => rh.DOB).InclusiveBetween(new DateTime(1990,01,01),new DateTime(2010,01,01)).WithMessage("Il faut être agé entre 18 et 70");
            RuleFor(rh => rh.Progress).Must(ProgressRange);

            //When
            //RuleFor(customer => customer.CustomerDiscount).GreaterThan(0).When(customer => customer.IsPreferredCustomer);
            //When(customer => customer.IsPreferred, () => {
            //    RuleFor(customer => customer.CustomerDiscount).GreaterThan(0);
            //    RuleFor(customer => customer.CreditCardNumber).NotNull();
            //});
            //When(customer => customer.IsPreferred, () => {
            //    RuleFor(customer => customer.CustomerDiscount).GreaterThan(0);
            //    RuleFor(customer => customer.CreditCardNumber).NotNull();
            //}).Otherwise(() => {
            //    RuleFor(customer => customer.CustomerDiscount).Equal(0);
            //});
        }

        private bool ProgressRange(Person p ,string progress, PropertyValidatorContext context)
        {
            if(decimal.TryParse(progress,out decimal decimalProgress) == false)
            {
                context.MessageFormatter.AppendArgument("ErrorMessage", "La valeur devrait être entre 0 et 100");
                return false;
            }
            
            if(decimalProgress<0 || decimalProgress >100)
            {
                context.MessageFormatter.AppendArgument("ErrorMessage", "La valeur devrait être entre 0 et 100");
                return false;
            }
            return true;
        }
    }
}
