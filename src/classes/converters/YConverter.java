package classes.converters;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;
import javax.faces.convert.FacesConverter;

@FacesConverter("yConverter")
public class YConverter implements Converter {

    @Override
    public Object getAsObject(FacesContext facesContext, UIComponent uiComponent, String value) {

        if (value == null || value.equals("")){
            System.out.println("Here: NULL");
            throw new ConverterException(new FacesMessage("Введите координату Y."));
        }

        try {
            return new Double(value.trim().replace(",", "."));
        } catch (NumberFormatException ex) {
            throw new ConverterException(new FacesMessage("Координата Y должна быть числом."));
        }
    }

    @Override
    public String getAsString(FacesContext facesContext, UIComponent uiComponent, Object value) {
        return value.toString();
    }
}
