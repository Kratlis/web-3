package classes;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import java.sql.SQLException;
import java.util.Date;
import java.util.LinkedList;

@ManagedBean
public class CanvasBean {

    @ManagedProperty(value = "#{bean}")
    private Bean bean;

    @ManagedProperty(value = "#{manager}")
    private ManagerDB manager;

    private LinkedList<Point> points = new LinkedList<>();

    private double x;
    private double y;

    public CanvasBean() {
    }

    public void addPoint() throws SQLException {
        int r = bean.getR();
        Point point = new Point(x, y, r, new Date());
        manager.insertPointToDB(point);
        points = manager.extractPointsFromDB();
    }

    // Getters & Setters
    public ManagerDB getManager() {
        return manager;
    }

    public void setManager(ManagerDB manager) {
        this.manager = manager;
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

    public LinkedList<Point> getPoints() {
        return points;
    }

    public void setPoints(LinkedList<Point> points) {
        this.points = points;
    }
}
