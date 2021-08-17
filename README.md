

I - Pre-requisites for setting up a programing environment

1) A laptop with Mac OS High Sierra or higher:
	- Install Appium (http://appium.io/)
	- Install Anaconda Python 2.7 (https://www.anaconda.com/distribution/)
	- Install Android Studio (https://developer.android.com/studio)
	- Install Appium Python Client (https://github.com/appium/python-client)
	- Install Selenium (https://selenium-python.readthedocs.io/installation.html)
	- Install Chrome Driver (https://sites.google.com/a/chromium.org/chromedriver/downloads)
	- Install Iterm2 terminal (https://iterm2.com/)
	- Install Homebrew (https://brew.sh/)
	- Install Microsoft Office (https://www.office.com)
	- Install Text Editor (e.g., vim, emacs, vscode, sublime, notepad, etc.)
	- Install Chrome web browser (https://www.google.com/chrome/)
	- Install Latex (http://www.tug.org/mactex/)
	- Install FileZilla (https://filezilla-project.org/)
	- Install Eclipse IDE (https://projects.eclipse.org/releases/kepler)
	- Install ipdb (https://pypi.org/project/ipdb/)
	- Install sshpass (https://gist.github.com/arunoda/7790979)
	- Install pyautogui (https://pyautogui.readthedocs.io/en/latest/)
	- Install Cisco Anyconnect client (https://www.wichita.edu/services/its/userservices/documents/Remote_Desktop_Instructions.pdf)
	- Install Screaming Frog (https://www.screamingfrog.co.uk/seo-spider/)
	- Install lxml (https://lxml.de/parsing.html)

2) A server with Ubuntu 16.04:
	- Install Anaconda Python 2.7 (https://www.anaconda.com/distribution/)
	- Install Apktool (https://ibotpeaches.github.io/Apktool/install/)
	- Install tesseract (https://github.com/tesseract-ocr/tesseract/wiki)
	- Install graphviz (https://www.howtoinstall.co/en/ubuntu/xenial/graphviz)
	- Install openssh server (https://help.ubuntu.com/lts/serverguide/openssh-server.html)
	- Install html2text (http://manpages.ubuntu.com/manpages/trusty/man1/html2text.1.html)
	- Install Text Editor (e.g., vim, emacs, vscode, sublime, notepad, etc.)
	- Install ipdb (https://pypi.org/project/ipdb/)
	- Install Apache webserver (https://httpd.apache.org/)
	- Install httrack (https://www.httrack.com/)

3) A mobile phone with Android OS 6.0:
	- Make sure to turn on Developer Mode
	- Have a Google Play Store account with gmail and password

Notes:





	- Make sure Bash version is at least 4.0
	
	- Make sure the following GNU commands are available from the Bash command prompt: 
	   find, grep, awk, sed, dos2unix, dot, curl, wget, adb, aapt, scp, apktool, split, sshpass, tesseract, html2text, uiautomatorviewer…
	- Any text editor is sufficient to develop in Bash and Python
	
	- Eclipse IDE (Keepler) is preferred if developing in Java with Soot framework
	
	- gcc and GNU build system are preferred if developing in C
	
	- Software version control (e.g., git, svn) is highly recommended for serious programmers
	
	- Openssh is recommended if working in a team of at least 2 people
	
	- Database management system can be used but not required
	
	- Graphical softwares (e.g., Adobe products) can be used but not required
	
	- Latex is recommended for serious programers
	
	- FileZilla can be used but not required
	
	- Server secondary-storage should be large if running with thousands of apks
	
	- Apache webserver can be replaced with a more light-weight webserver
	
	- alias server='python -m SimpleHTTPServer' is a very useful snippet for launching a builtin python webserver
	
	- Cisco Anyconnect client can be used for remote access from home to school if necessary
	
	- Screaming Frog and httrack can be used but not required
	
	- lxml can be used but not required



II – Project structure
	
	The project consists of the following packages:

	LeftoverAccountAnalyzer/lai
		contains all the tools for automated testing android apps via appium
		
	LeftoverAccountAnalyzer/lai_web
		contains all the tools for automated testing websites via selenium
		
	AccountDeletionAnalyzer/analyzer
		contains all the tools related to account deletion functionality for android apps
		
	AccountDeletionAnalyzer/analyzer_web
		contains all the tools related to account deletion functionality for the web
		
	AccountDeletionAnalyzer/analyzer_combiner
		contains all the tools which combine results from the two packages analyzer and analyzer_web
		
	RetentionPeriodAnalyzer/pystatparser or AccountDeletionAnalyzer/pystatparser
		contains a parser for natural language processing
		
	AccountDeletionAnalyzer/nlp
		contains all the tools which use pystatparser for analyzing the semantics in natural language processing
		
	AccountDeletionAnalyzer/duc
		contains all the tools to be used with Soot framework


III – Notations
	
	./		run an executable bash script
	<  >		some user input
	[ X | Y ]	choose either X or Y
	Z		software tool Z is developed or customized in-house
	___		optional
	
	
IV - Software tools and usages	

				apkdl.sh
	
|**Synopsis**	|./apkdl.sh							|
|:--------------|:-------------- 						|
|**Description**| scrape all the android package names from a website		|								|
|**Options**	|the input website is already hardcoded as apk-dl.com		|
|		| the script will return a list of android package names
|**Dependencies**|curl								|
|		|awk	
|**Packages**	|lai_web							|
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129245423-43c2be09-904b-4230-9fd5-1558a27a0ba6.png)
								



				apk2web.sh:
	
|**Synopsis**	|**./apk2web.sh \<apkfile\>**							
|:--------------|:-------------- 						
|**Description**| find the equivalent website address for an apk file by looking into the manifest		
|**Options**	|\<apkfile\> 
|               |&nbsp;&nbsp;&nbsp;&nbsp;an apk file 
|               |&nbsp;&nbsp;&nbsp;&nbsp;given an apk file, the script will return the equivalent website address 
|**Dependencies**|aapt					
|		|dos2unix
|		|grep
|**Packages**   |lai_web								
|		|	
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129247712-19fa98e7-659f-4151-9fb1-23c1f84bf347.png)
							

							apk2url.sh:
	
	
	
|**Synopsis**	|**./apk2url.sh \<packagelist\> auto**							
|:--------------|:-------------- 						
|**Description**| find the equivalent website address for for a list of android package names via google		
|**Options**	|\<packagelist\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;a text file containing android package names
|		|the auto flag is optional:
|               |&nbsp;&nbsp;&nbsp;&nbsp;if present, the script will automatically pick the first website address from google candidate search results		
|               |&nbsp;&nbsp;&nbsp;&nbsp;if not present, the script will let testers pick a website manually from the google candidate search results		
|**Dependencies**|url.py					
|**Packages**   |lai_web									
|		|	
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129269450-1bae1183-f101-4d18-b716-e80b1ea36bd6.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129270158-b7cd68c3-1a1f-46dc-8a5f-48b6cee3e966.png)|



							auto.sh:


|**Synopsis**	|**./auto.sh \[\<apklist-directory\>\<server-username\> \<server-password\> \<wait\-time\-in\-secs\> collect  \| \<apkdir\> apk2web \]**
|:--------------|-------------- 						
|**Description**| an automatic script to collect apks and websites without any manual intervention								
|**Options**	|collect 
|          	|&nbsp;&nbsp;&nbsp;&nbsp;automatically go to google play store, download apks, and upload them to a dedicated server
|          	|&nbsp;&nbsp;&nbsp;&nbsp;\<apklist\-directory\> 
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains files whose contents are android package names
|          	|&nbsp;&nbsp;&nbsp;&nbsp;\<server\-username\> 
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ssh username
|          	|&nbsp;&nbsp;&nbsp;&nbsp;\<server\-password\> 
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ssh password
|          	|&nbsp;&nbsp;&nbsp;&nbsp;\<wait\-time\-in\-secs\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time to wait between each batch of apk files finish uploading to the server
|		|apk2web
|          	|&nbsp;&nbsp;&nbsp;&nbsp;automatically find equivalent websites from a directory containing all apk files pulled from the mobile phone 
|		|\<apkdir\>	
|		|&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains all apk files pulled from the android mobile phone
**Dependencies**|lac_batch.sh 
|		|upload.sh
|		|apk2web.sh						
|**Packages**	|lai_web										
|**Notes**	|Appium is required to run the script
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129371484-132d33b4-8e09-4295-9e8f-1b9f09d8271a.png)
|		|![image](https://user-images.githubusercontent.com/84356922/129457194-5a75fc5c-fda1-4f2f-8823-8a556f8452ee.png)

	
	
							batch.sh:
	
	
|**Synopsis**	|**./batch.sh \<apk\-directory\> [ install \| uninstall \| remove \| signup \| login \| delete \| manual ]**			
|:--------------|:-------------- 						
|**Description**| a tool for testers to work with a directory containing apk files (working in batch mode)							
|**Options**	|\<apk-directory\> 	
|		|&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains apk files
|		|Choose one of the following options:
|          	|&nbsp;&nbsp;&nbsp;&nbsp;install
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;install all the apk files in the directory on the android mobile phone
|          	|&nbsp;&nbsp;&nbsp;&nbsp;uninstall
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uninstall all the apk files in the directory from the android mobile phone
|          	|&nbsp;&nbsp;&nbsp;&nbsp;remove
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remove the \<apk\-directory\> and all the output directories \_out and error directories \_err,  ready for next batch signup
|          	|&nbsp;&nbsp;&nbsp;&nbsp;signup
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically signup a user account for each of the apk file in \<apk-directory\>
|          	|&nbsp;&nbsp;&nbsp;&nbsp;login
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically login the user account for each of the apk file in \<apk-directory\>
|          	|&nbsp;&nbsp;&nbsp;&nbsp;delete
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically delete the user account for each of the apk file in \<apk-directory\>
|          	|&nbsp;&nbsp;&nbsp;&nbsp;manual
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;manual intervention from testers, break into ipdb console and finish any of the options above
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Testers can also use function dump\_text builtin the tool to do screen scraping on the android phone		
|**Dependencies**|adb
|		|aapt
|		|grep
|		|manual.py
|		|delete.py
|		|login.py
|		|signup.py
|**Packages**	|lai										
|		|lai_web
|**Notes**	|Appium is required to run the script	
|		|Depending on the chosen option, the tool will save log files into _out and _err directories, from which statistical analysis can be performed
|		|	
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129371636-c6f40773-5d93-4bf8-8361-adc093df83ff.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129371735-03612142-8ca7-4097-b8aa-3a81bde55fd4.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129371810-1d785c9b-8a87-4776-ba2f-7eba097da5e1.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129371883-6114ed53-bd8d-42ab-bba2-1d1cd00ea7b4.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129371941-7766664d-5a7f-4191-8989-30838288f396.png)|


							single.sh:
	
	
|**Synopsis**	|**./single.sh \<apkfile\> [ download \| signup \| install \| uninstall \| login \| delete \| launch \| search \| manual ]**	
|:--------------|:-------------- 						
|**Description**| a tool for testers to work with one single apk file												
|**Options**	|\<apkfile\> 	
|		|&nbsp;&nbsp;&nbsp;&nbsp;an apk file
|		|
|		|Choose one of the following options:
|          	|&nbsp;&nbsp;&nbsp;&nbsp;download
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;download the \<apkfile\> from the server
|		|&nbsp;&nbsp;&nbsp;&nbsp;signup
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically signup a user account for each of the apk file in \<apkfile\>	
|          	|&nbsp;&nbsp;&nbsp;&nbsp;install
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;install the \<apkfile\> from the android mobile phone
|		|&nbsp;&nbsp;&nbsp;&nbsp;uninstall
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uninstall the \<apkfile\> from the android mobile phone
|          	|&nbsp;&nbsp;&nbsp;&nbsp;login
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically login the user account of the \<apkfile\>
|          	|&nbsp;&nbsp;&nbsp;&nbsp;delete
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically delete the user account of the \<apkfile\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;launch
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;launch the \<apkfile\> and fire random events with monkey tool
|      		|&nbsp;&nbsp;&nbsp;&nbsp;search
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Automatically search apk file for a given android package name by automating google web browser
|          	|&nbsp;&nbsp;&nbsp;&nbsp;manual
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manual intervention from testers, break into ipdb console and finish any of the options above
|**Dependencies**|adb						
|		|monkey
|		|scp
|		|signup.py	
|		|manual.py
|		|delete.py	
|		|login.py
|**Packages**	|lai
|		|lai_web	
|**Notes**	|Appium is required to run the script	
|		|This script is similar to batch.sh except it works on only 1 apk file at a time, can be used in tandem with batch.sh
|		|It also provides some extra commands not in batch.sh
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129373542-31a7ba77-a5f4-410f-893f-20645962c8cc.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129373599-e7a0cbbe-e82f-45e6-b35d-9f618ef2af7f.png)|
		
						pm.sh:
	
	
|**Synopsis**	|**./pm.sh [ pull \| uninstall \| list \| count \| \<package\-file\> search \| <package-name\> pull ]**		
|:--------------|:-------------- 						
|**Description**|a package manager tool to help testers manage android packages efficiently									
|**Options**	|pull
|              	|&nbsp;&nbsp;&nbsp;&nbsp;pull all non-system packages from the android phone to your laptop
|		|uninstall
|               |&nbsp;&nbsp;&nbsp;&nbsp;uninstall all non-system packages currently residing in the android phone
|		|list
|		|&nbsp;&nbsp;&nbsp;&nbsp;list all non-system packages in the android phone
|		|count
|               |&nbsp;&nbsp;&nbsp;&nbsp;count the number of packages after pulling
|		|search
|               |&nbsp;&nbsp;&nbsp;&nbsp;automatically search for android packages via google browser in the phone
|               |&nbsp;&nbsp;&nbsp;&nbsp;\<package\-file\> 
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a text file which contain android packages
|		|pull
|             	|&nbsp;&nbsp;&nbsp;&nbsp;pull a specific package from the android phone to your laptop
|               |&nbsp;&nbsp;&nbsp;&nbsp;\<package\-name\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;an android package
|**Dependencies**|dos2unix						
|		|sed
|		|cut
|		|adb
|**Packages**	|lai								
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129373659-46741c18-90c8-4e2e-83b5-3d6ff4998080.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129373708-60936214-984d-402f-a30c-969ebbd8f4d0.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129373744-344dd800-47b5-46d0-8983-f72a5a5429ab.png)|


						minus_operation.sh:

|**Synopsis**	|**./minus_operation.sh \<gmail\> \<gpassword\>**								
|:--------------|:-------------- 						
|**Description**|auto login google play store website (My apps page) and calculate the difference between all the android packages listed there versus all the android packages listed in the mobile phone						
|		|								
|**Options**	|\<gmail\>
|            	|&nbsp;&nbsp;&nbsp;&nbsp;google email address to login play store
|		|\<gpassword\>
|             	|&nbsp;&nbsp;&nbsp;&nbsp;google password to login play store		
|**Dependencies**|my_apps.py				
|		|awk
|		|dos2unix	
|**Packages**	|lai_web	
|**Notes**	|A compatible chromedriver is required for using with Chrome web browser
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129373821-88269777-4dc1-4e97-bcc6-2ef238206a5c.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129373872-88a85d42-68cc-4ff7-aa4c-d4a134404e0e.png)|
		

							lac_batch.sh:
	
	
|**Synopsis**	|./lac_batch.sh [  \<gmail\> \<gpassword\>  minus \| \<./minus\/laXX\> install \| \<package\-name\> \<app\-email\> \<app\-password\> clean \| pull \| uninstall \| \<./minus\/laXX\> remove ]
|:--------------|:-------------- 						
|**Description**|When users uninstall apps on their android phones, they may have forgotten to delete their user accounts for those apps,the script can help to   automatically cleanup those accounts, it also other functions to manage apk files	
|**Options**	|minus
|             	|&nbsp;&nbsp;&nbsp;&nbsp;see minus_operation.sh
|           	|&nbsp;&nbsp;&nbsp;&nbsp;\<gmail\>
|             	|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;google email address to login play store
|            	|&nbsp;&nbsp;&nbsp;&nbsp;\<gpassword\>
|            	|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;google password to login play store
|		|install
|            	|&nbsp;&nbsp;&nbsp;&nbsp;automatically searching the play store for packages provided in <./minus/laXX> and install them on android phone
|          	|&nbsp;&nbsp;&nbsp;&nbsp;\<./minus\/laXX\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a text file which contains a list of android package names
|		|clean
|            	|&nbsp;&nbsp;&nbsp;&nbsp;given \<app\-email\> and \<app\-password\>, this will automatically delete the user account on a given \<package\-name\>
|            	|&nbsp;&nbsp;&nbsp;&nbsp;\<package\-name\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the package\-name of an app currently residing on android phone
|            	|&nbsp;&nbsp;&nbsp;&nbsp;\<app\-email\>                             
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the email that user has provided when signing up with an app on android |phone
|             	|&nbsp;&nbsp;&nbsp;&nbsp;\<app\-password\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the password that user has provided when signing up with an app on android phone
|		|pull
|             	|&nbsp;&nbsp;&nbsp;&nbsp;see pm.sh
|		|uninstall
|             	|&nbsp;&nbsp;&nbsp;&nbsp;see pm.sh
|		|remove
|            	|&nbsp;&nbsp;&nbsp;&nbsp;remove all log directories _out and _err, ready for the next batch
|            	|&nbsp;&nbsp;&nbsp;&nbsp;\<./minus\/laXX\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a text file which contains a list of android package names
|**Dependencies**|minus_operation.sh							
|		|gsplit
|		|store.py
|		|dos2unix
|		|adb
|		|grep
|		|lac_adf.sh
|		|cleanup.py
|**Packages**	|lai									
|		|lai_web	
|**Notes**	|Appium is required to run the script	
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129373955-ec9522da-bedc-4c5b-9248-0b4dd2b23bc2.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129373975-e1779d5d-0541-40ac-b595-7c475cd18ed6.png)|

	
							upload.sh:
	
	
|**Synopsis**	|**./upload.sh \<ssh\-username\> \<ssh\-password\>**							
|:--------------|:-------------- 						
|**Description**|this little snippet will upload all apk files in pull directory and upload to a specific directory on the dedicated server, it can replace FileZilla														
|**Options**	|\<ssh\-username\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;ssh username to login the dedicated server
|		|\<ssh\-password\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;ssh password to login the dedicated server		
|**Dependencies**|sshpass								
|**Packages**	|lai_web	
|**Notes**	|a pull directory which contains all apk files must exist before running this script (e.g., after running pm.sh pull)	
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129374017-16a9a92e-74f3-4194-b0d7-58adf03f6dc9.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129374065-b0163239-650f-4d95-aee5-68659f3a2ad0.png)|

	
	
								lac_adf.sh:
	
	
|**Synopsis**	|**./lac_adf \<package\-name\>**								
|:--------------|:-------------- 						
|**Description**|Check on-the-fly whether an existing package on the android mobile device has user account deletion function or not(without using any natural language processing technique)																
|**Options**	|\<package\-name\>
|             	|&nbsp;&nbsp;&nbsp;&nbsp;an android package on the mobile device
|		|
|		|The script will return:
|              	|&nbsp;&nbsp;&nbsp;&nbsp;AD means account deletion
|              	|&nbsp;&nbsp;&nbsp;&nbsp;Not AD means not account deletion		|
|**Dependencies**|adb						
|		|dos2unix
|		|grep
|		|sed
|**Packages**	|lai_web
|**Notes**	|To know which packages are currently installed on the device, see pm.sh
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129374128-fd49791c-c692-4a53-8627-e3eddfd5a1f9.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129374187-e6d76152-9ea3-448a-9034-ce1b86aeed2d.png)|


								stats2.sh:
	
	
|**Synopsis**	|**./stats2.sh \<log\-directory\>**								
|:--------------|:-------------- 						
|**Description**|gather statistics for each android app after running batch.sh script										
|**Options**	|\<log\-directory\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains all the log files stored under _out and _err directories
|**Dependencies**|grep								
|**Packages**	|lai
|**Notes**	|Make sure to run batch.sh before running this script. The results can be redirected to a csv file and export to ms excel for further analyses
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129374263-aa111dc9-939f-4520-8d1f-b85270045946.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129374326-7375d4d9-230f-446f-8f9a-5d80b420c14e.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129374368-49df4f53-584d-49ad-a3be-3526e38e56db.png)|

		
	
								stats2_web.sh:
	
|**Synopsis**	|**./stats2_web.sh \<weblog\-directory\>**								
|:--------------|:-------------- 						
|**Description**|gather statistics for each website after running batch.sh script					
|**Options**	|\<weblog\-directory\>
|             	|&nbsp;&nbsp;&nbsp;&nbsp;A directory which contains all the log files for websites after running adf.sh script
|**Dependencies**|grep										
|**Packages**	|lai										
|**Notes**	|Make sure to run adf.sh for the web first before running this script. The results can be redirected to a csv file and export to ms excel for further analyses	
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129374950-1889937e-1b98-4f7d-bd40-a12c673c77fb.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375030-23aa567d-1997-424a-bf4d-7cf59b345a7e.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375094-7b98d440-0650-41d1-a34f-fa7b595b84d2.png)|
		
				
								adf.sh:
	
|**Synopsis**	|**./adf.sh [ \<apkfile\> \| \<website\> ]**								
|:--------------|:-------------- 						
|**Description**|build a strings-to-screen mapping model to determine whether a given apk file has user account deletion functionality 		
|**Options**	|\<apkfile\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;an apk file
|		|\<website\>
|               |&nbsp;&nbsp;&nbsp;&nbsp;a website which is downloaded as a webpage complete from google chrome
|		|the script returns a mapping_model.dot file for the corresponding apk or website in output directory for further analyses
|**Dependencies**|apktool							
|		|find
|		|awk
|		|xargs
|		|tesseract
|		|grep
|		|sed
|		|semantics.py
|**Packages**	|analyzer
|		|analyzer_web
|**Notes**	|Options are available depending on which package the script is running from
|		|The script depends on tesseract to convert images to text
|		|The script depends on semantics.py which use natural language processing to check the semantics of a phrase
|		|Further analysis can be performed on mapping_model.dot file by using stats.sh script
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129375266-9457d6ab-447e-4e4d-9de8-76d5cbe8d905.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375329-57bbe8c5-df8b-490e-ad84-e304a59e7c35.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375427-4d299895-5a6e-408c-aa16-37b64aeaed12.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375517-8fdbc9e8-e06a-4854-a828-5a60caecee86.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375570-2963318d-740b-40ba-967a-4757c72d7287.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375652-992d187b-52e5-41ae-8fb1-213eb80d59f0.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129375730-0a4af2e0-e4eb-46fb-8a25-0aa05a48b817.png)|
	

	
	
	
	
	
								parallel.sh:
	
|**Synopsis**	|**./parallel.sh [ \<apk-directory\> \| \<web\-directory\> ] \<max\-num\-of\-cores\>**			
|:--------------|:-------------- 						
|**Description**|an efficient way to run adf.sh in a multiprocessing environment										
|**Options**	|\<apk\-directory\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains all downloaded apk files	
|		|\<web\-directory\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains all downloaded websites
|		|\<max\-num\-of\-cores\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;a maximum number of cpu cores assigned to run this task in parallel
|**Dependencies**|adf.sh							
|		|xargs	
|**Packages**	|analyzer										
|		|analyzer_web	
|**Notes**	|\<max\-num\-of\-cores\> must be less than or equal to the actual number of cpu cores the server has
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129377413-5fa96bd3-2e3b-4634-8efd-4f49270cc49c.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129377520-5aa59dc3-ed5e-4482-b32d-320792606d69.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129377574-2ddeee9e-c9ed-4ff2-bda9-6ca205de2b57.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129377910-5c4c8c5e-a654-470b-bc9d-0c1d63c1a9fd.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129377955-00344443-433b-4942-ac3a-1da6efb3a275.png)|
		
		
	
	
	
								adf_fp.sh:

|**Synopsis**	|**./adf_fp.sh [ \<apkfile\> \| \<website\> ]**								
|:--------------|:-------------- 						
|**Description**|find not account deletion strings (not-ad) for an apk or a website using natural language processing						
|**Options**	|\<apkfile\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp;An apk file	
|		|\<website\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;A website which is downloaded as a webpage complete from google chrome
|		|If not-ad is found, the script will save it in not_ad_strings.txt for an equivalent apk or website in output directory. Otherwise, it will output nothing	
|**Dependencies**|grep							
|		|sed
|		|xargs	
|		|semantics.py
|**Packages**	|analyzer										
|		|analyzer_web	
|**Notes**	|Must run adf.sh or paralle.sh first before running this script.
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129378045-40b6d4da-018f-46c1-91ef-6f2975421c30.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129378111-b969d7ab-eaeb-4a9a-b6bf-5bbd7a32bddc.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129378200-28215678-fe00-4a54-acab-0fe6cebc9efb.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129378248-9d247f60-4f32-43c9-8726-ace1d1e7a270.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129378418-b78717bd-ce5d-4507-9767-b8607572c4da.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129378624-dfbf1e39-303d-436a-94da-66a1ad003b9e.png)|
		
	
	
								parallel_fp.sh:
	
	
|**Synopsis**	|**./parallel.sh [ \<apk\-directory\> \| \<web\-directory\> ] \<max\-num\-of\-cores\>**			
|:--------------|:-------------- 						
|**Description**|an efficient way to run adf_fp.sh in a multiprocessing environment										
|**Options**	|\<apk\-directory\>	
|		|&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains all downloaded apk files	
|		|\<web\-directory\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;a directory which contains all downloaded websites
|		|\<max\-num\-of\-cores\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;a maximum number of cpu cores assigned to run this task in parallel
|**Dependencies**|adf.sh								
|		|xargs
|**Packages**	|analyzer									
|		|analyzer_web	
|**Notes**	|\<max\-num\-of\-cores\> must be less than or equal to the actual number of cpu cores the server has
|		|This tool is similar to parallel.sh
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129378975-c842b5c2-9a2e-446f-894f-41afef80a315.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129379282-97e8d696-53b2-432d-8747-9adcad9a6f0f.png)|
		
	
								stats.sh:
	
	
|**Synopsis**	|**./stats.sh [ time \| dot \| svg \| fp ]**								
|:--------------|:-------------- 						
|**Description**|a tool to extract statistical information from log files											
|**Options**	|time		
|		|&nbsp;&nbsp;&nbsp;&nbsp;output time in seconds for each app (apk or website)
|		|dot	
|		|&nbsp;&nbsp;&nbsp;&nbsp;copy all valid mapping_models.dot files to analyses/dot directory (see adf.sh for more information)
|		|svg
|		|&nbsp;&nbsp;&nbsp;&nbsp;convert those mapping_model.dot files to svg files
|		|fp		
|		|&nbsp;&nbsp;&nbsp;&nbsp;copy all not_ad_strings.txt files to analyses/fp directory (see adf_fp.sh for more information)
|**Dependencies**|find								
|		|sed
|		|tail
|		|grep
|		|dot
|		|wc	
|**Packages**	|analyzer									
|		|analyzer_web
|		|lai (deprecated)
|		|lai_web (deprecated)
|**Notes**	|Must run adf.sh or parallel.sh or adf_fp.sh or parallel_fp.sh first before running this script
|		|Time outputs can be redirected to a csv file and export to Microsoft Excel for further analyses
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129380546-df785a8c-f7c9-4e07-bda8-8157b8b7b124.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129380662-0a0ddf7c-709f-40ae-834a-33f1bf374708.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129380701-58619dd1-2431-4bca-b639-9ab085c712dc.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129380752-d2d933d3-d938-4698-b09e-a5ac0102a86d.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129380806-6c8b4f00-69cf-4643-966d-5645f6619e1f.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129380850-6b3906cb-82ef-477e-831e-01ce8bd056a2.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129380910-4d44cca0-03ae-4a45-855e-8b4faf8f3ce3.png)|

	
	
	
	
	
								concat.sh:
	
	
|**Synopsis**	|**./concat.sh \<apk\-dot\-directory\> \<website\-dot\-directory\>**					
|:--------------|:-------------- 						
|**Description**|combine adf results from apks and websites together												
|**Options**	|\<apk\-dot\-directory\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp;the directory which contains all the dot files for apks after running adf.sh or parallel.sh tools in package analyzer
|		|\<website\-dot\-directory\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;the directory which contains all the dot files for websites after running adf.sh or parallel.sh tools in package analyzer_web
|		|after combining dot files, the script will convert them into svg files, also it saves the common dot files into both.txt
|**Dependencies**|head							
|		|tail
|		|sed
|		|cp
|		|dot
|**Packages**	|analyzer_combiner	
|**Notes**	|Must run adf.sh or parallel.sh first before running this script (in both package analyzer and analyzer_web)
|		|In svg graph, dotted lines represent paths coming from the website, normal lines are from the apk
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129381042-de305981-fd64-40f5-b0f5-ffe1a9bf7b93.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381137-0c7dcc29-eb0a-485e-97b2-8494be950eb0.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381178-68318b4c-f996-4225-b1da-aed106a26641.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381211-8e7f736e-d566-4c89-9284-62888d84ded1.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381245-8992edb6-b644-42b0-88d5-d59f997bc77c.png)|
	

	
				
	
								semantics.py:

	
|**Synopsis**	|**__DEV__\=1 python semantics.py \<paragraph\> .\*\<verb\>.\*<noun\>.\***				
|:--------------|:-------------- 						
|**Description**|Check the semantics of a paragraph against a special regular expression using natural language processing techniques							
|**Options**	|\<paragraph\>							
|		|&nbsp;&nbsp;&nbsp;&nbsp;A collection of sentences preferred to be in English	
|		|\<verb\>	
|		|&nbsp;&nbsp;&nbsp;&nbsp;An English verb
|		|\<noun\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;An English noun
|		|__DEV__\=1 is optional\:
|		|&nbsp;&nbsp;&nbsp;&nbsp;if present, a constituent tree will be printed and vice versa
|		|the script will return:
|		|&nbsp;&nbsp;&nbsp;&nbsp;(‘TP’, ‘’) means the paragraph’s true meaning has been understood as intended by regex .\*\<verb\>.\*\<noun\>.\*
|		|&nbsp;&nbsp;&nbsp;&nbsp;(‘FP’, some reason) means the paragraph’s true meaning has not been understood by regex .\*\<verb\>.\*\<noun\>.\*
|**Dependencies**|pystatparser							
|		|nltk
|**Packages**	|nlp
|**Notes**	|on linux or unix system, it is highly recommended to set PATH variable pointing to this package so that the command can be used through the system and as a dependency to other scripts
|		|currently the lab server file /etc/bash.bashrc is set up as : export PATH=$PATH:/home/hoang/Documents/Achilles/py					
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129381408-c0ac30a8-5a17-4609-9c72-10aadb8cd599.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381444-f625d032-e98f-42ca-bc98-60d99cc392e4.png)|

	
	
								context.py:
	
|**Synopsis**	|**python context.py \<document\>**								
|:--------------|:-------------- 						
|**Description**|an attempt to classify a document content on the difficulty levels of the user account deletion process using natural language processing techniques															
|**Options**	|\<document\>	
|		|&nbsp;&nbsp;&nbsp;&nbsp;A text file
|		|the script should return one of the following values in increasing difficulty order:
|		|&nbsp;&nbsp;&nbsp;&nbsp;-1: no context match
|		|&nbsp;&nbsp;&nbsp;&nbsp;0: there is an account deletion function
|		|&nbsp;&nbsp;&nbsp;&nbsp;1: the account deletion function asks for reasons
|		|&nbsp;&nbsp;&nbsp;&nbsp;2: the account deletion function asks to enter some inputs
|		|&nbsp;&nbsp;&nbsp;&nbsp;3: the account deletion function asks to confirm email address
|		|&nbsp;&nbsp;&nbsp;&nbsp;4: the account deletion function asks to contact customer service
|**Dependencies**|semantics.py							
|**Packages**	|nlp									
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129381501-53f68cd9-813d-4684-8f8f-b69c8c42d95b.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381544-73aef7d9-29c8-4d07-a7e3-e80546b538a9.png)|


**To pull single apks manually from android device to computer:**

1.	Firstly find the path of packages:

adb shell pm list packages \-f \-3

Output :
package:/data/app/com.foap.android-1/base.apk=com.foap.android
package:/data/app/com.adventure.skyticket-1/base.apk=com.adventure.skyticket
package:/data/app/com.getsomeheadspace.android-2/base.apk=com.getsomeheadspace.android
package:/data/app/com.mercariapp.mercari-1/base.apk=com.mercariapp.mercari
package:/data/app/com.multibrains.taxi.passenger.tirhal-1/base.apk=com.multibrains.taxi.passenger.tirhal

2.	To pull a specific package- Example: com.mercariapp.mercari-1:

adb pull /data/app/com.mercariapp.mercari-1/base.apk  /Users/preethis/Desktop

	
						apktool to extract retention period from apps:
	
	
|**Synopsis**	|python py.py (Change corresponding app folder names in the source code and run)					
|:--------------|:-------------- 						
|**Description**| A program to extract retention period patterns												
|**Options**	|None	
|**Dependencies**|semantics.py, apktool							
|**Packages**	|none	
|		|						
|**Notes**	|This program converts or reverse engineer’s apk files to decoded form and creates an output directory containing decoded folders and uses ‘strings.xml’ file to extract retention period patterns
	
	
	
						Web tool to extract retention period from websites:
	
|**Synopsis**	|python testing.py \<foldername.apk\>								
|:--------------|:-------------- 						
|**Description**|A program to extract retention period patterns												
|**Options**	|None		
|**Dependencies**|semantics.py								
|**Packages**	|none									
|		|						
|**Notes**	|This program converts folder containing webpages to texts and creates an output directory containing converted text folders, then uses these files to extract retention period patterns
	
	
	
	
								url.py:
	
|**Synopsis**	|python url.py \<android\-package\-file\>							
|:--------------|:-------------- 						
|**Description**|A little snippet to help testers pick the equivalent websites for android packages by listing the top ten results from google		
|**Options**	|\<android\-package\-file\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp;a text file containing android package names 	
|**Dependencies**|urlparse						
|		|googlesearch
|**Packages**	|lai_web	
|**Notes**	|Output results will be saved in an csv file and can export to excel for further analysis
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129381601-08ec15b1-75bc-4aef-a9db-7ce9ede1ce8b.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381665-6feb2fb0-63f7-4ca2-bc5c-33bf8a6a3558.png)|

	
	
	
	
								store.py:
	
|**Synopsis**	|python store.py \<android\-package\-names\-via\-stdin\>						
|:--------------|:-------------- 						
|**Description**|automatically goes to google play store, search for apks and install them to the android phone							
|**Options**	|\<android\-package\-names\-via\-stdin\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp;A list of android package names seperated by new line \n from stdin
|**Dependencies**|commons.py								
|**Packages**	|lai_web
|**Notes**	|\<android\-package\-names\-via\-stdin\> can be replaced by a redirection from cat command
|		|&nbsp;&nbsp;&nbsp;&nbsp;Appium is required to run the script	
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129381743-f50a5714-55c0-48af-b096-8936243ceb83.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381783-aa093d3d-c245-45df-8cb9-429fa6f1d4bd.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381820-389e7b5b-ae6f-4a46-a32e-9c13c71e4345.png)|

	
	
								my_apps.py:
	
	
|**Synopsis**	|**python my_apps.py \<gmail\> \<gpassword\>**								
|:--------------|:-------------- 						
|**Description**|automatically navigate and scrape html from My apps page on google play store website via chrome browser					
|**Options**	|\<gmail\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;google account email to login play store	
|		|\<password\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;google account passowrd to login play store
|		|The script will scrape all html content from My apps page of google play store
|**Dependencies**|common_web.py							
|		|python selenium
|		|chrome driver
|**Packages**	|lai_web
|**Notes**	|Make sure to install python selenium, chrome driver, chrome browser before running this script
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129381879-4ca4f3f8-f446-4935-bdae-042d9920e356.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381925-495a508e-8fef-4458-93d8-9bff2a1eb276.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129381964-92176cb5-392c-4f2d-bc84-2783c2e2db6f.png)|

	
	
	
								manual.py:
	
	
|**Synopsis**	|**python manual.py [ \<apkfile\> \| \<website\-address\> ]**					
|:--------------|:-------------- 						
|**Description**|Automatically launch an apkfile or a website then break into its ipdb console for manual intervention tasks			
|**Options**	|\<apkfile\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp; An apk file
|		|\<website\-address\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;A website address
|**Dependencies**|commons.py							
|		|commons_web.py
|		|ipdb
|**Packages**	|lai									
|		|lai_web
|**Notes**	|Appium is required if running the script from package lai
|		|Selenium, chrome driver, and chrome browser are required if running the script from package lai_web
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129382101-131e5dfe-18c9-4550-bdb8-6fc1223c7e4a.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382135-3ef4bd0b-5563-4ada-933f-afb9a34e6f86.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382169-5449a08f-b4f9-4365-bf3b-0a59a7507d04.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382207-408c979e-2cef-42db-a928-740ca06d8163.png)|

	
	
	
								signup.py:
	
	
|**Synopsis**	|**python signup.py [ \<apkfile\> \| \<website\-address\> ]**						
|:--------------|:-------------- 						
|**Description**|an attempt to automatically signup a user account via the android application or its equivalent website|	
|**Options**	|\<apkfile\>					
|		|&nbsp;&nbsp;&nbsp;&nbsp; An apk file
|		|\<website\-address\>
|		|&nbsp;&nbsp;&nbsp;&nbsp; A website address
|**Dependencies**|commons.py								
|		|commons_web.py
|**Packages**	|lai								
|		|lai_web	
|**Notes**	|Appium is required if running the script from package lai
|		|Selenium, chrome driver, and chrome browser are required if running the script from package lai_web
|		|User account information is hardcoded in commons.py or commons_web.py
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129382236-a18a1516-b6dc-4063-8308-e068adcbc693.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382277-1fe0660e-6fe7-45f0-9b16-b36c28866ae3.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382316-36408fea-4f34-4128-89ed-bbdbcc0789d5.png)|


	
	
								login.py:
	
	
	
|**Synopsis**	|**python login.py [ \<apkfile\> \| \<website\-address\> ]**						
|:--------------|:-------------- 						
|**Description**|an attempt to automatically login a user account via the android application or its equivalent website						
|**Options**	|\<apkfile\>	
|		|&nbsp;&nbsp;&nbsp;&nbsp; An apk file
|		|\<website\-address\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;A website address
|**Dependencies**|commons.py							
|		|commons_web.py
|**Packages**	|lai										
|		|lai_web	
|**Notes**	|Appium is required if running the script from package lai
|		|Selenium, chrome driver, and chrome browser are required if running the script from package lai_web
|		|User account information is hardcoded in commons.py or commons_web.py
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129382396-6e65efc8-8c4d-4e5d-83b9-25dca527309d.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382440-ea582a01-69d4-4eb1-b0a8-b7c5aa04f4a5.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382484-033fa7c2-06c6-42d0-af4f-0d55b3295765.png)|

	
	
	
	
								delete.py:
	
	
