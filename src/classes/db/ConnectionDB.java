package classes.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionDB {
    private Connection connection;
    private String url="jdbc:postgresql://localhost:5432/postgres";
    private String name = "admin";
    private String pass = "ad123";

    public Connection getConnection() {
        try {
            Class.forName("org.postgresql.Driver"); //Подключаем драйвер
            System.out.println("Драйвер загружен!");//Выводим сообщение
            connection = DriverManager.getConnection(url, name, pass);//Устанавливаем соединение
            System.out.println("Соединение успешно установлено! ");//Сообщение о подключении
        } catch (Exception e) {
            System.out.println("Cannot connect to database!");
        }
        return connection;
    }

}
