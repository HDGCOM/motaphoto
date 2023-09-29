/*(function($) {
jQuery(document).ready(function() {
    // Ouvrir la fenêtre modale lorsque l'utilisateur clique sur le lien
    $("#open-modal-link").click(function(event) {
        event.preventDefault(); // Empêche le lien de suivre sa cible par défaut
        $("#open-modal").fadeIn();
    });
    //test
    function closeModal() {
        $(".overlay-modal").fadeOut();
    }
    $(document).on("click", function(event) {
        if ($(event.target).is(".overlay-modal")) {
            closeModal();
        }
    });

    // Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
    
   /*$(document).on("click", function(event) {
        if ($(event.target).is("#open-modal")) {
            $("#open-modal").fadeOut();
        }
    });*/

    // Empêcher la fermeture de la fenêtre modale lorsque l'utilisateur clique à l'intérieur
   /* $("#open-modal").on("click", function(event) {
        event.stopPropagation();
    });
});
})(jQuery);
*/
//test

(function($) {
    jQuery(document).ready(function($) {
        
        // Ouvrir la modal lorsque le lien est cliqué
        $('#open-modal-link').click(function(e) {
            e.preventDefault(); // Empêche le lien de suivre le lien href
            $('#open-modal').fadeIn();
        });
    
        // Fermer la modal lorsque le bouton de fermeture est cliqué
        $('.close').click(function(){
			$(this).closest('.modal').hide();
		});
    });
})(jQuery);
    



