package classes;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("yValidator")
public class YValidator implements Validator {

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {

        System.out.println("Значение value в yValidator:" + value);
        double newValue = ((Number) value).doubleValue();
        if (newValue > 3.0D || newValue < -5.0D) {
            throw new ValidatorException(new FacesMessage("Координата Y должна находиться в диапазоне от -5 до 3."));
        }
    }
}
