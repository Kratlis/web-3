package classes.db;

import classes.Point;

import java.sql.*;
import java.util.LinkedList;

public class ExtractInfoFromDB {
    private Connection connection;

    public ExtractInfoFromDB(Connection connection) {
        this.connection = connection;
    }

    LinkedList<Point> extractPointsList(String sessionID) throws SQLException {
        LinkedList<Point> list = new LinkedList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select * from points where session_id = ?");
        preparedStatement.setString(1, sessionID);
        ResultSet pointFinder = preparedStatement.executeQuery();
        while (pointFinder.next()) {
            double x = pointFinder.getDouble("abscissa");
            double y = pointFinder.getDouble("ordinate");
            int r = pointFinder.getInt("radius");
            boolean inArea = pointFinder.getBoolean("in_area");
            String time = pointFinder.getString("time");
            Point point = new Point(x, y, r, time, inArea);
            list.addFirst(point);
        }
        System.out.println("List is ready");
        return list;
    }
}