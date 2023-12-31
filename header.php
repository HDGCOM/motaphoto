<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header>
        <div class="container">
            <div class="header-logo">
                <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/Motaphoto.png" alt="Logo du site">
                </a>
            </div>
            <nav class="header-menu">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary', // Le nom de l'emplacement du menu
                    'menu_class' => 'primary-menu', // Classe CSS pour le menu
                    'container' => false, // Ne pas inclure de conteneur autour du menu
                ));
                ?>
            </nav>
                
            <nav class="nav-mobile">
                <div class="mobile-menu-button">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                <div class="mobile-menu">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'mobile', // Le nom de l'emplacement du menu pour les mobiles
                        'menu_class' => 'mobil-menu', // Classe CSS pour le menu mobile
                        'container' => false, // Ne pas inclure de conteneur autour du menu mobile
                    ));
                    ?>
                </div>
            </nav>
           
        </div>
    </header>
   
