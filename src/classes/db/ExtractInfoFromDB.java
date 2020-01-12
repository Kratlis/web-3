package classes.db;

import classes.Point;

import java.sql.*;
import java.util.LinkedList;

public class ExtractInfoFromDB {
    private Connection connection;

    public ExtractInfoFromDB(Connection connection) {
        this.connection = connection;
    }

    public LinkedList<Point> extractPointsList(String sessionID) throws SQLException {
        LinkedList<Point> list = new LinkedList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select * from points where session_id = ?");
        preparedStatement.setString(1, sessionID);
        ResultSet pointFinder = preparedStatement.executeQuery();
        while (pointFinder.next()) {
            Point point = createPoint(pointFinder);
            list.addFirst(point);
        }
        System.out.println("Points are extracted from db.");
        return list;
    }

    private Point createPoint(ResultSet finder) throws SQLException {
        double x = finder.getDouble("abscissa");
        double y = finder.getDouble("ordinate");
        int r = finder.getInt("radius");
        boolean inArea = finder.getBoolean("in_area");
        String time = finder.getString("time");
        return new Point(x, y, r, time, inArea);
    }
}