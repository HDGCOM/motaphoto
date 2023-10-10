<?php 
get_header()
?>
    <main>
        <section class="hero">
             <div class="hero-title">
                <h1>PHOTOGRAPHE EVENT</h1>
            </div>
            <div class="hero-image">
                <?php
                $image_id= 32;
                $image_url= wp_get_attachment_url($image_id, 'full');
                echo '<img src="'.$image_url.'" alt="Fete de mariage"/>';
                ?>
            </div>
        </section>
        <section class="galerie">
            <div class="filtres">
                <div class="catégories">

                </div>
                <div class="formats">
                    
                </div> 
                <div class="trier">
                    
                </div>        
            </div>
            <div class="photos">
                <?php 
                    $args = array(
                        'post_type' => 'attachment',
                        'post_mime_type' => 'image',
                        'posts_per_page' => 8, // Nombre d'images à afficher par page
                        //'paged' => $_POST['page'], // Page actuelle
                     );
                     
                     $images = get_posts($args);

                     foreach ($images as $image) {
                        $image_url = wp_get_attachment_image_src($image->ID, 'large')[0];
                        echo '<img src="' . $image_url . '" alt="' . $image->post_title . '">';
                     }
                     
                     
                ?>
            </div>
            <button id="charger-plus">Charger plus</button>
        </section>

    </main>
<?php 
get_footer()
?>