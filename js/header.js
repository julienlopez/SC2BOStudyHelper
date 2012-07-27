Header = function()
{
	if(Header.caller != Header.getInstance)
      	throw new Error("This object cannot be instanciated");

  	this.jobject = $(Header.getId());
}

// propriété statique qui contient l'instance unique
Header.instance = null;

Header.getInstance = function() 
{
  	if (this.instance == null) {
    	this.instance = new Header();
  	}
  	return this.instance;
}

Header.getId = function()
{
	return "#header";
}

Header.addButton = function(title, icon)
{
	var obj = $('<div class="button">'+title+'</div>');
	Header.getInstance().jobject.append(obj); //'<a href="#" class="button">'+title+'</a>'
	if(icon)
	{
		obj.addClass(icon);
	}
}