|**Synopsis**	|**python delete.py [ \<apkfile\> \<dotfile\> \| \<website\-address\> ]**			
|:--------------|:-------------- 						
|**Description**|an attempt to automatically delete a user account via the android application or its equivalent website					
|**Options**	|\<apkfile\>	
|		|&nbsp;&nbsp;&nbsp;&nbsp;An apk file
|		|\<dotfile\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;A dot file generated by adf.sh to guarantee that the account deletion functionlity exists on the apk
|		|\<website\-address\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;A website address
|**Dependencies**|commons.py							
|		|commons_web.py
|**Packages**	|lai								
|		|lai_web	
|**Notes**	|First make sure that there exists a user account with an android application or its equivalent website, possibly by running signup.py
|		|Appium is required if running the script from package lai, also must run adf.sh or parallel.sh first to have dot files
|		|Selenium, chrome driver, and chrome browser are required if running the script from package lai_web
|		|User account information is hardcoded in commons.py or commons_web.py
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129382542-41bf787d-46f4-4476-9505-04ed0c029420.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382579-3013b12d-d2ae-4fa5-a346-c73f30bb088a.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382630-e77b924e-a8d5-41ef-a186-a7e51ae6bf81.png)|

	
	
	
								cleanup.py:
	
	
|**Synopsis**	|**python cleanup.py \<package\-name\> \<app\-email\> \<app\-password\>**			
|:--------------|:-------------- 						
|**Description**|An attempt to automatically cleanup a user account for a certain android app when the user uninstalls it but forgets to do so			
|**Options**	|\<package\-name\>	
|		|&nbsp;&nbsp;&nbsp;&nbsp;The android package name which currently resides on the android device	
|		|\<app\-email\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;The user email which the user uses to login the app
|		|\<app\-password\>
|		|&nbsp;&nbsp;&nbsp;&nbsp;The user password which the users uses to login the app  
|**Dependencies**|commons.py							
|**Packages**	|lai									
|		|lai_web
|**Notes**	|Appium is required to run the script
|		|Make sure that the <package-name> exists on the device, this can be checked by using pm.sh
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129382773-a6ce567c-233f-4684-8cf1-7932b73d8436.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382825-8979ea11-7161-47b2-861d-6401046142e2.png)|

	
	
	
								commons.py:
	
	
