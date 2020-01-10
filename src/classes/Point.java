package classes;

import java.text.SimpleDateFormat;
import java.util.Date;

import static java.lang.Math.pow;
import static java.lang.Math.sqrt;

public class Point {
    private double x;
    private double y;
    private int R;
    private String time;
    private boolean inArea;
    private String sessionID;

    public Point() {
    }

    Point(double x, double y, int r, String time, boolean inArea, String sessionID) {
        this.x = x;
        this.y = y;
        R = r;
        this.time = time;
        this.inArea = inArea;
        this.sessionID = sessionID;
    }

    Point(double x, double y, int r, Date date, String session) {
        this.x = x;
        this.y = y;
        this.R = r;
        this.sessionID = session;
        SimpleDateFormat formatForDateNow = new SimpleDateFormat("HH:mm:ss");
        this.time = formatForDateNow.format(date);
        this.inArea = checkArea(x, y, r);
    }

    public Point(double x, double y, int r, String time, boolean inArea) {
        this.x = x;
        this.y = y;
        R = r;
        this.time = time;
        this.inArea = inArea;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public int getR() {
        return R;
    }

    public String getTime() {
        return time;
    }

    public boolean isInArea() {
        return inArea;
    }

    public String getSessionID() {
        return sessionID;
    }

    @Override
    public String toString() {
        return "main.Point{";
    }

    private static boolean checkArea(double x, double y, double R) {
        if ((x >= (-R / 2)) && (y >= -R) && (x <= 0) && (y <= (x + R / 2))) {
            return true;
        }
        if ((x >= 0) && (x <= R) && (y >= -sqrt(pow(R, 2) - pow(x, 2))) && (y <= R)) {
            return true;
        }
        return false;
    }
}