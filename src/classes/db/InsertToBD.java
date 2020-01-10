package classes.db;

import classes.Bean;
import classes.Point;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertToBD {
    private PreparedStatement addStatement;
    public void addEntry(Point point) throws SQLException {
        fillStatement(addStatement, point);
        addStatement.execute();
    }

    private void fillStatement(PreparedStatement statement, Point point) throws SQLException {
        double x = point.getX();
        double y = point.getY();
        //double r = point.getR();
        //boolean hit = point.isInArea();

        statement.setDouble(0, x);
        statement.setDouble(1, y);
       // statement.setDouble(2, r);
       // statement.setBoolean(3, hit);
    }
}