|**Synopsis**	|**from commons import \<some\-functionality\>**							
|:--------------|:-------------- 						
|**Description**|A python library to interact with the android mobile device via appium										
|**Options**	|\<some\-functionality\> can be one of the followings:		
|		|external constants
|		|&nbsp;&nbsp;&nbsp;&nbsp;UNINSTALL_FLAG, EMAIL, PASSWORD, USERNAME, BIRTHDAY, FIRSTNAME, LASTNAME,PHONENUMBER, HEIGHT, WEIGHT, AGE, GENDER, LOCATION, ZIPCODE, SSN, DLN, CREDITCARD	
|		|external variable
|		|&nbsp;&nbsp;&nbsp;&nbsp;session
|		|functions:
|		|&nbsp;&nbsp;&nbsp;&nbsp;init
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deprecated
|		|&nbsp;&nbsp;&nbsp;&nbsp;init2
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auto launch an android app using the apk file and get a session ready
|		|&nbsp;&nbsp;&nbsp;&nbsp;init3
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auto launch an android app using the package name and get a session ready
|		|&nbsp;&nbsp;&nbsp;&nbsp;uninstall
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uninstall the android app by using the apk file
|		|&nbsp;&nbsp;&nbsp;&nbsp;find
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;find a widget by its text
|		|&nbsp;&nbsp;&nbsp;&nbsp;find_edits
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;find all the editable widgets
|		|&nbsp;&nbsp;&nbsp;&nbsp;find_clickable_textviews
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;find all the textview widgets which are clickable
|		|&nbsp;&nbsp;&nbsp;&nbsp;scroll_to
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scroll to a specific widget identified matching its text
|		|&nbsp;&nbsp;&nbsp;&nbsp;getClickableWidgets
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;get all clickable widgets on the screen
|		|&nbsp;&nbsp;&nbsp;&nbsp;filterClass
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deprecated
|		|&nbsp;&nbsp;&nbsp;&nbsp;filterKeyword
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deprecated
|		|&nbsp;&nbsp;&nbsp;&nbsp;checkWidgetCount
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deprecated
|		|&nbsp;&nbsp;&nbsp;&nbsp;Init
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deprecated
|		|&nbsp;&nbsp;&nbsp;&nbsp;swipe_up
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auto swiping up the screen
|		|&nbsp;&nbsp;&nbsp;&nbsp;swipe_left
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auto swiping to the left of the screen
|		|&nbsp;&nbsp;&nbsp;&nbsp;dump_text
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dump all the textual information of current active screen
|**Dependencies**|appium							
|		|time
|		|re
|		|csv
|		|os
|		|selenium
|**Packages**	|lai									
|		|lai_web						
|**Notes**	|none
	
	
								commons_web.py:
	
	
	
