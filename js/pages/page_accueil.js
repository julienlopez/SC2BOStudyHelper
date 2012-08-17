PageAccueil = function()
{
    this.name = 'accueil';
    this.needLogin = false;
    
    this.display = function()
    {
        var scr = $('#screen');
        scr.height($(window).height() - $('#header').height() - $('#footer').height() - $('#bandeau_erreur').height());
        scr.html('<center><big>Yo!</big></center>');
        var bouton = $('<div>Test Affichage BO</div>');
        bouton.appendTo(scr);
        bouton.css("cursor", "pointer");
        bouton.css("background-color", "#888888");
        bouton.css("display", "inline-block");
        bouton.css("padding", 10);
        bouton.click(function(){
        	Screen.getInstance().display("test_affichage_BO");
        });
    }
}

PageAccueil.prototype =
{
    getNom : function() { return this.name; }
}
