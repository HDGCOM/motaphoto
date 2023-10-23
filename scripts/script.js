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

//test
// Déclarez une variable globale pour stocker les liens de la lightbox
let openLightboxLinks = [];

//Lightbox
document.addEventListener("DOMContentLoaded", function () {
    /*const lightbox = document.getElementById("lightbox");
    const closeButton = document.getElementById("close-button");
    const lightboxImage = document.getElementById("lightbox-image");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    // Créez une fonction pour initialiser la lightbox avec les liens donnés
    function initializeLightbox(links) {
        // Créez un tableau pour stocker les chemins des images
        const imageSources = [];

        links.forEach(function (link, index) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const imageSrc = link.getAttribute("data-image-src");
                const reference = link.getAttribute("data-reference");
                const categories = JSON.parse(link.getAttribute("data-categories"));

                // Mise à jour de la lightbox avec les données de référence et de catégories
                lightboxImage.src = imageSrc;
                document.querySelector(".ref").textContent = reference;

                const rightCat = document.querySelector(".cat");
                rightCat.innerHTML = ''; // Efface le contenu précédent
                categories.forEach(function (category) {
                    const categoryLink = document.createElement("a");
                    categoryLink.href = category.link; // Vous devrez ajuster cela en fonction de la structure de votre catégorie.
                    categoryLink.textContent = category.name;
                    rightCat.appendChild(categoryLink);
                });

                lightbox.style.display = "block";

                // Remplissez le tableau avec les chemins des images
                imageSources.length = 0;
                links.forEach(function (link) {
                    imageSources.push(link.getAttribute("data-image-src"));
                });

                // Mettez à jour l'index de l'image actuelle
                currentIndex = index;
            });
        });

        const lightboxReference = document.getElementById("lightbox-reference");
        const lightboxCategories = document.getElementById("lightbox-categories");

        let currentIndex = 0;
        prevButton.addEventListener("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
               lightboxImage.src = imageSources[currentIndex];
               lightboxReference.textContent = openLightboxLinks[currentIndex].getAttribute("data-reference");
               lightboxCategories.innerHTML = "";

               const categoriesData = JSON.parse(openLightboxLinks[currentIndex].getAttribute("data-categories"));
               categoriesData.forEach(function (category) {
               const categoryName = category.name;
               const categoryLink = document.createElement("a");
               categoryLink.href = "#"; // Vous devrez ajuster cela en fonction de la structure de votre catégorie.
               categoryLink.textContent = categoryName;
               lightboxCategories.appendChild(categoryLink);
             });
            }
        });

        nextButton.addEventListener("click", function () {
            if (currentIndex < imageSources.length - 1) {
                currentIndex++;
                lightboxImage.src = imageSources[currentIndex];
                lightboxReference.textContent = openLightboxLinks[currentIndex].getAttribute("data-reference");
                lightboxCategories.innerHTML = "";

                const categoriesData = JSON.parse(openLightboxLinks[currentIndex].getAttribute("data-categories"));
                categoriesData.forEach(function (category) {
                const categoryName = category.name;
                const categoryLink = document.createElement("a");
                categoryLink.href = "#"; // Vous devrez ajuster cela en fonction de la structure de votre catégorie.
                categoryLink.textContent = categoryName;
                lightboxCategories.appendChild(categoryLink);
             });
            }
        });

        closeButton.addEventListener("click", function () {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }*/

    // Obtenez les liens existants et initialisez la lightbox
    const openLightboxLinks = document.querySelectorAll(".open-lightbox");
    initializeLightbox(openLightboxLinks);
  
});

// Fonction pour charger plus d'images via AJAX
function loadMoreImages() {
    var newOpenLightboxLinks = document.querySelectorAll(".images-plus .open-lightbox");

    // Initialisez la lightbox avec les nouvelles images
    initializeLightbox(newOpenLightboxLinks);
}

