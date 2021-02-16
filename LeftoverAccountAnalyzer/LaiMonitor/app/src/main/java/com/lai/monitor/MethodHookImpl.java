package com.lai.monitor;

import android.os.Process;

import com.lai.monitor.utils.Logger;
import com.lai.monitor.utils.MethodApiType;

import de.robv.android.xposed.XC_MethodHook;


public class MethodHookImpl extends XC_MethodHook {
	
	private String mClassName;
	private String mMethodName;
	private MethodApiType mType;
	private boolean mThisObject=false;

	public MethodHookImpl(String className, String methodName, boolean thisObject, MethodApiType type){
		mClassName = className;
		mMethodName = methodName;
		mThisObject=thisObject;
		mType=type;
	}

	public String getClassName(){
		return mClassName;
	}

	public String getMethodName(){
		return mMethodName;
	}

	@Override
	protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
		
	}

	@Override
	protected void afterHookedMethod(MethodHookParam param) throws Throwable {
		if (!param.hasThrowable())
			try {
				if (Process.myUid() <= 0)
					return;
				String message;
				if(param.args == null) {
					message = String.format("Hook Method: %s, %s, %s",
							param.method.getName(), param.method.getDeclaringClass().getName(), param.args);
				}else {
					if (param.args.length == 1) {
						message = String.format("Hook Method: %s, %s, %s",
								param.method.getName(), param.method.getDeclaringClass().getName(), param.args[0]);
					} else if (param.args.length == 2) {
						message = String.format("Hook Method: %s, %s, %s, %s",
								param.method.getName(), param.method.getDeclaringClass().getName(), param.args[0], param.args[1]);
					} else if (param.args.length == 3) {
						message = String.format("Hook Method: %s, %s, %s, %s, %s",
								param.method.getName(), param.method.getDeclaringClass().getName(), param.args[0], param.args[1], param.args[2]);
					} else if (param.args.length == 4) {
						message = String.format("Hook Method: %s, %s, %s, %s, %s, %s",
								param.method.getName(), param.method.getDeclaringClass().getName(), param.args[0], param.args[1], param.args[2], param.args[3]);
					} else if (param.args.length == 5) {
						message = String.format("Hook Method: %s, %s, %s, %s, %s, %s, %s",
								param.method.getName(), param.method.getDeclaringClass().getName(), param.args[0], param.args[1], param.args[2], param.args[3], param.args[4]);
					} else {
						message = String.format("Hook Method: %s, %s, %s",
								param.method.getName(), param.method.getDeclaringClass().getName(), param.args);
					}
				}
				Logger.logShell(message);

				//if (MonitorModule.TRACE)
				//	traceMethod(param);
				//else
				//	monitorMethod(param);
				
			} catch (Throwable ex) {
				throw ex;
			}
	}
	
	public void monitorMethod(MethodHookParam param)
	{
		try {
			if(param.method.getName().contains("invoke"))
				Logger.logReflectionMethod(param,mThisObject,mType);
			else if(param.method.getName().contains("write"))
				Logger.logProcessWriteMethod(param,mThisObject,mType);
			else if(param.method.getName().contains("read"))
				Logger.logProcessReadMethod(param,mThisObject,mType);
			else if(param.method.getName().contains("openDexFile") || param.method.getName().equals("load"))
				Logger.logAndDumpFile(param,mThisObject,mType);
			else
				Logger.logGenericMethod(param,mThisObject,mType);
		} catch (Exception e) {
			Logger.logError(param.method.getDeclaringClass().getName()+"->"+param.method.getName());
		}
	}
	
	public void traceMethod(MethodHookParam param)
	{
		try {
			if(param.method.getName().contains("invoke"))
				Logger.logTraceReflectionMethod(param,mType);
			else
				Logger.logTraceMethod(param,mType);
		} catch (Exception e) {
			Logger.logError( param.method.getDeclaringClass().getName()+"->"+param.method.getName());
		}
	}
}
