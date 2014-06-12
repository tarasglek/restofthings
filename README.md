directory_server - centralized endpoint behind restofthings.com
frontend - some html code to make use of all of the CORS
slave - code that runs on pi

##Webiopi
# Remove auth
sudo rm /etc/webiopi/passwd


### Flow
* obtain device & plug it into network/power
* go to user.restofthings.com to find device listed
* Click link to go to dev ui(eg webiopi pinout page)
* Assign tags to device
* Have home automation software look up device by those tags
** Alternative: have some software deployed on one of the devices and do ^
* Enjoy
