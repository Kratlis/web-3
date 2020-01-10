package classes;

import classes.db.ConnectionDB;
import classes.db.ExtractInfoFromDB;
import classes.db.InsertToDB;

import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.LinkedList;


@ManagedBean(name = "manager", eager = true)
public class ManagerDB {
    private ConnectionDB dbConnection = null;

    public ManagerDB() {
        dbConnection = new ConnectionDB();
    }

    public void insertPointsToDB(LinkedList<Point> list) throws SQLException {
        InsertToDB writer = new InsertToDB(dbConnection.getConnection());
        for (Point point : list) {
            writer.insertPoint(point);
        }
    }

    public LinkedList<Point> extractPointsFromDB() throws SQLException {
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        String sessionId = session.getId();

        ExtractInfoFromDB reader = new ExtractInfoFromDB(dbConnection.getConnection());
        return reader.extractPointsList(sessionId);
    }
}
