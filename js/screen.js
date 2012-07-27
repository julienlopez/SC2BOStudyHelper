Screen = function() 
{
  	if(Screen.caller != Screen.getInstance)
      	throw new Error("This object cannot be instanciated");

  	this.jobject = $(Screen.getId());

	/*
  	this.fenetres = [];

	this.focus = null;

	$(document).keypress(function(event) 
	{
		if(Screen.getInstance().focus == null)  return false;
		return Screen.getInstance().focus.onKeyPress(event);
	});
	*/
	
	this.pages = Array();
    this.pages.push(new PageAccueil());
    this.pageActuelle = 0;
    
    /*
    this.user = null;
    this.animMenu = true;
    this.option = null;
    
    this.pageActuelle = 0;
    if(Helper.testCookie('kivaou_afficheur_page'))
    {
        var c = Helper.getCookie('kivaou_afficheur_page');
	if(c != null)
	{
	    for(var i = 0; i<this.pages.length; i++)
		if(this.pages[i].name == c) this.pageActuelle = i;
	}
    }
    
    if(Helper.testCookie('kivaou_afficheur_option'))
    {
        var c = Helper.getCookie('kivaou_afficheur_option');
	if(c != null) this.option = c;
    }
    */
}

// propriété statique qui contient l'instance unique
Screen.instance = null;

Screen.getInstance = function() 
{
  	if (this.instance == null) {
    	this.instance = new Screen();
  	}
  	return this.instance;
}

Screen.getId = function()
{
  	return '#screen';
}

/*
Screen.addFenetre = function(fenetre)
{
  	var i = this.getInstance();
  	i.fenetres.push(fenetre);
  	i.jobject.append(fenetre.jobject);
}

Screen.creerConsole = function()
{
  	var console = new Console();
  	Screen.addFenetre(console);
}

Screen.getFocused = function()
{
	return Screen.getInstance().focus;
}

Screen.setFocused = function(window)
{
	var instance = this.getInstance();
	if(instance.fenetres.indexOf(window) < 0) throw new Error("Fenetre non enregistrée par le Screen");
	instance.focus = window;
}
*/

Screen.prototype = {
    getPageActuelle : function()
    {
        return this.pages[this.pageActuelle];
    },
    
    display : function(page, option)
    {
        this.displayError('');
		if(option != null || this.option == null)
	    	this.option = option;
        if(page != null)
        {
            var i;
            for(i = 0; i<this.pages.length; i++)
                if(this.pages[i].name == page)
                {
                    this.pageActuelle = i;
                    break;
                }
            if(i == this.pages.length) Helper.log('Page introuvable');
        }
        
        //affichage des pages n'ayant pas besoin de login
        if(this.pageActuelle == 0)
        {
            var p = this.getPageActuelle();
            p.display();
            return;
        }
	
		/*
		if(this.getPageActuelle().needLogin && this.user == null)
        {
            $.ajax({type:'post',url:'login.php5', success:this.onLoginReturn, error:this.onAjaxError});
            return;
        }
		*/
		Helper.createCookie('kivaou_afficheur_page='+this.getPageActuelle().name ,0.1);
		if(this.option != null) Helper.createCookie('kivaou_afficheur_option='+this.option ,0.1);
			
		Helper.log('display(' + this.getPageActuelle().name + ', ' + this.option + ')');
		this.getPageActuelle().display(this.option);
	
		var d = $('#display');
		if(d.length > 0) d.height(centre.height()-40);
    },
    
    /*
    onLoginReturn : function(res)
    {
        var o = Helper.processReply(res);
	if(o != null)
	{
	    if(o.type == 'erreur')
	    {   
		if(o.id < 2)
		{
		    afficheur.animMenu = true;
		    afficheur.pages[0].display();
		    afficheur.pages[0].afficherLogin();
		    if(o.id == 0) return;
		    
		    $.blockUI(
		    {
			message: 'Une erreur est survenue:<br /><br />'+o.message+'<center><div id="bouton_intro" onclick="$.unblockUI();">Accéder à Kivaou</div></center>',
			css: {padding: '10px'}
		    });
		}
		else
		{
		    Helper.log('erreur serveur: (' + o.id +')');
		    Helper.log(o.message);
		    afficheur.displayError('Erreur lors de la réception des données du serveur');
		}
	    }
	    else 
	    {
		if(o.type == 'ack' && (o.id == 0 ||o.id == 1))
		{
		    afficheur.user = o.data;
		    afficheur.display();
		}
	    }
	}
    },
    */
    
    onAjaxError : function(res, text)
    {
		if(res.status == 404) this.displayError('Impossible de se connecter au serveur');
		else Helper.log('ERREUR AJAX: '+res.status);
    },
    
    displayError : function(message)
    {
        var bandeauErreur = $('#bandeau_erreur');
        if(message == '')
        {
        	bandeauErreur.hide();
        	$('#screen').height($(window).height() - $('#header').height() - $('#footer').height());
        }
        else
        {
        	bandeauErreur.text(message);
        	$('#screen').height($(window).height() - bandeauErreur.height() - $('#header').height() - $('#footer').height());
        	bandeauErreur.show();
        }
    }/*,
    
    onLogOut : function(res)
    {
		var o = Helper.processReply(res);
		if(o != null)
		{
			if(o.type == 'ack' && o.id == '2')
			{
			afficheur.user = null;
			afficheur.display('accueil');
			}
			else 
			{
			Helper.log(res);
			alert('erreur lors du logOut');
			}
		}
    }
    */
}
