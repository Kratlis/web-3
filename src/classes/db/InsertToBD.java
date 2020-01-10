package classes.db;

import classes.Bean;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertToBD {
    private PreparedStatement addStatement;
    public void addEntry(Bean bean) throws SQLException {
        fillStatement(addStatement, bean);
        addStatement.execute();
    }

    private void fillStatement(PreparedStatement statement, Bean bean) throws SQLException {
        double x = bean.getX();
        double y = bean.getY();
        //double r = bean.getR();
        //boolean hit = bean.isInArea();

        statement.setDouble(0, x);
        statement.setDouble(1, y);
       // statement.setDouble(2, r);
       // statement.setBoolean(3, hit);
    }
}
