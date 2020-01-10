package classes;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import java.util.Date;

@ManagedBean
public class CanvasBean {

    @ManagedProperty(value = "#{bean}")
    private Bean bean;
    private double x;
    private double y;

    public CanvasBean() {
    }

    public void addPoint() {
        int r = bean.getR();
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        String sessionId = session.getId();
        bean.getPoints().addFirst(new Point(x, y, r, new Date(), sessionId));
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public Bean getBean() {
        return bean;
    }

    public void setBean(Bean bean) {
        this.bean = bean;
    }
}