|**Synopsis**	|**from commons_web import \<some\-functionality\>**							
|:--------------|:-------------- 						
|**Description**|A python library to interact with the android mobile device via Selenium	
|**Options**	|\<some\-functionality\> can be one of the followings:		
|		|external constants
|		|&nbsp;&nbsp;&nbsp;&nbsp;UNINSTALL_FLAG, EMAIL, PASSWORD, USERNAME, BIRTHDAY, FIRSTNAME, LASTNAME,PHONENUMBER, HEIGHT, WEIGHT, AGE, GENDER, LOCATION, ZIPCODE, SSN, DLN, CREDITCARD	
|		|external variable
|		|&nbsp;&nbsp;&nbsp;&nbsp;session
|		|functions:
|		|&nbsp;&nbsp;&nbsp;&nbsp;init
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auto launch a website address (url) and get the session ready
|		|&nbsp;&nbsp;&nbsp;&nbsp;dump_text
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dump all textual information of a webpage
|		|&nbsp;&nbsp;&nbsp;&nbsp;dump_html
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dump all html information of a webpage
|		|&nbsp;&nbsp;&nbsp;&nbsp;find_clickable
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;find a clickable widget if its text matches a specific regular expression pattern
|		|&nbsp;&nbsp;&nbsp;&nbsp;find_editables
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;find all editable widgets on current webpage
|		|&nbsp;&nbsp;&nbsp;&nbsp;fill_edits
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically fill all editable widgets with information provided via a dictionary data type
|		|&nbsp;&nbsp;&nbsp;&nbsp;nicely_quit
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nicely quit the web session
|		|&nbsp;&nbsp;&nbsp;&nbsp;signal_handler
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nicely handle external signals
|		|&nbsp;&nbsp;&nbsp;&nbsp;click
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;click on provided web element
|		|&nbsp;&nbsp;&nbsp;&nbsp;shutdown
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shutdown the session
|		|&nbsp;&nbsp;&nbsp;&nbsp;save_as
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mimic the save as functionality of a chrome web browser
|		|&nbsp;&nbsp;&nbsp;&nbsp;scroll_infinite
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automatically scroll the webpage until its end is reached
|		|								
|**Dependencies**|selenium	
|		|time
|		|html2text
|		|re
|		|sys	
|		|pyautogui
|**Packages**	|lai_web								
|**Notes**	|none									

	
	
							random_scraper.py:
	
