(function($) {
    jQuery(document).ready(function($) {
        // Ouvrir la modal lorsque le lien est cliqué
        $('.item-open-modal').click(function(e) {
            e.preventDefault();
            $('#open-modal').fadeIn();
        });

        // Fermer la modal lorsque le bouton de fermeture est cliqué
        $('.close').click(function() {
            $(this).closest('.modal').hide();
        });

        // Fonction pour charger plus d'images via AJAX
        function loadMoreImages() {
            var openLightboxLinks = document.querySelectorAll(".open-lightbox");

            // Initialisez la lightbox avec les nouvelles images
           initializeLightbox(openLightboxLinks);
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
            
            openLightboxLinks = links; // Mettez à jour la variable globale avec les liens
        }

        // Au chargement de la page, initialisez la lightbox pour les liens existants
         const initialOpenLightboxLinks = document.querySelectorAll(".open-lightbox");
         initializeLightbox(initialOpenLightboxLinks);
 
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
                            $('.photos').append(response); // Ajoutez les images supplémentaires à la zone "nouvelles-images"
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
                    var photoContainer = $('.photos'); // Remplacez par le sélecteur de votre conteneur de photos
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

                // Triez le tableau d'années dans l'ordre décroissant
                years.sort(function(a, b) {
                    return b - a;
                });

                // Remplissez la liste déroulante personnalisée avec les années uniques
                $.each(years, function(index, year) {
                    var yearDiv = $('<div>', {
                        class: 'annee-option',
                        text: year,
                        "data-year": year,
                    });
                    
                   yearsOptions.append(yearDiv);
                });
                // Gestionnaire d'événement pour la sélection d'année
                $('.annee-option').on('click', function() {
                    // Supprimez la classe "active" de toutes les options d'année
                    $('.annee-option').removeClass('active');

                    // Ajoutez la classe "active" à l'option sélectionnée
                    $(this).addClass('active');

                    var selectedYear = $(this).data('year');
                    $('#selected-annee').text(selectedYear);
                    $('.trier').hide();
                    yearsOptions.slideUp();
                    handleFilterSelection(getSelectedCategory(), getSelectedFormat(), selectedYear);
                });
            }
        });

        //Pour les catégories
        $('.selected-category').on('click', function() {
            $('.category-options').slideToggle();
            $('.chevron').toggleClass('rotate');
            $('.selected-category').toggleClass('onclick');
        });
    
        // Pour les formats
        $('.selected-format').on('click', function() {
            $('.format-options').slideToggle();
            $('.chevron-down').toggleClass('rotation');
            $('.selected-format').toggleClass('onclick');
        });
    
        // Fonction pour effectuer la demande AJAX en fonction des filtres sélectionnés
        function filterPhotos(category, format, year) {
            $.ajax({
                type: 'POST',
                url: custom_script_params.ajaxurl,
                data: {
                    action: 'filter_photos',
                    category: category,
                    format: format,
                    annee: year,
                },
                success: function(response) {
                    $('.photos').html(response);
                }
            });
        }

        // Fonction pour gérer les options sélectionnées et déclencher le filtrage
        function handleFilterSelection(category, format, year) {
            filterPhotos(category, format, year);

            //Masquer ou afficher le bouton "Charger plus" en fonction des critères de filtrage
            var btnPlusContainer = $('.btn-hide');

            if (category || format || year) {
                // Si au moins un filtre est sélectionné, masquez le bouton "Charger plus"
                btnPlusContainer.hide();
            } else {
                // Sinon, affichez le bouton "Charger plus"
                btnPlusContainer.show();
            }
        }

        // Gestionnaire d'événement pour la sélection de catégorie
        $('.category-option').on('click', function() {
            $('.category-option').removeClass('active'); // Supprimez la classe "active" de toutes les options de catégorie
            $(this).addClass('active'); // Ajoutez la classe "active" à l'option sélectionnée

            var selectedCategory = $(this).data('value');
            var selectedText = $(this).text();
            $('#categories-select').html(selectedText + '<div class="chevron"><i class="fa-solid fa-chevron-down"></i></div>');
            $('.category-options').slideUp();
            handleFilterSelection(selectedCategory, getSelectedFormat(), getSelectedYear());
        });

        // Gestionnaire d'événement pour la sélection de format
        $('.format-option').on('click', function() {
            $('.format-option').removeClass('active'); // Supprimez la classe "active" de toutes les options de format
            $(this).addClass('active'); // Ajoutez la classe "active" à l'option sélectionnée

            var selectedFormat = $(this).data('value');
            var selectedText = $(this).text();
            $('#formats-select').html(selectedText + '<div class="chevron-down"><i class="fa-solid fa-chevron-down"></i></div>');
            $('.format-options').slideUp();
            handleFilterSelection(getSelectedCategory(), selectedFormat, getSelectedYear());
        });

        // Fonction pour récupérer la catégorie sélectionnée
        function getSelectedCategory() {
            return $('.category-option.active').data('value');
        }

        // Fonction pour récupérer le format sélectionné
        function getSelectedFormat() {
            return $('.format-option.active').data('value');
        }

        // Fonction pour récupérer l'année sélectionnée
        function getSelectedYear() {
            return $('.annee-option.active').data('year');
        }
        
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
            $(this).toggleClass('clicked');
        });

        $(document).ready(function () {
            var mobileMenuButton = $('.mobile-menu-button');
            var mobileMenu = $('.mobile-menu');

            mobileMenuButton.click(function () {
                mobileMenu.toggle();
                mobileMenuButton.toggleClass('open');
            });

            //  Gérer le clic sur les liens du menu
            $('.mobile-menu a').click(function (e) {
                e.preventDefault(); // Empêche le comportement de lien par défaut

                var targetPage = $(this).attr('href');

                // Fermez le menu avec un fondu et redirigez vers la page cible
                mobileMenu.fadeOut(400, function () {
                    mobileMenuButton.removeClass('open'); 
                    window.location.href = targetPage;
                });
            });
        });
       
    });
      
})(jQuery);

