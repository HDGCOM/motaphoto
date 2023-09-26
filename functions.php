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
    
    }


?>