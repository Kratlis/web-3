package classes.db;

import classes.Point;

import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedList;

public class ConnectionDB {
    private Connection connection;
    private String url = "jdbc:postgresql://localhost:5436/lab3";
    private String name = "postgres";
    private String pass = "123456";

    public ConnectionDB() {
        try {
            connect();
            System.out.println("Database connection successfully established.");//Сообщение о подключении
        } catch (Exception e) {
            System.out.println("Cannot connect to database.");
        }
    }

    public void connect() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver"); //Подключаем драйвер
        System.out.println("Driver loaded!");//Выводим сообщение
        connection = DriverManager.getConnection(url, name, pass);//Устанавливаем соединение
    }

    public Connection getConnection() {
        return connection;
    }
}
