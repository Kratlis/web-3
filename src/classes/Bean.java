package classes;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

@ManagedBean(name = "bean")
@SessionScoped
public class Bean {
    //TODO: replace by points
    private int x;
    private boolean x1;
    private boolean x2;
    private boolean x3;
    private boolean x4;
    private boolean x5;
    private boolean x6;
    private boolean x7;
    private double y;
    private boolean r1;
    private boolean r2;
    private boolean r3;
    private boolean r4;
    private boolean r5;

    private double xCanvas;
    private double yCanvas;

    public Bean() {
    }


    //TODO: it must be point not a number; many x
    public void addPoint() {
        x = x1 ? -4 : x2 ? -3 : x3 ? -2 : x4 ? -1 : x5 ? 0 : x6 ? 1 : x7 ? 2 : 100000;
        System.out.println(x);
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void addPointFromCanvas() {

    }

    public boolean isX1() {
        return x1;
    }

    public void setX1(boolean x1) {
        this.x1 = x1;
    }

    public boolean isX2() {
        return x2;
    }

    public void setX2(boolean x2) {
        this.x2 = x2;
    }

    public boolean isX3() {
        return x3;
    }

    public void setX3(boolean x3) {
        this.x3 = x3;
    }

    public boolean isX4() {
        return x4;
    }

    public void setX4(boolean x4) {
        this.x4 = x4;
    }

    public boolean isX5() {
        return x5;
    }

    public void setX5(boolean x5) {
        this.x5 = x5;
    }

    public boolean isX6() {
        return x6;
    }

    public void setX6(boolean x6) {
        this.x6 = x6;
    }

    public boolean isX7() {
        return x7;
    }

    public void setX7(boolean x7) {
        this.x7 = x7;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean isR1() {
        return r1;
    }

    public void setR1(boolean r1) {
        this.r1 = r1;
    }

    public boolean isR2() {
        return r2;
    }

    public void setR2(boolean r2) {
        this.r2 = r2;
    }

    public boolean isR3() {
        return r3;
    }

    public void setR3(boolean r3) {
        this.r3 = r3;
    }

    public boolean isR4() {
        return r4;
    }

    public void setR4(boolean r4) {
        this.r4 = r4;
    }

    public boolean isR5() {
        return r5;
    }

    public void setR5(boolean r5) {
        this.r5 = r5;
    }

    public double getxCanvas() {
        return xCanvas;
    }

    public void setxCanvas(double xCanvas) {
        this.xCanvas = xCanvas;
    }

    public double getyCanvas() {
        return yCanvas;
    }

    public void setyCanvas(double yCanvas) {
        this.yCanvas = yCanvas;
    }
}
