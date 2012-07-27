$(function(){
  	$('#screen').height($(document).innerHeight()-$('#header').height()-$('#footer').height());
	
	Header.addButton("Test");
	
	Header.addButton("Re-test", "play");
	
	/*
	//init $.browser
    var userAgent = navigator.userAgent.toLowerCase();
    var userBrowserName  = navigator.appName.toLowerCase();
    
    // Is this a version of Chrome?
    $.browser.chrome = /chrome/.test(userAgent);
    if($.browser.chrome)
    {
        userAgent = userAgent.substring(userAgent.indexOf('chrome/') +7);
        userAgent = userAgent.substring(0,userAgent.indexOf('.'));
        $.browser.version = userAgent;
        // If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
        $.browser.safari = false;
    }
    
    // Figure out what browser is being used
    if($.browser.mozilla) $.browser.name = 'firefox';
    if($.browser.webkit) $.browser.name = 'webkit';
    if($.browser.safari) $.browser.name = 'safari';
    if($.browser.opera) $.browser.name = 'opera';
    if($.browser.msie) $.browser.name = 'ie';
    if($.browser.chrome) $.browser.name = 'chrome';
    
    var w = $(window);
    var message = 'message='+$.browser.name+'('+$.browser.version+')['+w.width()+'x'+w.height()+'] -||- ';
    */
    
    var screen = Screen.getInstance();
    screen.display();
    
    /*
    message += $.browser.name+'('+$.browser.version+')['+w.width()+'x'+w.height()+']';
    $.ajax({type:'post',url:'log.php5',data:message});
    */

	$(window).resize(function()
    {
        screen.display();
    });
});

function synchrone(url, data) 
{ 
    var res; 
    $.ajax({'url': url, 'data': data, 'async': false, 'type':'POST', 'success': function(data)
    { 
      	if(data.charAt(0) != '{' || data.charAt(data.length - 1) != '}')
	{
	    Helper.log(data);
	    return;
	}
	res = JSON.parse(data);
    }});
    return res; 
}

String.prototype.replaceAll = function(occ, str)
{
    if(this.indexOf(occ) > 0)
        return this.replace(occ, str).replaceAll(occ,str);
    return this;
}
