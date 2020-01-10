package classes;

import javax.faces.bean.ManagedBean;

@ManagedBean
public class CanvasBean {

    private double x;
    private double y;

    public CanvasBean() {
    }

    public void addPoint(){

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
