package com.ttknpdev.understandjwth2databasehelloworld.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Logging {
    public Logger logBack;
    public Logging(Class<?> c) {
        logBack = LoggerFactory.getLogger(c);
    }
}
