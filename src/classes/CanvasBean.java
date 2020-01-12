package classes;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.context.FacesContext;
import java.sql.SQLException;
import java.util.Date;
import java.util.LinkedList;
import java.util.Map;

@ManagedBean
public class CanvasBean {


    @ManagedProperty(value = "#{manager}")
    private ManagerDB manager;

    @ManagedProperty("#{bean}")
    private Bean bean;

    double x;
    double y;
    int r;

    private LinkedList<Point> points = new LinkedList<>();

    public CanvasBean() {
    }

    public void addPointFromCanvas() {
        Map<String, String> params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();

        setX(Double.parseDouble(params.get("x")));
        setY( Double.parseDouble(params.get("y")));
        setR(Integer.parseInt(params.get("r")));

        try {
            addPoint(x, y, r);
        } catch (SQLException e) {
            System.out.println("Ошибка при записи в БД.");
        }
    }

    public void setX(double x){
        this.x = x;
    }
    public void setY(double y){
        this.y = y;
    }
    public void setR(int r){
        this.r = r;
    }
    public double getX(){
        return x;
    }
    public double getY(){
        return y;
    }
    public int getR(){
        return r;
    }

    public void addPoint(double x, double y, int r) throws SQLException {
        Point point = new Point(x, y, r, new Date());
        manager.insertPointToDB(point);
        points = manager.extractPointsFromDB();
        bean.setPoints(points);
    }

    // Getters & Setters
    public ManagerDB getManager() {
        return manager;
    }

    public void setManager(ManagerDB manager) {
        this.manager = manager;
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
