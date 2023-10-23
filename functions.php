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
              ?>

              <div class="container-img">
                  <?php the_post_thumbnail('large'); ?>
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
            </div>

              <?php

              endwhile;
        endif; 

        wp_reset_postdata();
        die();
  }

add_action('wp_ajax_charger_plus_d_images', 'charger_plus_d_images');
add_action('wp_ajax_nopriv_charger_plus_d_images', 'charger_plus_d_images');


?>