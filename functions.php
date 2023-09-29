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
      wp_enqueue_script('jquery');
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

?>