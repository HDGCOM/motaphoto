
</main>
<footer>
    <div class="container footer">
        <div class="footer-content">
            <nav class="footer-menu">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'footer', // Le nom de l'emplacement du menu de pied de page
                    'menu_class' => 'footer-menu', // Classe CSS pour le menu de pied de page
                    'container' => false, // Ne pas inclure de conteneur autour du menu
                ));
                ?>
            </nav>
        </div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>


