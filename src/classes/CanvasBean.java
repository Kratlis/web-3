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

    private LinkedList<Point> points = new LinkedList<>();

    public CanvasBean() {
    }

    public void addPointFromCanvas() {
        Map<String, String> params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();

        double x = Double.parseDouble(params.get("x"));
        double y = Double.parseDouble(params.get("y"));
        int r = Integer.parseInt(params.get("r"));

        try {
            addPoint(x, y, r);
        } catch (SQLException e) {
            System.out.println("Ошибка при записи в БД.");
        }
    }

    public void addPoint(double x, double y, int r) throws SQLException {
        Point point = new Point(x, y, r, new Date());
        manager.insertPointToDB(point);
        points = manager.extractPointsFromDB();
//        bean.setPoints(points);
    }

    // Getters & Setters
    public ManagerDB getManager() {
        return manager;
    }

    public void setManager(ManagerDB manager) {
        this.manager = manager;
    }

    public LinkedList<Point> getPoints() {
        return points;
    }

    public void setPoints(LinkedList<Point> points) {
        this.points = points;
    }
}
