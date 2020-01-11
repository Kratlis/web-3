package classes;

import classes.db.ConnectionDB;
import classes.db.ExtractInfoFromDB;
import classes.db.InsertToDB;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.LinkedList;


@ManagedBean(name = "manager", eager = true)
@SessionScoped
public class ManagerDB {
    private ConnectionDB dbConnection;
    private String sessionId;

    public ManagerDB() {
        dbConnection = new ConnectionDB();
        FacesContext fCtx = FacesContext.getCurrentInstance();
        // boolean attribute determines whether to create a session if it was not
        sessionId = fCtx.getExternalContext().getSessionId(false);
    }

    public void insertPointToDB(Point point) throws SQLException {
        InsertToDB writer = new InsertToDB(dbConnection.getConnection());
        point.setSessionID(sessionId);
        writer.insertPoint(point);
    }

    public void insertPointsToDB(LinkedList<Point> list) throws SQLException {
        InsertToDB writer = new InsertToDB(dbConnection.getConnection());
        for (Point point : list) {
            point.setSessionID(sessionId);
            writer.insertPoint(point);
        }
    }

    public LinkedList<Point> extractPointsFromDB() throws SQLException {

        ExtractInfoFromDB reader = new ExtractInfoFromDB(dbConnection.getConnection());
        return reader.extractPointsList(sessionId);
    }
}
