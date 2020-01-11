package classes;

import classes.db.ConnectionDB;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import java.sql.SQLException;
import java.util.Date;
import java.util.LinkedList;

@ManagedBean
@RequestScoped
public class Bean {

    @ManagedProperty(value = "#{manager}")
    private ManagerDB manager;

    private LinkedList<Point> points = new LinkedList<>();
    private boolean x1 = false;
    private boolean x2 = false;
    private boolean x3 = false;
    private boolean x4 = false;
    private boolean x5 = false;
    private boolean x6 = false;
    private boolean x7 = false;
    private Double y;
    private int r;
    private boolean r1 = false;
    private boolean r2 = false;
    private boolean r3 = false;
    private boolean r4 = false;
    private boolean r5 = false;

    public Bean() {
    }

    public void executeForm() throws SQLException {
        defineR();
        fillPointsList();
        manager.insertPointsToDB(points);
        points = manager.extractPointsFromDB();
    }

    private void fillPointsList() {
        if (x1) {
            points.addFirst(new Point(-4, y, r, new Date()));
        }
        if (x2) {
            points.addFirst(new Point(-3, y, r, new Date()));
        }
        if (x3) {
            points.addFirst(new Point(-2, y, r, new Date()));
        }
        if (x4) {
            points.addFirst(new Point(-1, y, r, new Date()));
        }
        if (x5) {
            points.addFirst(new Point(0, y, r, new Date()));
        }
        if (x6) {
            points.addFirst(new Point(1, y, r, new Date()));
        }
        if (x6) {
            points.addFirst(new Point(2, y, r, new Date()));
        }
    }

    private void defineR() {
        r = r1 ? 1 : r2 ? 2 : r3 ? 3 : r4 ? 4 : 5;
    }

    // Getters & Setters
    public LinkedList<Point> getPoints() {
        return points;
    }

    public void setPoints(LinkedList<Point> points) {
        this.points = points;
    }

    public ManagerDB getManager() {
        return manager;
    }

    public void setManager(ManagerDB manager) {
        this.manager = manager;
    }

    // X selectBooleanCheckbox getters&setters
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

    //Y getter&setter
    public Double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    //R selectBooleanCheckbox getters&setters
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
}
