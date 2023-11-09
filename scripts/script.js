(function($) {
    jQuery(document).ready(function($) {
        // Ouvrir la modal lorsque le lien est cliqué
        $('#open-modal-link').click(function(e) {
            e.preventDefault();
            $('#open-modal').fadeIn();
        });

        // Fermer la modal lorsque le bouton de fermeture est cliqué
        $('.close').click(function() {
            $(this).closest('.modal').hide();
        });

        // Fonction pour charger plus d'images via AJAX
        function loadMoreImages() {
            var newOpenLightboxLinks = document.querySelectorAll(".images-plus .open-lightbox");

            // Initialisez la lightbox avec les nouvelles images
            initializeLightbox(newOpenLightboxLinks);
        }

        // Lightbox
        const lightbox = document.getElementById("lightbox");
        const closeButton = document.getElementById("close-button");
        const lightboxImage = document.getElementById("lightbox-image");
        const prevButton = document.getElementById("prev-button");
        const nextButton = document.getElementById("next-button");

        // Fonction pour initialiser la lightbox
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

        // Ajax charger plus
        var offset = 8;
        var canLoadMore = true; // Vous pouvez charger plus d'images

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
                            offset += 8;

                            loadMoreImages();
                        } else {
                            canLoadMore = false;
                            $('#charger').text('Fin des images');
                        }
                    }
                });
            }
        });

        // Au chargement de la page, initialisez la lightbox pour les liens existants
        const initialOpenLightboxLinks = document.querySelectorAll(".open-lightbox");
        initializeLightbox(initialOpenLightboxLinks);
        
        // Trier par années
        
        $('.selected-annee').on('click', function() {
            $('.annee-options').slideToggle();
            $('.down-chevron').toggleClass('rotate');
            $('.selected-annee').toggleClass('onclick');
           
        });
        var yearsOptions = $('#annee-options'); // Sélectionnez le conteneur des options

        // Fonction pour mettre à jour la liste de photos en fonction de l'année sélectionnée
        function filterByYear(selectedYear) {
            $.ajax({
                type: 'POST',
                url: custom_script_params.ajaxurl, // L'URL AJAX de WordPress
                data: {
                    action: 'filter_photos',
                    security: '<?php echo wp_create_nonce("custom_script_nonce"); ?>',
                    annee: selectedYear, // Envoyez l'année sélectionnée dans la requête
                },
                success: function(response) {
                    // Mettez à jour la liste de photos avec les résultats de la requête
                    var photoContainer = $('.filter-photos'); // Remplacez par le sélecteur de votre conteneur de photos
                    photoContainer.html(response);
                     // Fermez la liste déroulante après avoir sélectionné une année
                    yearsOptions.slideUp();

                }
            });
        }

        $.ajax({
            type: 'POST',
            url: custom_script_params.ajaxurl, // L'URL AJAX de WordPress
            data: {
                action: 'get_unique_years',
                security: '<?php echo wp_create_nonce("custom_script_nonce"); ?>',
            },
            success: function(response) {
                var years = JSON.parse(response);

                // Remplissez la liste déroulante personnalisée avec les années uniques
                $.each(years, function(index, year) {
                    var yearDiv = $('<div>', {
                        class: 'annee-option',
                        text: year,
                        "data-year": year,
                    });

                    // Ajoutez un gestionnaire d'événement pour la sélection de l'année
                    yearDiv.click(function() {
                        // Mettez à jour la valeur sélectionnée
                        var selectedYear = $(this).data('year');
                        $('#selected-annee').text(year);
                        $('.trier').hide();
                        
                        // Vous pouvez ajouter d'autres actions ici en fonction de l'année sélectionnée
                        // Par exemple, déclencher une requête AJAX pour filtrer les photos. 
                        filterByYear(selectedYear);
                        
                    });

                    yearsOptions.append(yearDiv);
                });
               
            }
        });
        
    });
    //Pour les catégories
    $('.selected-category').on('click', function() {
        $('.category-options').slideToggle();
        $('.chevron').toggleClass('rotate');
        $('.selected-category').toggleClass('onclick');
    });
    
    $('.category-option').on('click', function() {
        var selectedValue = $(this).data('value');
        var selectedText = $(this).text();
        $('#categories-select').html(selectedText + '<div class="chevron"><i class="fa-solid fa-chevron-down"></i></div>');
        $('.category-options').slideUp();
    
        // Effectuez la demande AJAX pour mettre à jour les images en fonction des filtres
        $.ajax({
            type: 'POST',
            url: custom_script_params.ajaxurl, // URL AJAX définie par WordPress
            data: {
                action: 'filter_photos',
                category: selectedValue,
            },
            success: function(response) {
                // Mettez à jour la div ".photos" avec les nouvelles images
                $('.filter-photos').html(response);
            }
        });
    });
    // Pour les formats
    $('.selected-format').on('click', function() {
        $('.format-options').slideToggle();
        $('.chevron-down').toggleClass('rotation');
        $('.selected-format').toggleClass('onclick');
    });

    $('.format-option').on('click', function() {
        var selectedValue = $(this).data('value');
        var selectedText = $(this).text();
        $('#formats-select').html(selectedText + '<div class="chevron"><i class="fa-solid fa-chevron-down"></i></div>');
        $('.format-options').slideUp();
        

        // Effectuez la demande AJAX pour mettre à jour les images en fonction des filtres
        $.ajax({
            type: 'POST',
            url: custom_script_params.ajaxurl, // URL AJAX définie par WordPress
            data: {
                action: 'filter_photos',
                format: selectedValue, 
            },
            success: function(response) {
                // Mettez à jour la div ".photos" avec les nouvelles images
                $('.filter-photos').html(response);
            }
        });

    });
    //Visited red
    $(document).ready(function() {
        $('.category-option, .format-option').click(function() {
            // Supprimer la classe 'clicked' de tous les éléments sauf celui sur lequel vous avez cliqué
            $('.category-option, .format-option').not(this).removeClass('clicked');
            
            // Ajouter ou supprimer la classe 'clicked' sur l'élément cliqué
            $(this).toggleClass('clicked');
        });
    });

    $('#annee-options').on('click', '.annee-option', function() {
        // Supprimer la classe 'clicked' de tous les éléments sauf celui sur lequel vous avez cliqué
        $('.annee-option').not(this).removeClass('clicked');
    
        // Ajouter ou supprimer la classe 'clicked' sur l'élément cliqué
        $(this).toggleClass('clicked');});
    
   })(jQuery);

