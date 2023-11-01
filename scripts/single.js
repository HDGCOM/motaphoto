/*jQuery(document).ready(function($) {
    // Liste des liens de navigation
    var prevLink = document.querySelector('.nav-link.prev');
    var nextLink = document.querySelector('.nav-link.next');

    // Liste des miniatures des photos
    var thumbnailPreview = document.querySelector('.thumbnail-preview');

    // Liste des URL des photos
    var photoURLs = [
        '<?php echo get_the_post_thumbnail_url(get_previous_post()->ID); ?>',
        '<?php echo get_the_post_thumbnail_url(get_next_post()->ID); ?>',
    ];

    // Index de la photo actuelle
    var currentPhotoIndex = 0;

    // Afficher la miniature au survol d'un lien de navigation
    prevLink.addEventListener('mouseover', function () {
        showThumbnail(currentPhotoIndex - 1);
    });

    nextLink.addEventListener('mouseover', function () {
        showThumbnail(currentPhotoIndex + 1);
    });

    // Cacher la miniature lorsque le curseur quitte le lien de navigation
    prevLink.addEventListener('mouseout', hideThumbnail);
    nextLink.addEventListener('mouseout', hideThumbnail);

    // Fonction pour afficher la miniature de la photo à l'index spécifié
    function showThumbnail(index) {
        if (index >= 0 && index < photoURLs.length) {
            var thumbnailURL = photoURLs[index];
            thumbnailPreview.style.backgroundImage = 'url(' + thumbnailURL + ')';
        }
    }

    // Fonction pour cacher la miniature
    function hideThumbnail() {
        thumbnailPreview.style.backgroundImage = 'none';
    }

    // Gérer la navigation lorsque les liens sont cliqués
    prevLink.addEventListener('click', function (event) {
        event.preventDefault();
        navigate(-1);
    });

    nextLink.addEventListener('click', function (event) {
        event.preventDefault();
        navigate(1);
    });

    // Fonction pour naviguer vers la photo suivante ou précédente
    function navigate(direction) {
        currentPhotoIndex += direction;
        
        // Assurez-vous que l'index reste dans les limites
        if (currentPhotoIndex < 0) {
            currentPhotoIndex = 0;
        } else if (currentPhotoIndex >= photoURLs.length) {
            currentPhotoIndex = photoURLs.length - 1;
        }
        
        // Affichez la photo correspondante
        showThumbnail(currentPhotoIndex);
    }
});
*/

jQuery(document).ready(function($) {
    // Liste des liens de navigation
    var prevLink = $('.nav-link.prev');
    var nextLink = $('.nav-link.next');

    // Liste des miniatures des photos
    var thumbnailPreview = $('.thumbnail-preview');

    // Liste des URL des photos
    var currentPhotoURL = '<?php echo get_the_post_thumbnail_url(); ?>';
    var prevPhotoURL = '<?php echo get_the_post_thumbnail_url(get_previous_post()->ID); ?>';
    var nextPhotoURL = '<?php echo get_the_post_thumbnail_url(get_next_post()->ID); ?>';

    // Afficher la miniature de l'article actuel
    thumbnailPreview.css('background-image', 'url(' + currentPhotoURL + ')');

    // Afficher la miniature au survol d'un lien de navigation
    prevLink.hover(function() {
        thumbnailPreview.css('background-image', 'url(' + prevPhotoURL + ')');
    }, function() {
        thumbnailPreview.css('background-image', 'url(' + currentPhotoURL + ')');
    });

    nextLink.hover(function() {
        thumbnailPreview.css('background-image', 'url(' + nextPhotoURL + ')');
    }, function() {
        thumbnailPreview.css('background-image', 'url(' + currentPhotoURL + ')');
    });
});
