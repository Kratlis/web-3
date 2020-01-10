package classes;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import java.util.Date;

@ManagedBean
public class CanvasBean {

    @ManagedProperty(value = "#{bean}")
    private Bean bean;
    private double x;
    private double y;

    public CanvasBean() {
    }

    public void addPoint(){
        int r = bean.getR();
        bean.getPoints().addFirst(new Point(x, y, r, new Date()));
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
}
