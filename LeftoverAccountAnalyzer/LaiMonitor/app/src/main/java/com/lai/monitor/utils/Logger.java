package com.lai.monitor.utils;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import de.robv.android.xposed.XC_MethodHook.MethodHookParam;
import de.robv.android.xposed.XposedBridge;

public class Logger {
	public static final Gson gson = new Gson();
	public static String LOGTAG= "Laimon-";
	public static String LOGTAG_WORKFLOW = "Laimon-apimonitor-";
	public static String LOGTAG_ERROR = "Laimon-error";
	public static String PACKAGENAME;
	
	public static void logHook(JSONObject hookData){
		XposedBridge.log(LOGTAG_WORKFLOW+PACKAGENAME+":"+hookData.toString());
		//log(LOGTAG_WORKFLOW+PACKAGENAME+":"+hookData.toString());
	}

	public static void logShell(String message){
		XposedBridge.log(LOGTAG+PACKAGENAME+":"+message);
		//log(LOGTAG_SHELL+PACKAGENAME+":"+message);
	}

	public static void logError(String message){
		XposedBridge.log(LOGTAG_ERROR+":"+message);
		//log(LOGTAG_ERROR+":"+message);
	}
	
	public static void logProcessWriteMethod(MethodHookParam param, boolean mThisObject, MethodApiType mType) throws JSONException {
		if(param.thisObject == null)
			return;
		if(param.thisObject.getClass().toString().contains("ProcessOutputStream"))
		{
			JSONObject hookData=ParseGenerator.generateHookDataJson(param,mType);
			hookData.put("buffer", new String((byte[])param.args[0],(Integer)param.args[1],(Integer)param.args[2]).trim());
			Logger.logHook(hookData);
		}
		
	}
	
	public static void logProcessReadMethod(MethodHookParam param, boolean mThisObject, MethodApiType mType) throws JSONException {
		if(param.thisObject == null)
			return;
		if(param.thisObject.getClass().toString().contains("ProcessInputStream"))
		{
			JSONObject hookData=ParseGenerator.generateHookDataJson(param,mType);
			hookData.put("buffer", new String((byte[])param.args[0],(Integer)param.args[1],(Integer)param.args[2]).trim());
			Logger.logHook(hookData);
		}
		
	}
	
	public static void logGenericMethod(MethodHookParam param, boolean mThisObject, MethodApiType mType) throws JSONException {
		JSONObject hookJson = ParseGenerator.generateHookDataJson(param,mType);
		
		if(param.args!=null)
			hookJson.put("args", ParseGenerator.parseArgs(param,hookJson));
		if(param.getResult()!=null)
			hookJson.put("result", ParseGenerator.parseResults(param,hookJson));
		if(param.thisObject!=null && mThisObject)
			hookJson.put("this",ParseGenerator.parseThis(param,hookJson));
		
		Logger.logHook(hookJson);
		
	}
	
	public static void logReflectionMethod(MethodHookParam param, boolean mThisObject, MethodApiType mType) throws JSONException {
		JSONObject hookJson = ParseGenerator.generateHookDataJson(param,mType);
		
		hookJson.put("hooked_class", ParseGenerator.parseRefelctionClassName(param, hookJson));
		hookJson.put("hooked_method", ParseGenerator.parseRefelctionMethodName(param, hookJson));
		if(param.args!=null)
			hookJson.put("args", ParseGenerator.parseRefelctionArgs(param,hookJson));
		if(param.getResult()!=null)
			hookJson.put("result", ParseGenerator.parseResults(param,hookJson));
		
		Logger.logHook(hookJson);
	}
	
	public static void logTraceReflectionMethod(MethodHookParam param, MethodApiType mType) throws JSONException {
		JSONObject hookJson = ParseGenerator.generateHookDataJson(param,mType);
		
		hookJson.put("hooked_method", ParseGenerator.parseRefelctionMethodName(param, hookJson));
		hookJson.put("hooked_class", ParseGenerator.parseRefelctionClassName(param, hookJson));
		
		Logger.logHook(hookJson);
		
	}
	
	public static void logTraceMethod(MethodHookParam param, MethodApiType mType) throws JSONException {
		Logger.logHook(ParseGenerator.generateHookDataJson(param,mType));
	}

	public static void logAndDumpFile(MethodHookParam param, boolean mThisObject, MethodApiType mType) throws JSONException, IOException {
		JSONObject hookJson = ParseGenerator.generateHookDataJson(param,mType);
		
		String outDir = "";
		String dexPath = (String) param.args[0];
		hookJson.put("orig", dexPath);
        
		//Ignore loading of files from /system or /data/app
        if (dexPath.startsWith("/system/") || dexPath.startsWith("/data/app") )
        {
        	hookJson.put("dump", false);
        	hookJson.put("path", dexPath);
        }
        else
        {
        	hookJson.put("dump", true);
            String uniq = UUID.randomUUID().toString();
            //outDir = outDir + "/" + PACKAGENAME  + dexPath.replace("/", "_") + "-" + uniq;
            outDir = dexPath + "_" + uniq+".DROPPED_FILE";

            InputStream in = new FileInputStream(dexPath);
            OutputStream out = new FileOutputStream(outDir);
            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            in.close();
            out.close();
			
            hookJson.put("path", outDir);
        }
        
		Logger.logHook(hookJson);
	}
}