|**Synopsis**	|**python random_scraper.py \<apkfile\>**								
|:--------------|:-------------- 						
|**Description**|a tool which triggers random events on the android app and scrape all the screen textual information						
|**Options**	|\<apkfile\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp;An apk file 
|**Dependencies**|commons.py			
|		|monkey
|**Packages**	|lai	
|**Notes**	|Appium is required to run the script, must set --relaxed-security option
|		|the number of events and iteration to be fired are hardcoded in the script
|		|
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129382951-dc50da23-145a-4ae9-b254-8b9be2f74bcd.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129382988-ba8f55ce-4a14-439f-8e53-be175891f4d0.png)|

	
	
	
	
							capture.py:
	
	
|**Synopsis**	|**python capture.py \<website\-address\>**								
|:--------------|:-------------- 						
|**Description**|A tool which mimics the save as function in google chrome web browser 										
|**Options**	|\<website\-address\>		
|		|&nbsp;&nbsp;&nbsp;&nbsp;A website address
|**Dependencies**|commons_web.py									
|**Packages**	|lai_web
|**Notes**	|Selenium, web driver, and chrome browser are required before running this script
|		|Make sure to have pyautogui library installed
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129383034-71a953b6-72d4-4ded-ab6e-5d928475d668.png)|

	
	
	
							DefUseChain.java:
	
	
