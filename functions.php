<?php
   add_theme_support('post-thumbnails');

   register_nav_menus(
        array(
            'primary' => __('Menu Principal', 'motaphoto'),
            'footer'  => __('Menu Pied de Page', 'motaphoto'),
        )
    );
   
   add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
    function theme_enqueue_styles() {
      wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
      wp_enqueue_script('custom-script', get_template_directory_uri() . '/scripts/script.js', array('jquery'), '1.0', true);
      wp_enqueue_script('single-script', get_template_directory_uri() . '/scripts/single.js', array('jquery'), '1.0', true);

      // Localiser les variables AJAX pour le script
      wp_localize_script('custom-script', 'custom_script_params', array(
        'ajaxurl' => admin_url('admin-ajax.php'), // L'URL de l'endpoint AJAX
        'nonce' => wp_create_nonce('custom_script_nonce')
      ));

    }

    //Modale
    function ajouter_contact_au_menu($items, $args) {
      // Vérifiez s'il s'agit du menu "primary"
      if ($args->theme_location == 'primary') {
          // Ajoutez un élément "Contact" à la fin du menu avec une classe "open-modal"
          $items .= '<li id="open-modal-link" ><a  href="#">Contact</a></li>';
      }
      return $items;
  }
  
  add_filter('wp_nav_menu_items', 'ajouter_contact_au_menu', 10, 2);

  //Ajax function

  function charger_plus_d_images() {
      check_ajax_referer('custom_script_nonce', 'security');

        $offset= $_POST['offset'];
        $args = array(
         'post_type' => 'photo', 
         'posts_per_page' => 8,
         'offset' => $offset, 
        );

        $nouvelles_images_query = new WP_Query($args);
        
        
        if ($nouvelles_images_query->have_posts()) :
            while ($nouvelles_images_query->have_posts()) : $nouvelles_images_query->the_post();
                
                $image_id = get_post_thumbnail_id();
                $reference = get_field('reference', $image_id);
                $categories = get_the_terms(get_the_ID(), 'categorie');
                $image_url = get_the_post_thumbnail_url(); // URL de l'image
                $image_annee = get_field('annee', $image_id); // Récupérer l'année personnalisée ACF de l'image
                ?>

              <div class="container-img">
                  <img class="featured-image" src="<?php echo $image_url; ?>" data-annee="<?php echo esc_attr($image_annee); ?>">
                  <div class="overlay">
                      <a href="<?php echo esc_url(get_permalink()); ?>">
                          <i class="fas fa-eye"></i>
                      </a>
                      <a href="" class="open-lightbox" data-image-src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" data-reference="<?php echo esc_attr($reference); ?>" data-categories="<?php echo esc_attr(json_encode($categories)); ?>">
                          <i class="fas fa-square"></i>
                      </a>
                      <div class="infos">
                          <div class="left-ref"><?php echo $reference; ?></div>
                          <div class="right-cat">
                              <?php
                              if ($categories) {
                                  foreach ($categories as $category) {
                                    echo '<span>' . $category->name . '</span>';
                                  }
                              }
                              ?>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

              <?php

              endwhile;
        endif; 

        wp_reset_postdata();
        die();
  }

add_action('wp_ajax_charger_plus_d_images', 'charger_plus_d_images');
add_action('wp_ajax_nopriv_charger_plus_d_images', 'charger_plus_d_images');




//Trier par années
function get_unique_years() {
  $unique_years = array();
  
  // Récupérez les années à partir des images mises en avant
  $args = array(
      'post_type' => 'photo', // Type de publication personnalisé
      'posts_per_page' => -1, // Récupérez toutes les images
  );

  $photo_query = new WP_Query($args);

  if ($photo_query->have_posts()) {
      while ($photo_query->have_posts()) {
          $photo_query->the_post();
          $image_id = get_post_thumbnail_id();
          $year = get_field('annee', $image_id);
          
          if (!empty($year) && !in_array($year, $unique_years)) {
              $unique_years[] = $year;
          }
      }
  }

  // Réinitialisez la requête pour éviter des problèmes
  wp_reset_postdata();

  // Récupérez les années à partir des publications
  $args = array(
      'post_type' => 'photo', // Remplacez par le slug de votre type de publication
      'posts_per_page' => -1, // Récupérez toutes les publications
  );

  $post_query = new WP_Query($args);

  if ($post_query->have_posts()) {
      while ($post_query->have_posts()) {
          $post_query->the_post();
          $year = get_field('annee'); // Supposons que vous stockez l'année dans un champ personnalisé "annee"
          
          if (!empty($year) && !in_array($year, $unique_years)) {
              $unique_years[] = $year;
          }
      }
  }

  // Réinitialisez la requête
  wp_reset_postdata();

  echo json_encode($unique_years);

  die();
}
add_action('wp_ajax_get_unique_years', 'get_unique_years');
add_action('wp_ajax_nopriv_get_unique_years', 'get_unique_years');

// Filter Photos

function filter_photos() {
    // Récupérez les paramètres AJAX
    $category = $_POST['category'];
    $format = $_POST['format'];
    $annee = $_POST['annee'];

    // Construisez les arguments de requête en fonction des filtres sélectionnés
    $args = array(
        'post_type' => 'photo', // Remplacez 'photo' par le slug de votre type de publication personnalisé
        'posts_per_page' => 8, // Récupère les 8 premières images
    );

    if (!empty($category)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $category,
        );
    }

    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    if (!empty($annee)) {
        $args['meta_query'][] = array(
            'key' => 'annee',
            'value' => $annee,
        );
    }

    // Effectuez la requête WP_Query avec les arguments construits
    $photo_query = new WP_Query($args);

    if ($photo_query->have_posts()) :
        while ($photo_query->have_posts()) : $photo_query->the_post();
            // Affichez le contenu de la boucle ici, comme dans votre code existant
            $image_id = get_post_thumbnail_id();
            $reference = get_field('reference', $image_id);
            $categories = get_the_terms(get_the_ID(), 'categorie');
            $image_url = get_the_post_thumbnail_url(); // URL de l'image
            $image_annee = get_field('annee', $image_id); // Récupérer l'année personnalisée ACF de l'image
            ?>

            <div class="container-img">
                <img class="featured-image" src="<?php echo $image_url; ?>" data-annee="<?php echo esc_attr($image_annee); ?>">
                <?php //the_post_thumbnail('large'); ?>
                <div class="overlay">
                    <a href="lien_vers_votre_page_de_redirection">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="" class="open-lightbox" data-image-src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" data-reference="<?php echo esc_attr($reference); ?>" data-categories="<?php echo esc_attr(json_encode($categories)); ?>">
                        <i class="fas fa-square"></i>
                    </a>
                    <div class="infos">
                        <div class="left-ref"><?php echo $reference; ?></div>
                        <div class="right-cat">
                            <?php
                           
                            if ($categories) {
                                foreach ($categories as $category) {
                                    echo '<span>' . $category->name . '</span>';
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>

                 
            </div>
        <?php
        endwhile;
        wp_reset_postdata();
    
    endif;
    

    wp_die(); // Terminer la requête AJAX
}

// Enregistrez le gestionnaire AJAX pour les filtres
add_action('wp_ajax_filter_photos', 'filter_photos');
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos');

?>


