package classes.db;

import classes.Point;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertToDB {
    private Connection connection;

    public InsertToDB(Connection connection) {
        this.connection = connection;
    }

    public void insertPoint(Point point) throws SQLException {
        PreparedStatement stat = connection.prepareStatement(
                "insert into points.(abscissa, ordinate, radius, inarea, time, sessionid) values (?, ?, ?, ?, ?, ?)");
        fillStatement(stat, point);
        stat.executeUpdate();
        stat.close();
    }

    private void fillStatement(PreparedStatement statement, Point point) throws SQLException {
        statement.setDouble(1, point.getX());
        statement.setDouble(2, point.getY());
        statement.setInt(3, point.getR());
        statement.setBoolean(4, point.isInArea());
        statement.setString(5, point.getTime());
        statement.setString(6, point.getSessionID());
    }
}
