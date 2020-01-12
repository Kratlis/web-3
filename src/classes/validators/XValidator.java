package classes.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("xValidator")
public class XValidator implements Validator {

    private static int countTrue = 0;
    private static int countFalse = 0;

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
/* Крч, валидация такая:
1) вызываем это всё для каждого флага чекбокса.
2) Сначала считаем количество нажатых и не нажатых флажков.
3)Потом сверяем, у нас три случая-не нажат ни один, нажато больше одного и верный-нажат один.
При первых двух выводим ошибку. При 3 случае, всё окей; */

        if (value.equals(true)) {
            countTrue++;

        } else if (value.equals(false)) {
            countFalse++;
        }
        System.out.println(countTrue + " " + countFalse);
        if ((countTrue == 0) && ((countTrue + countFalse) == 7)) {
            countFalse = 0;
            System.out.println("No X");
            throw new ValidatorException(new FacesMessage("Выберете значение координаты X."));
        } else if ((countTrue + countFalse) == 7){
            countTrue = 0;
            countFalse = 0;
        }

    }
}
