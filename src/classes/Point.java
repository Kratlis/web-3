package classes;

import java.text.SimpleDateFormat;
import java.util.Date;

import static java.lang.Math.pow;
import static java.lang.Math.sqrt;

public class Point {
    private double x;
    private double y;
    private double R;
    private String time;
    private boolean isInArea;

    public Point() {
    }

    Point(double x, double y, double r, Date date){
        this.x = x;
        this.y = y;
        this.R = r;
        SimpleDateFormat formatForDateNow = new SimpleDateFormat("HH:mm:ss");
        this.time = formatForDateNow.format(date);
        this.isInArea = checkArea(x, y, r);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return R;
    }

    public String getTime() {
        return time;
    }

    public boolean isInArea() {
        return isInArea;
    }

    @Override
    public String toString() {
        return "main.Point{";
    }

    private static boolean checkArea(double x, double y, double R){
        if ((x >= (-R/2)) && (y >= (-x - R/2)) && (x <= 0) && (y <= 0)){
            return true;
        }
        if ((x >= 0) && (x <= R/2) && (y >= - sqrt(pow((R/2),2) - pow(x, 2)))
                && (y <= R)){
            return true;
        }
        return false;
    }
}