|**Synopsis**	|**see examples**								
|:--------------|:-------------- 						
|**Description**|a tool for def-use-chain analysis using Soot Framework												
|**Options**	|see examples		
|**Dependencies**|see examples								
|**Packages**	|see examples	
|**Notes**	|Eclipse (Keepler) is currently used for running this script
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129383075-ff10838f-5662-4f0f-a7ed-d239e889e30b.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129383118-b5439d03-82d4-47f5-b341-503538ec32a5.png)|

	
	
	
							pystatparser:
	
	
|**Synopsis**	|**from stat_parser import Parser**								
|:--------------|:-------------- 						
|**Description**|A python package for parsing natural languages													
|**Options**	|none	
|**Dependencies**|github							
|**Packages**	|pystatparser		
|**Notes**	|This open-source python package has been readjusted to work properly with python 2.7
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129383340-9b05828d-979c-4e33-945b-813e67ed939e.png)|

	
	
	
							auth:
	
	
|**Synopsis**	|**\#include “auth.h”**								
|:--------------|:-------------- 						
|**Description**|A small c-library built with curl to bypass basic authorization 										
|**Options**	|functions:		
|		|&nbsp;&nbsp;&nbsp;&nbsp;basic_auth
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bypass basic authorization
|		|&nbsp;&nbsp;&nbsp;&nbsp;basic_get
|		|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;simulate a GET request bypassing basic authorization
|**Dependencies**|curl							
|		|Base64Encode
|		|Base64Decode
|		|crypto
|**Packages**	|clang	
|**Notes**	|At the time of writing, httrack was a popular opensource website copier but it did not pass basic authorization
|		|This library can be compiled as a dynamic library .so to be used in complement with httrack
|		|						
|**Examples**	|![image](https://user-images.githubusercontent.com/84356922/129383387-6cc7b996-3cc8-4795-a97f-def17d55778f.png)|
|		|![image](https://user-images.githubusercontent.com/84356922/129383418-792976f5-89bd-4c86-bb14-7443bb5c2556.png)|
