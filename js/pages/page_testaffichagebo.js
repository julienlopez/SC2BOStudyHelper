PageTestAffichageBO = function()
{
    this.name = 'test_affichage_BO';
    this.needLogin = false;
    
    this.display = function()
    {
        var scr = $('#screen');
        scr.height($(window).height() - $('#header').height() - $('#footer').height() - $('#bandeau_erreur').height());
        scr.html('<center><big>test Affichage BO!</big></center>');
        
        var json = '{"name":"Test", "events":[{"type":"unit","name":"probe","timestamp":2,"supply":"6/10"},{"type":"batiment","name":"pylon","timestamp":5,"supply":"7/10"},{"type":"unit","name":"probe","timestamp":8,"supply":"7/10"},{"type":"research","name":"weapon upgrade","timestamp":12,"supply":"8/10"},{"type":"unit","name":"zealot","timestamp":15,"supply":"8/10"}]}';
        
        var bo = new BO("test_bo");
        bo.jobject.appendTo(scr);
        bo.load(json);
    }
}

PageTestAffichageBO.prototype =
{
    getNom : function() { return this.name; }
}
