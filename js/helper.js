Form = function()
{}

Helper = function()
{

}

Helper.Form = new Form();

Helper.log = function(message, debug)
{
     /*if(console != null) console.log(message);
     else*/
          if(debug != null && debug) alert(message);
}

Helper.Form.createInput = function(id, nom, type, name, retourLigne)
{
     if(retourLigne == null) retourLigne = true;
     if(type == null) type = 'text';
     
     return (retourLigne?'<tr>':'')+'<td><label for="'+id+'">'+nom+' </label></td><td><input id="'+id+'" type="'+type+'" '+(name==null?'':'name="'+name+'"')+' /></td>'+(retourLigne?'</tr>':'');
}

Helper.Form.createSubmit = function(id, value)
{
     return '<input type="submit" id="'+id+'" value="'+value+'" />';
}

Helper.Form.createOption = function(id, options)
{
     var res = '<select id="'+id+'">';
     for(i = 0; i<options.length; i++)
          res += '<option>'+options[i]+'</option>';
     return res+'</select>';
}

Helper.Form.createRadios = function(name, radios, retourLigne)
{
     if(retourLigne == null) retourLigne = true;
     var res = (retourLigne?'<tr>':'')+'<td>'+name+'</td><td>';
     for(var i = 0; i<radios.length; i++)
     {
          var r = radios[i];
          res += '<label for="'+r.id+'">'+r.nom+'</label><input type="radio" id="'+r.id+'" '+(r.name==null?'':'name="'+r.name+'"')+' /><br />';
     }
     return res + '</td>' +(retourLigne?'</tr>':'');
}

Helper.processReply = function(res)
{
     if(res.charAt(0) != '{' || res.charAt(res.length - 1) != '}')
     {
          Helper.log('Retour non json: ');
          Helper.log(res);
          return null;
     }
     
     var o = JSON.parse(res);
     if(o.type == 'erreur' || o.type == 'ack') return o;
     
     Helper.log('uncaught return: ' + o.message);
     return null;
}

Helper.testCookie = function(nom)
{
     var deb = document.cookie.indexOf(nom);
     return (deb >= 0);
}

Helper.getCookie = function(nom)
{
     var str = document.cookie;
     str = str.replaceAll(' ','');
     var res = str.split(';');
     
     for(var i = 0; i<res.length; i++)
          if(res[i].substr(0,nom.length) == nom)
               return res[i].substr(nom.length+1);
     
     return null;
}

Helper.createCookie = function(nom, heures)
{
     var expDate = new Date()
     expDate.setTime(expDate.getTime() + (heures * 3600 * 1000)) //on ajoute 1h
     document.cookie = nom+ ";expires=" + expDate.toGMTString();
}

Helper.createLienMenuGauche = function(nom, page)
{
     var lien = $('<div class="lien_menu_gauche">'+nom+'</div>');
     lien.click(function(){ afficheur.display(page); });
     return lien;
}
