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
            Class.forName("org.postgresql.Driver"); //Подключаем драйвер
            System.out.println("Драйвер загружен!");//Выводим сообщение
            connection = DriverManager.getConnection(url, name, pass);//Устанавливаем соединение
            System.out.println("Соединение успешно установлено! ");//Сообщение о подключении
        } catch (Exception e) {
            System.out.println("Cannot connect to database!");
        }
    }

    public Connection getConnection() {
        return connection;
    }
}
