
jQuery(document).ready(function($) {
    // Lorsque l'élément avec la classe "open-modal" est cliqué
    $('.open-modal a').click(function(e) {
        e.preventDefault(); // Empêche le lien de naviguer vers une nouvelle page
        
        // Affichez votre modale ici (utilisez votre propre code pour afficher la modale)
        // Par exemple, si vous utilisez jQuery UI Dialog :
        $('#modal').dialog({
            modal: true,
            width: 'auto',
            buttons: {
                Fermer: function() {
                    $(this).dialog('close');
                }
            }
        });
    });
});
