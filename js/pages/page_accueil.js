PageAccueil = function()
{
    this.name = 'accueil';
    this.needLogin = false;
    
    this.display = function()
    {
        var scr = $('#screen');
        scr.height($(window).height() - $('#header').height() - $('#footer').height() - $('#bandeau_erreur').height());
        scr.html('<center><big>Yo!</big></center>');
    }
}

PageAccueil.prototype =
{
    getNom : function() { return this.name; }
}
