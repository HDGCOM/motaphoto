/*jQuery(document).ready(function($) {

    // Sélectionnez le conteneur des miniatures
    var thumbnailsContainer = $('.thumbnails-container');

    // Récupérez les images 
    var originalImages = document.querySelectorAll(".container-img img");

    // Index de l'image actuellement affichée
    var currentIndex = 0;

    // Sélectionnez les liens "Précédent" et "Suivant"
    var prevLink = $('.nav-link.prev');
    var nextLink = $('.nav-link.next');

    // Fonction pour afficher l'image au survol du lien
    function showImageOnHover(index) {
        thumbnailsContainer.html(""); // Effacez les miniatures actuelles
        thumbnailsContainer.append(originalImages[index].cloneNode(true));
    }

    // Réinitialiser l'affichage lorsque la souris quitte le lien "Précédent"
    prevLink.mouseenter(function() {
        showImageOnHover(currentIndex);
    });

    // Associez la fonction d'affichage au survol des liens "Précédent" et "Suivant"
    prevLink.mouseenter(function() {
        if (currentIndex > 0) {
            showImageOnHover(currentIndex - 1);
        }
    });

    nextLink.mouseenter(function() {
        if (currentIndex < originalImages.length - 1) {
            showImageOnHover(currentIndex + 1);
        }
    });

    // Ajoutez des liens autour des images originales pour les rendre cliquables
    // Redirigez vers l'article correspondant en cliquant sur le lien "Suivant"
nextLink.click(function(e) {
    e.preventDefault();
    if (currentIndex < originalImages.length - 1) {
        currentIndex++;
        var articleId = originalImages[currentIndex].getAttribute("data-article-id");
        if (articleId) {
            var articleLink = articleData.articleLink; // Utilisez la variable articleLink passée depuis PHP
            if (articleLink) {
                // Redirigez vers l'article de l'image suivante
                window.location.href = articleLink;
            }
        }
    }
});

// Redirigez vers l'article correspondant en cliquant sur le lien "Précédent"
prevLink.click(function(e) {
    e.preventDefault();
    if (currentIndex > 0) {
        currentIndex--;
        var articleId = originalImages[currentIndex].getAttribute("data-article-id");
        if (articleId) {
            var articleLink = articleData.articleLink; // Utilisez la variable articleLink passée depuis PHP
            if (articleLink) {
                // Redirigez vers l'article de l'image précédente
                window.location.href = articleLink;
            }
        }
    }
});

});*/

jQuery(document).ready(function($) {

    // Sélectionnez le conteneur des miniatures
    var thumbnailsContainer = $('.thumbnails-container');

    // Récupérez les images 
    var originalImages = document.querySelectorAll(".container-img img");

    // Index de l'image actuellement affichée
    var currentIndex = 0;

    // Sélectionnez les liens "Précédent" et "Suivant"
    var prevLink = $('.nav-link.prev');
    var nextLink = $('.nav-link.next');

    // Fonction pour afficher l'image au survol du lien
    function showImageOnHover(index) {
        thumbnailsContainer.html(""); // Effacez les miniatures actuelles
        thumbnailsContainer.append(originalImages[index].cloneNode(true));
    }

    // Réinitialiser l'affichage lorsque la souris quitte le lien "Précédent"
    prevLink.mouseenter(function() {
        showImageOnHover(currentIndex);
    });

    // Associez la fonction d'affichage au survol des liens "Précédent" et "Suivant"
    prevLink.mouseleave(function() {
        if (currentIndex > 0) {
            showImageOnHover(currentIndex - 1);
        }
    });

    nextLink.mouseenter(function() {
        if (currentIndex < originalImages.length - 1) {
            showImageOnHover(currentIndex + 1);
        }
    });

    // Récupérez l'ID de l'article à partir de l'image actuellement affichée
    function getCurrentArticleId() {
        return originalImages[currentIndex].getAttribute("data-article-id");
    }

    // Ajoutez un événement de clic aux liens "Suivant" et "Précédent" pour rediriger
    nextLink.click(function(e) {
        e.preventDefault();
        if (currentIndex < originalImages.length - 1) {
            currentIndex++;
            var articleId = getCurrentArticleId();
            if (articleId) {
                var articleUrl = articleData.articleLink + '?p=' + articleId; // Construisez l'URL de l'article
                window.location.href = articleUrl; // Redirigez vers l'article
            }
        }
    });
    
    prevLink.click(function(e) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            var articleId = getCurrentArticleId();
            if (articleId) {
                var articleUrl = articleData.articleLink + '?p=' + articleId; // Construisez l'URL de l'article
                window.location.href = articleUrl; // Redirigez vers l'article
            }
        }
    });

    //Toutes les photos single
    jQuery(document).ready(function ($) {
        var $button = $('#load-same-category-photos');
        var $imagesContainer = $('.more-images-single');
        
        // Nombre d'articles à charger à chaque clic sur le bouton
        var postsPerPage = -1;

        // Compteur pour suivre le nombre d'articles chargés
        var postCounter = postsPerPage;

        $button.on('click', function () {
            // Effectuez une requête AJAX pour charger les articles supplémentaires
            $.ajax({
                url: custom_script_params.ajaxurl, // Assurez-vous que cette URL est correcte
                type: 'POST',
                data: {
                    action: 'load_more_posts',
                    offset: postCounter,
                    posts_per_page: postsPerPage,
                },
                success: function (response) {
                    $imagesContainer.append(response);
                    postCounter += postsPerPage;
                },
            });
        });
    });

    //Modale single
    // Ouvrir la modal lorsque le lien est cliqué
    jQuery(document).ready(function ($) {
        // Ouvrir la modal lorsque le bouton "Contact" est cliqué
        $('#open-modal-link-article').click(function(e) {
            e.preventDefault();
            var reference = $(this).data('reference'); // Récupérer la référence depuis l'attribut data-reference

            // Remplir le champ "RÉF. PHOTO" avec la référence
            $('input[name="your-subject"]').val(reference);

            // Afficher le modal
            $('#open-modal').fadeIn();
        });


        // Fermer la modal lorsque le bouton de fermeture est cliqué
        $('.close').click(function() {
            $(this).closest('.modal').hide();
        });
    });
    
});