const lightbox = document.getElementById("lightbox");
const closeButton = document.getElementById("close-button");
const lightboxImage = document.getElementById("lightbox-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

function initializeLightbox(links) {
    // Créez un tableau pour stocker les chemins des images
    const imageSources = [];

    links.forEach(function (link, index) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const imageSrc = link.getAttribute("data-image-src");
            const reference = link.getAttribute("data-reference");
            const categories = JSON.parse(link.getAttribute("data-categories"));

            // Mise à jour de la lightbox avec les données de référence et de catégories
            lightboxImage.src = imageSrc;
            document.querySelector(".ref").textContent = reference;

            const rightCat = document.querySelector(".cat");
            rightCat.innerHTML = ''; // Efface le contenu précédent
            categories.forEach(function (category) {
                const categoryName = category.name;
                const categoryElement = document.createElement("span");
                categoryElement.textContent = categoryName;
                rightCat.appendChild(categoryElement);
            });

            lightbox.style.display = "block";

            // Remplissez le tableau avec les chemins des images
            imageSources.length = 0;
            links.forEach(function (link) {
                imageSources.push(link.getAttribute("data-image-src"));
            });

            // Mettez à jour l'index de l'image actuelle
            currentIndex = index;
        });
    });

    const lightboxReference = document.getElementById("lightbox-reference");
    const lightboxCategories = document.getElementById("lightbox-categories");
    
    const rightCat = document.querySelector(".cat");
    let currentIndex = 0;
    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
           lightboxImage.src = imageSources[currentIndex];
           lightboxReference.textContent = openLightboxLinks[currentIndex].getAttribute("data-reference");
           lightboxCategories.innerHTML = "";

           const categoriesData = JSON.parse(openLightboxLinks[currentIndex].getAttribute("data-categories"));
           categoriesData.forEach(function (category) {
            const categoryName = category.name;
            const categoryElement = document.createElement("span");
            categoryElement.textContent = categoryName;
            rightCat.appendChild(categoryElement);
         });
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < imageSources.length - 1) {
            currentIndex++;
            lightboxImage.src = imageSources[currentIndex];
            lightboxReference.textContent = openLightboxLinks[currentIndex].getAttribute("data-reference");
            lightboxCategories.innerHTML = "";

            const categoriesData = JSON.parse(openLightboxLinks[currentIndex].getAttribute("data-categories"));
            categoriesData.forEach(function (category) {
                const categoryName = category.name;
                const categoryElement = document.createElement("span");
                categoryElement.textContent = categoryName;
                rightCat.appendChild(categoryElement);
         });
        }
    });

    closeButton.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    //test
    openLightboxLinks = links; // Mettez à jour la variable globale avec les liens
}

//Ajax charger plus
jQuery(document).ready(function($) {
    var offset=8;
    var canLoadMore = true; // Ivous pouvez charger plus d'images

    $('#charger').click(function() {
        if (canLoadMore) {
            $.ajax({
                type: 'POST',
                url: custom_script_params.ajaxurl,
                data: {
                    action: 'charger_plus_d_images',
                    security: custom_script_params.nonce,
                    offset: offset,
                },
                success: function(response) {
                    if (response) {
                        $('.images-plus').append(response); // Ajoutez les images supplémentaires à la zone "nouvelles-images"
                        offset +=8;
                        
                        loadMoreImages()

                    } else {
                        canLoadMore = false;
                        $('#charger').text('Fin des images');
                    }
                }
            });
        }
    });
});

// Au chargement de la page, initialisez la lightbox pour les liens existants
const initialOpenLightboxLinks = document.querySelectorAll(".open-lightbox");
initializeLightbox(initialOpenLightboxLinks);

//Section filtres
jQuery(document).ready(function($) {
    // Utilisez AJAX pour récupérer les données ACF.
    $.ajax({
        url: '/wp-content/themes/motaphoto/get_images_filter.php', // le chemin vers fichier PHP.
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Remplissez les listes déroulantes avec les données récupérées.
            var categoriesSelect = $('#categories-select');
            var formatsSelect = $('#formats-select');
            var anneeSelect = $('#annee-select');

            categoriesSelect.append($('<option>').text('Catégories').attr('value', ''));
            formatsSelect.append($('<option>').text('Formats').attr('value', ''));
            anneeSelect.append($('<option>').text('Trier par').attr('value', ''));

            $.each(data.categories, function(index, value) {
                categoriesSelect.append($('<option>').text(value).attr('value', value));
            });

            $.each(data.formats, function(index, value) {
                formatsSelect.append($('<option>').text(value).attr('value', value));
            });

            $.each(data.annee, function(index, value) {
                anneeSelect.append($('<option>').text(value).attr('value', value));
            });
        }
    });
});

