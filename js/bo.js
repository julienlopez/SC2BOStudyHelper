BO = function(id)
{
	this.id = id;
	this.jobject = $('<div class="bo" id="'+id+'"></div>');
	this.title = $('<div class="bo_title"></div>');
	this.title.appendTo(this.jobject);
	this.containr = $('<div class="bo_containr"></div>');
	this.containr.appendTo(this.jobject);
	this.control = $('<div class="bo_control"></div>');
	this.control.appendTo(this.jobject);
	var checkbox = $('<input type="checkbox" id="display_buildings_checkbox" />');
	checkbox.appendTo(this.control);
	$('<label for="display_buildings_checkbox">Display Buildings</label><br />').appendTo(this.control);
	var containr = this.containr;
	checkbox.click(function()
		{
			if($(this).is(':checked'))
			{
				containr.children(".buildings").each(function(){this.show()});
			}
			else
			{
				containr.children(".buildings").each(function(){this.hide()});
			}
		});
	
	checkbox = $('<input type="checkbox" id="display_units_checkbox" />');
	checkbox.appendTo(this.control);
	$('<label for="display_units_checkbox">Display Units</label><br />').appendTo(this.control);
	
	checkbox = $('<input type="checkbox" id="display_researches_checkbox" />');
	checkbox.appendTo(this.control);
	$('<label for="display_researches_checkbox">Display Researches</label><br />').appendTo(this.control);
}

BO.prototype = {
	load: function(json)
	{
		var o = jQuery.parseJSON(json);
		this.title.html('<center>'+o.name+'</center>');
		for(var i = 0; i < o.events.length; i++)
		{
			var e = o.events[i];
			var ev = $('<div class="bo_event"></div>');
			ev.addClass(e.type);
			ev.html(e.name);
			ev.appendTo(this.containr);
		}
	}
}
