package com.simple.community.commons;

import java.nio.charset.StandardCharsets;
import com.google.common.hash.Hashing;

public class ShaUtil {
	public static String sha256Encode(String plainText) {
		
	    return Hashing.sha256()
	        .hashString(plainText, StandardCharsets.UTF_8)
	        .toString();
	  }
}
