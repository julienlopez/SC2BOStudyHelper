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
	
	var containr = this.containr;
	var array = {'building':'Buildings', 'unit':'Units', 'research':'Researches'};
	
	for (var i in array)
	{
		var checkbox = $('<input type="checkbox" id="display_'+i+'_checkbox" />');
		checkbox.appendTo(this.control);
		$('<label for="display_'+i+'_checkbox">Display '+array[i]+'</label><br />').appendTo(this.control);
		checkbox.attr('checked', true);
		checkbox.click((function(j)
			{
				return function() //closure
				{
					if($(this).is(':checked')) containr.children("."+j).each(function(){ $(this).show(); });
					else containr.children("."+j).each(function(){ $(this).hide(); });
				}
			})(i));
	}
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
			ev.appendTo(this.containr);
			$('<img src="" alt="" />').appendTo(ev);
			var div = $('<div></div>');
			div.css('display',"inline-block");
			div.appendTo(ev);
			$('<div>'+e.name+'</div>').appendTo(div);
			$('<div>'+e.timestamp+'</div>').appendTo(div);
			$('<div>'+e.supply+'</div>').appendTo(div);
		}
	}
}
